import { useFormik } from "formik"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


export function UserRegistration(){
    let navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            UserId:'',
            UserName:'',
            Password: '',
            Email: '',
            Mobile: ''
        },
        onSubmit: (user)=>{
            axios.post('https://personal-tasktracker..com/register-user', user).then(()=>{
                alert('registered successfully')
                navigate('/login')
            })
            .catch(error=>console.error(error))
        }
    })

    return(
        <div className="d-flex justify-content-center">
            
            <form className="bg-white p-2 mt-5" onSubmit={formik.handleSubmit}>
            <Link to="/" className="btn btn-primary"><span className="bi bi-house me-2"></span>Home</Link>
                <div className="h3 fw-bold mb-3">Register User</div>
                <dl>
                    <dt className="mb-2">User id</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-2">Username</dt>
                    <dd><input type="text" name="UserName" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-2">Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-2">Email id</dt>
                    <dd><input type="email" name="Email" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt className="mb-2">Mobile Number</dt>
                    <dd><input type="text" name="Mobile" className="form-control" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-warning w-100">Register</button>
                <Link to="/login" className="text-decoration-none" >Already have an account?</Link>
            </form>
            
        </div>
    )
}