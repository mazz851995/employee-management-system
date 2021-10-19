import React from 'react'
import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Employee Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                    </ul>
                    <form className="d-flex">
                        <Link to="/leaves" className="btn btn-outline-success">Add Leave</Link>
                    </form>
                </div>
            </div>
        </nav >
    )
}

export default Navbar
