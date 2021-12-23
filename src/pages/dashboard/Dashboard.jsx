import react, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeEmployee } from '../../actions/employee.action';
import { logout } from '../../actions/login.action';
import EmployeeForm from './EmployeeForm';
import UpdatedEmployeeForm from './UpdatedEmployeeForm';
import './dashboard.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import React from 'react';
  

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
    console.log(loggedID)
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
                            <li>Welcome {email}</li>
                            <li><button className="btn btn-primary btn-sm" onClick={() => dispatch(logout())}> Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <div className="container pt-5 pb-5">

                <div>
                    <div className="row ">
                        <div className="col-md-12">
                            

            <Button color="primary"
                onClick={toggle}>Add Employee</Button>
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
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
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
                                                        <button className="btn btn-outline-warning btn-sm m-1" onClick={() => editUserHandler(user.email)}>Edit</button>
                                                        <button className="btn btn-danger btn-sm m-1" onClick={() => dispatch(removeEmployee(user.email))}>Remove</button></td>
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
