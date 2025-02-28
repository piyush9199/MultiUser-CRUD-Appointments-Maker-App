import { useFormik } from "formik"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { ToastContainer, toast } from "react-toastify"


export function AddAppointment() {
    const handleToast = () => toast.success("Appointment added successfully")
    const [cookies, _setCookie, _removeCookie] = useCookies(['userid'])
    let navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            Appointment_Id: '',
            Title: '',
            Description: '',
            Date: '',
            UserId: cookies['userid']
        },
        onSubmit: (appointmentInput) => {
            axios.post('https://personal-tasktracker.onrender.com/add-appointment', appointmentInput).then(() => {
                navigate('/user-panel')
            })
                .catch(error => console.error(error)
                )
        }
    })
    return (
        <div className="d-flex justify-content-center">
            <form className="bg-white p-2 mt-5" onSubmit={formik.handleSubmit}>
                <div className="h3 fw-bold mb-3 text-success">Add Appointment</div>
                <dl>
                    <dt className="mb-3">Appointment id</dt>
                    <dd><input type="number" name="Appointment_Id" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-3">Title</dt>
                    <dd><input type="text" name="Title" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-3">Description</dt>
                    <dd><textarea rows={4} cols={40} name="Description" className="form-control" onChange={formik.handleChange}></textarea></dd>
                    <dt className="mb-3">Date</dt>
                    <dd><input type="date" name="Date" className="form-control" onChange={formik.handleChange} /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100" onClick={handleToast}>Add Appointment</button>
                <Link to="/user-panel">Back to user panel</Link>
            </form>
            <ToastContainer 
                position="bottom-right"
                autoClose={3000}
            />
        </div>
    )
}