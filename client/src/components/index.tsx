// import "./todo.css"
import { Link } from "react-router-dom"


export function ToDoIndex() {
    return (
        <div className="container-fluid">
            <div>
                <div><a href="https://github.com/piyush9199/Personal-TaskTracker" target="_blank" className="btn btn-danger mt-4 code-github-link ">Source Code</a></div>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Link to="/register" className="btn btn-dark mx-2">Register User</Link>
                    <Link to="/login" className="btn btn-warning">User Login</Link>
                </div>
            </div>
        </div>
    )
}