import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { AppointmentContract } from "../contracts/AppointmentContract"
import 'bootstrap'
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "react-bootstrap"
import Button from 'react-bootstrap/Button';


export function UserPanel() {
    const [appointments, setAppointments] = useState<AppointmentContract[]>()
    const [showModal, setShowModal] = useState(false)
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://personal-tasktracker.onrender.com/appointments/${cookies['userid']}`)
            .then((response) => {
                setAppointments(response.data)
            })
            .catch(error => console.error(error))

    }, [])

    const [cookies, _setCookie, removeCookie] = useCookies(['userid'])
    function handleLogout() {
        removeCookie('userid')
        navigate('/login')
    }

    const handleConfirmDelete = (id: number) => {
        setSelectedAppointmentId(id);
        setShowModal(true);
    };

    function handleRemoveAppointment(id: number) {
        axios.delete(`https://personal-tasktracker.onrender.com/delete-appointment/${id}`)
            .then(() => {
                setAppointments(prevAppointments => prevAppointments?.filter(appointment => appointment.Appointment_Id !== id))      //update latest data into appointments state
                setShowModal(false)
                navigate('/user-panel')
                toast.error("Appointment Deleted")
            })
            .catch(error => console.log(error)
            )
    }


    return (
        <div>
            <div className="h2 text-white bg-secondary mt-2 p-2">User Panel</div>
            <div className="h2"><Link to="/" className="btn btn-primary"><span className="bi bi-house me-1"></span>Home</Link> Welcome <span className="text-success">{cookies['userid']}</span> <span><button onClick={handleLogout} className="btn btn-danger text-center pt-1 mb-2">Logout</button></span></div>
            <section>
                <div>
                    <Link to='/add-appointment' className="btn btn-primary bi bi-calendar3 "> Add Appointment</Link>
                </div>
                <div className="d-flex flex-wrap justify-content-between">
                    {
                        appointments?.map((appointment, index) =>
                            <div key={index} className="card w-25 m-3 bg-success-subtle text-danger-emphasis">
                                <div className="card-header h5">
                                    {`Appointment ${index + 1}`}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title h3 fw-semibold">{appointment.Title}</h5>
                                    <p className="card-text fst-italic">{appointment.Description}</p>
                                    <div className="bi bi-calendar2-week"> {appointment.Date.toString().split("T")[0]}</div>
                                </div>
                                <div className="m-2">
                                    <Link to={`/modify-appointment/${appointment.Appointment_Id}`} className="btn btn-warning rounded-3 me-1 bi bi-pencil-square"> Modify</Link>
                                    <button onClick={() => handleConfirmDelete(appointment.Appointment_Id)} className="btn btn-danger rounded-3 ms-2 bi bi-x-square"> Remove</button>
                                </div>


                                {/* React-bootstrap Modal used */}
                                <Modal centered
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirm Delete</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        Are you sure you want to delete this appointment?
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                                            No
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                if (selectedAppointmentId) {
                                                    handleRemoveAppointment(selectedAppointmentId);
                                                }
                                            }}
                                        >
                                            Yes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        )
                    }
                </div >
            </section >
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
            />
        </div >
    )
}