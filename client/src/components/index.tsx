// import "./todo.css"
import { Link } from "react-router-dom"


export function ToDoIndex(){
    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Link to="/register" className="btn btn-dark mx-2">Register User</Link>
                <Link to="/login" className="btn btn-warning">User Login</Link>
            </div>
        </div>
    )
}