import React from "react";
import loginFirst from "../../Images/LoginFirst.jpg";
import Image from "next/image";
import Link from "next/link";
const LoginForCheckBusiness = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 text-center">
          <Image src={loginFirst} alt="Login First" className="img-fluid" />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h3 className="fw-bold text-primary">
            Oops! You're trying to see your business.
          </h3>
          <p className="text-muted mb-4">
            Please login first to access your business information.
          </p>
          <div className="d-flex align-items-center gap-3">
            <Link href="/Pages/login">
              <button className="btn btn-primary btn-lg m-0">Login</button>
            </Link>
            <Link href="/Pages/signup">
              <button className="btn btn-dark btn-lg m-0">SignUp</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForCheckBusiness;
