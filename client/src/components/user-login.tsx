import { useFormik } from "formik"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useCookies } from "react-cookie"


// Checking valid userid and password
export function UserLogin(){
    const [_cookies, setCookie, _removeCookie] = useCookies(['userid'])
    let navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (user)=>{
            axios.get('https://personal-tasktracker.onrender.com/users').then((response) =>{
                var clientData = response.data.find((obj:any)=>obj.UserId === user.UserId)
                if(clientData){
                    if(clientData.Password === user.Password){
                        setCookie('userid', user.UserId)
                        navigate('/user-panel')
                    }else{
                        alert('Incorrect Password..Try again')
                    }
                }
                else{
                    alert('User not found')
                }
            })
            .catch(error=>console.error(error))
        }
    })

    return(
        <div className="d-flex justify-content-center">
            <form className="bg-white p-2 mt-5" onSubmit={formik.handleSubmit}>
            <Link to="/" className="btn btn-primary"><span className="bi bi-house me-2"></span>Home</Link>
                <div className="h3 fw-bold mb-3">Login Panel</div>
                <dl>
                    <dt className="mb-2">User id</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange}/></dd>
                    <dt className="mb-2">Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange}/></dd>
                    <div style={{fontStyle: "italic"}}>Userid: piyush9199, Password: admin</div>
                </dl>
                <div className="text-danger fw-bold fst-italic mb-2">Please wait for 1 min after clicking Login</div>
                <button type="submit" className="btn btn-warning w-100">Login</button>
                <Link to="/register" className="text-decoration-none" >Don't have an account?</Link>
            </form>
        </div>
    )
}