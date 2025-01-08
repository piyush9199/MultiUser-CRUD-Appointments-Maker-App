import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { AppointmentContract } from "../contracts/AppointmentContract"
import 'bootstrap'


export function UserPanel() {
    const [appointments, setAppointments] = useState<AppointmentContract[]>()
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://multiuser-crud-appointments-maker-app.onrender.com/appointments/${cookies['userid']}`)
            .then((response) => {
                setAppointments(response.data)
            })
            .catch(error=>console.error(error))

    }, [])

    const [cookies, _setCookie, removeCookie] = useCookies(['userid'])
    function handleLogout() {
        removeCookie('userid')
        navigate('/login')
    }
    function handleRemoveAppointment(id: number) {
        axios.delete(`https://multiuser-crud-appointments-maker-app.onrender.com/delete-appointment/${id}`)
            .then(() => {
                return axios.get(`https://multiuser-crud-appointments-maker-app.onrender.com/appointments/${cookies['userid']}`)   //re-fetch the data again
            })
            .then((response) => {
                setAppointments(response.data)      //update latest data into appointments state
                navigate('/user-panel')
                window.location.reload()
            })
            .catch(error =>console.log(error)
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
                                    <button data-bs-target={`#removePrompt-${appointment.Appointment_Id}`} data-bs-toggle="modal" className="btn btn-danger rounded-3 ms-2 bi bi-x-square"> Remove</button>
                                </div>


                                {/* Bootstrap modal */}
                                <div className="modal fade" id={`removePrompt-${appointment.Appointment_Id}`}>
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h2>Remove appointment</h2>
                                                    <button data-bs-dismiss="modal" className="btn btn-close"></button>
                                                </div>
                                                <div className="modal-body fw-normal">
                                                    <h2 className="text-danger fw-semibold">Are you sure?</h2>
                                                    <button onClick={()=>handleRemoveAppointment(appointment.Appointment_Id)} className="btn btn-danger me-4 fs-5">Yes</button>
                                                    <button data-bs-dismiss="modal" className="btn btn-info fs-5">No</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                        )
                    }
                </div >
            </section >
        </div >
    )
}