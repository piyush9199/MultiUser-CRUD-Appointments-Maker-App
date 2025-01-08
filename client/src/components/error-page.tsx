import { Link } from "react-router-dom";


export function ErrorPage(){
  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#DEB887' }}>
      <div className="text-center text-white">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-4">Requested Page Not Found</p>
        <Link to='/' className="text-decoration-none"><div className="fs-4 btn btn-info text-light">Get back to home</div></Link>
      </div>
    </div>
  );
};
