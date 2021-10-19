import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify"
import Modal from 'react-modal';

const Employee = () => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const [modalIsOpen, setIsOpen] = useState(false);

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [dob, setDob] = useState();
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState()
    const [filteredLeaves, setFilteredLeaves] = useState([])

    const employee = useSelector(state => state.employeeReducer)
    const allLeaves = useSelector(state => state.leaveReducer)
    const dispatch = useDispatch();


    const resetForm = () => {
        setFname(""); setLname(""); setEmail(""); setMobileNumber(""); setDob(""); setIsEdit(false);
    }
    const openModal = (id) => {
        const leave = allLeaves.filter(ele => ele.empName === id)
        setFilteredLeaves(leave)
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        var formData = { fname, lname, email, mobileNumber, dob: new Date(dob).toISOString().split('T')[0] }

        if (!isEdit) {
            formData['id'] = Date.now().toString();
            var emailExist = employee.find(employee => employee.email == email);
            var numberExist = employee.find(employee => employee.mobileNumber == parseInt(mobileNumber));
        } else {
            formData['id'] = editId;
            var emailExist = employee.find(employee => employee.id != parseInt(editId) && employee.email == email);
            var numberExist = employee.find(employee => employee.id != parseInt(editId) && employee.mobileNumber == parseInt(mobileNumber));
        }

        if (!fname || !lname || !email || !mobileNumber) {
            return toast.warning("Please fill all the details");
        }
        if (!mobileNumber.match(/^\d{10}$/)) {
            return toast.warning("Please enter a valid phone number");
        }
        if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return toast.warning("Please enter a valid email");
        }
        if (emailExist != undefined) {
            return toast.error("Email already exist..!!");
        }
        if (numberExist != undefined) {
            return toast.error("Number already exist..!!");
        }

        if (isEdit) {
            dispatch({ type: "UPDATE_EMPLOYEE", payload: formData });
            toast.success("Employee Updated");
        } else {
            dispatch({ type: "ADD_EMPLOYEE", payload: formData });
            toast.success("Employee Added");
        }
        resetForm();
    }
    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete employee!")) {
            dispatch({ type: "DELETE_EMPLOYEE", payload: id })
            dispatch({ type: "DELETE_LEAVE_BY_EMPLOYEE", payload: id })
            toast.success("Employee Deleted Successfully");
        } else {
            return false
        }
    }
    const handleEdit = (id) => {
        let getEmployee = employee.find((elem) => {
            return elem.id === id
        });

        setIsEdit(true)
        if (getEmployee) {
            setFname(getEmployee.fname);
            setLname(getEmployee.lname);
            setEmail(getEmployee.email);
            setMobileNumber(getEmployee.mobileNumber);
            setDob(new Date(getEmployee.dob));
        }
        setEditId(id)
    }
    return (
        <>
            <div className="container">
                <h1 className="text-center"> {isEdit ? "Update" : "Add"}  Employee</h1>

                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input onChange={(e) => setFname(e.target.value)} value={fname} type="text" name="fname" className="form-control" placeholder="First Name" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input onChange={(e) => setLname(e.target.value)} value={lname} type="text" name="lname" className="form-control" placeholder="Last Name" />
                    </div>
                    <div className="col-6">
                        <label className="form-label">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" className="form-control" placeholder="md@gmail.com" />
                    </div>
                    <div className="col-6">
                        <label className="form-label">Mobile Number</label>
                        <input onChange={(e) => setMobileNumber(e.target.value)} value={mobileNumber} type="number" name="mobileNumber" className="form-control" placeholder="8896448489" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">DOB</label>
                        <DatePicker required={true} placeholderText="Select DOB" dateFormat="yyyy-MM-dd" showYearDropdown={true} showMonthDropdown={true} maxDate={Date.now()} className="form-control" selected={dob} onChange={(date) => setDob(date)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary"> {isEdit ? "Update" : "Add"} employee</button>
                        <button type="button" onClick={resetForm} className="btn btn-info float-end"> Reset</button>
                    </div>
                </form>
                <hr />
                <h1 className="text-center" >Employee List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fullname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.length < 1 ?
                                <tr>
                                    <td colSpan={5}>{"No Employees found"}</td>
                                </tr>
                                :
                                (
                                    employee.map((ele, index) => {
                                        return (
                                            <tr key={ele.id}>
                                                <th scope="row">{ele.id}</th>
                                                <td>{`${ele.fname} ${ele.lname}`}</td>
                                                <td>{ele.email}</td>
                                                <td>{ele.mobileNumber}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <button onClick={() => handleEdit(ele.id)} type="button" className="btn btn-primary">Edit</button>
                                                        <button id="allLeaves" onClick={() => openModal(ele.id)} type="button" className="btn btn-info">Leaves</button>
                                                        <button onClick={() => handleDelete(ele.id)} type="button" className="btn btn-danger">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })

                                )
                        }
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button className="btn btn-success" onClick={closeModal}>close</button>
                <div>Leave List</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End date</th>
                            <th scope="col">Message</th>
                            <th scope="col">No of days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredLeaves.length < 1 ?
                                <tr>
                                    <td colSpan={5}>{"No Leaves found"}</td>
                                </tr>
                                :
                                (
                                    filteredLeaves.map((ele, index) => {
                                        const date1 = new Date(ele.startDate);
                                        const date2 = new Date(ele.endDate);
                                        const diffTime = Math.abs(date2 - date1);
                                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                        return (
                                            <tr key={ele.id}>
                                                <th scope="row">{ele.id}</th>
                                                <td>{ele.startDate}</td>
                                                <td>{ele.endDate}</td>
                                                <td>{ele.message}</td>
                                                <td>{diffDays + 1}</td>
                                            </tr>
                                        )
                                    })

                                )
                        }
                    </tbody>
                </table>
            </Modal>
        </>
    )
}

export default Employee
