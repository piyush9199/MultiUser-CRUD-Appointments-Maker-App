import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";


export function ModifyAppointment(){
    const handleToast = () => toast.success("Appointment details modified successfully")
    const [appointments, setAppointments] = useState([{Appointment_Id:'', Title:'', Description: '', Date: '', UserId:''}])
    let params = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        axios.get(`https://personal-tasktracker.onrender.com/modify-appointment/${params.id}`).then((response)=>{
            setAppointments(response.data)
        })
        .catch(error => console.error(error)
        )
    },[params.id])

    const formik = useFormik({
        initialValues: {
            Appointment_Id:appointments[0]?.Appointment_Id,
            Title: appointments[0]?.Title,
            Description: appointments[0]?.Description,
            Date: appointments[0]?.Date,
            UserId: appointments[0]?.UserId
        },
        enableReinitialize: true,

        onSubmit: (appointment)=>{
            axios.put(`https://multiuser-crud-appointments-maker-app.onrender.com/update-appointment/${params.id}`, appointment).then(()=>{
                navigate('/user-panel')
            })
            .catch(error=>console.error(error))
        }
    })


    
    return(
        <div className="d-flex justify-content-center ">
            <form className="bg-white p-2 mt-5 rounded-3 w-25 h-75" onSubmit={formik.handleSubmit}>
                <div className="h3 fw-bold mb-3">Modify appointment</div>
                <dl>
                    <dt className="mb-2">Appointment Id</dt>
                    <dd><input type="number"  name="Appointment_Id" value={formik.values.Appointment_Id} onChange={formik.handleChange} className="form-control"/></dd>
                    <dt className="mb-2">Title</dt>
                    <dd><input type="text" value={formik.values.Title} name="Title" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt className="mb-2">Description</dt>
                    <dd><textarea  name="Description" value={formik.values.Description} onChange={formik.handleChange} className="form-control"></textarea></dd>
                    <dt className="mb-2">Date</dt>
                    <dd><input type="date"  name="Date" value={formik.values.Date.toString().split("T")[0]} onChange={formik.handleChange} className="form-control"/></dd>
                    <dt className="mb-2">UserId</dt>
                    <dd><input type="text" value={formik.values.UserId} disabled name="UserId" onChange={formik.handleChange} className="form-control"/></dd>
                   
                </dl>
                <button className="btn btn-success me-3" type="submit" onClick={handleToast} >Save Changes</button>
                <button type="button" onClick={formik.handleReset} className="btn btn-secondary me-3">Reset</button>
                <Link to="/user-panel" className="btn btn-danger" type="button">Cancel</Link>
            </form>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
            />
        </div>
    )
}