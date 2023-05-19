import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate("/");
  };
  return (
    <>
      {auth ? (
        <nav className="navbar navbar-expand-lg bg-warning">
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">
              React Notes
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/Create">
                    Create
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Notes">
                    Notes
                  </Link>
                </li>
              </ul>
              <div className="d-flex">
                <p className="my-3">Hello {JSON.parse(user).name} </p>
                <button className="btn btn-outline-danger mx-3" onClick={signOut}>
                  SignOut
                </button>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg bg-warning">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              React Notes
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default Nav;
