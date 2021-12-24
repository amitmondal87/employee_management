import react, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeEmployee } from '../../actions/employee.action';
import { logout } from '../../actions/login.action';
import EmployeeForm from './EmployeeForm';
import UpdatedEmployeeForm from './UpdatedEmployeeForm';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Overlay from 'react-bootstrap/Overlay';
import './dashboard.css';

import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import React from 'react';
import { Tooltip } from 'react-bootstrap';
import Swal from 'sweetalert2' 

const Dashboard = () => {
    //Modal
    // Modal open state
    const [modal, setModal] = React.useState(false); 
    //const [modal2, setModal2] = React.useState(false); 
    // Toggle for Modal
    const toggle = () => setModal(!modal);
    //const toggle2 = () => setModal2(!modal);

    const dispatch = useDispatch();
    const registeredUsers = useSelector((state) => state.newRegister.newRegister)
    const email = useSelector((state) => state.authlogin.email);
    const name = useSelector((state) => state.authlogin.name);
    const loggedID = useSelector((state) => state.authlogin.id);
    const users = useSelector((state) => state.addEmployee.addEmployee)
    const filteredUserList = users.filter(user => user.id == loggedID)
    let [editModal, setEditModal] = useState(false)
    const toggle2 = () => setEditModal(!editModal);
    let [employeeEmail, setEmployeeEmail] = useState('')

    const editUserHandler = (email) => {
        setEditModal(true);
        setEmployeeEmail(email)
        // console.log(userEmail)

    }

    const delUserHandler = (email) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              dispatch(removeEmployee (email))
            }
          })
    }


    console.log(loggedID)

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    // For Profile Pics
    var profileIcon = `https://joeschmoe.io/api/v1/${name}`


    var now = new Date();
    var hrs = now.getHours();
    var msg = "";
    
    if (hrs >  0) msg = "Mornin' Sunshine! and Welcome back!"; // REALLY early
    if (hrs >  6) msg = "Good morning and Welcome back!";      // After 6am
    if (hrs > 12) msg = "Good afternoon and Welcome back!";    // After 12pm
    if (hrs > 17) msg = "Good evening and Welcome back!";      // After 5pm
    if (hrs > 22) msg = "Go to bed!";        // After 10pm



    var weekday = new Array(7);

    weekday[0] = "spectacular Sunday";
    weekday[1] = "marvelous Monday";
    weekday[2] = "terrific Tuesday";
    weekday[3] = "wonderful Wednesday";
    weekday[4] = "totally cool Thursday";
    weekday[5] = "fantastic Friday";
    weekday[6] = "sweet Saturday";

    var currentDate = new Date();
    var weekdayValue = currentDate.getDay();

    return (
        <>
        <div id="main-wrapper">
        <div className='topHeader'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 topHeaderinner'>
                        <ul>
                            <li><h4><span>INT</span> Employee Management</h4></li>
                        </ul>
                        <ul className="headerRight">
                        <li>Date : {date.toLocaleDateString()} | Time : {date.toLocaleTimeString()}</li>
                            <li><button className="btn btn-primary btn-sm" onClick={() => dispatch(logout())}> Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <div className="container">

                <div>
                <div className="row page-titles">
    <div className="col-sm-12">
        <div className="welcome-text">
        <div className="profile"><img src={profileIcon} /> </div>
        <div>
            <h4>Hi {name}, <span>{msg}</span></h4>
            <h5>Have a {weekday[weekdayValue]} ! </h5>
        </div>

            
        </div>
    </div>

</div>
                    <div className="row ">
                        <div className="col-md-12">
                            
                        

            <Modal isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 1000 }}>
                <ModalHeader
                    toggle={toggle}>ADD Employee</ModalHeader>
                <ModalBody>
                <EmployeeForm />
                </ModalBody>
            </Modal>
  

                            <div className="card mt-3">
                            <div className="card-header">
                                <h4 className="card-title">Employee Details</h4>
                                <OverlayTrigger 
                                placement="bottom"
                                overlay={
                                <Tooltip id="button-tooltip">
                                Add Employee Details
                                </Tooltip>
                                }
                                >
                                <Button color="success" className='float-end btn-sm' onClick={toggle}>Add Employee</Button>
                                </OverlayTrigger>
                            </div>
                                <div className="card-body">
                                

                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUserList.length >= 1 ? filteredUserList && filteredUserList.map((user, empID) =>

                                                    <tr key={empID}>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td>{user.address}</td>
                                                        <td>

                                                        <OverlayTrigger 
                                                        placement="bottom"
                                                        overlay={
                                                        <Tooltip id="button-tooltip">
                                                        Edit Employee Details
                                                        </Tooltip>
                                                        }
                                                        >
                                                        <button className="btn btn-success btn-sm m-1" onClick={() => editUserHandler(user.email)}>Edit</button>
                                                        </OverlayTrigger>

                                                        <OverlayTrigger 
                                                        placement="bottom"
                                                        overlay={
                                                        <Tooltip id="button-tooltip">
                                                        Remove Employee Details
                                                        </Tooltip>
                                                        }
                                                        >
                                                        <button className="btn btn-danger btn-sm m-1" onClick={() => delUserHandler(user.email)}>Remove</button>
                                                        </OverlayTrigger>
                                                       
                                                        </td>
                                                    </tr>
                                                ) :
                                                    <tr className="alert alert-danger">
                                                        <td colSpan="5">
                                                            Employee details not found
                                                        </td>
                                                    </tr>

                                                }



                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>
            {
                editModal &&

<>
                <Modal isOpen={editModal}
                toggle={toggle2}
                modalTransition={{ timeout: 1000 }}>
                <ModalHeader
                    toggle={toggle2}>Edit Employee</ModalHeader>
                <ModalBody>
                <UpdatedEmployeeForm getUserEmail={employeeEmail} />
                </ModalBody>
                 </Modal>
</>
               
            }
        </>

    )
}

export default Dashboard
