import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify"

const Leaves = () => {
    const dispatch = useDispatch()
    const [empName, setEmpName] = useState("")
    const [message, setMessage] = useState("")
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const resetForm = () => {
        setEmpName("")
        setMessage("")
        setStartDate("")
        setEndDate("")
    }

    const leaves = useSelector(state => state.leaveReducer)
    const employee = useSelector(state => state.employeeReducer)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: Date.now().toString(),
            empName, message,
            startDate: new Date(startDate).toISOString().split('T')[0],
            endDate: new Date(endDate).toISOString().split('T')[0]
        }
        if (!empName || !message || !startDate || !endDate) {
            return toast.warning("Please fill all the details");
        }
        dispatch({ type: "ADD_LEAVE", payload: formData })
        toast.success("Leave Added");
        resetForm();
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete Leave!")) {
            dispatch({ type: "DELETE_LEAVE", payload: id })
            toast.success("Employee Deleted Successfully");
        } else {
            return false
        }
    }

    const employees = useSelector(state => state.employeeReducer)
    return (
        <>
            <div className="container">
                <h2 className="text-center">Add Employee Leaves</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-6">
                            <select onChange={(e) => setEmpName(e.target.value)} name="empName" className="form-select">
                                <option>--Select employee--</option>
                                {
                                    employees ? (
                                        employees.map((ele, i) => {
                                            return <option key={ele.id} value={ele.id}>{`${ele.fname} ${ele.lname}`}</option>
                                        })
                                    ) : ""
                                }
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter leave message" name="message" type="text" className="form-control" />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-6">
                            <DatePicker required={true} placeholderText="Select Start date" dateFormat="yyyy-MM-dd" showYearDropdown={true} showMonthDropdown={true} minDate={Date.now()} className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="col-sm-6">
                            <DatePicker required={true} placeholderText="Select Start date" dateFormat="yyyy-MM-dd" showYearDropdown={true} showMonthDropdown={true} minDate={startDate} className="form-control" selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Add leave</button>
                </form>
                <hr />
                <h1 className="text-center" >Employee List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Employee</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End date</th>
                            <th scope="col">No of days</th>
                            <th scope="col">Message</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaves.length < 1 ?
                                <tr>
                                    <td colSpan={5}>{"No Leaves found"}</td>
                                </tr>
                                :
                                (
                                    leaves.map((ele, index) => {
                                        let emp = employee.find(e => e.id == ele.empName);
                                        const date1 = new Date(ele.startDate);
                                        const date2 = new Date(ele.endDate);
                                        const diffTime = Math.abs(date2 - date1);
                                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                        return (
                                            <tr key={ele.id}>
                                                <td scope="row">{ele.id}</td>
                                                <td scope="row">{`${emp.fname} ${emp.lname} `}</td>
                                                <td>{`${ele.startDate}`}</td>
                                                <td>{`${ele.endDate}`}</td>
                                                <td>{diffDays + 1}</td>
                                                <td>{ele.message}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
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
        </>
    )
}

export default Leaves
