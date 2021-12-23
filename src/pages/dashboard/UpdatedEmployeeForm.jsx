import React, { useState, useEffect } from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { editEmployee } from '../../actions/employee.action';
const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: ''

};



const UpdatedEmployeeForm = (props) => {

    const dispatch = useDispatch();
    const loggedUserId = useSelector((state) => state.authlogin.id);
    const editEmployeeData = useSelector((state) => state.addEmployee.addEmployee);
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const editEmployeeDetails = editEmployeeData.find(user => user.email === props.getUserEmail) && editEmployeeData.find(user => user.phonr === props.getUserPhone)
        setUserData(editEmployeeDetails)

    }, []);




    const handleSubmit = (values, actions) => {
        let userData = {
            id: loggedUserId,
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address
        }



        dispatch(editEmployee(userData,
            (success) => {
                actions.setErrors(success)

            },
            (err) => {
                actions.setErrors(err)
            }
        ))

    }


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(1, 'Name cannot be less than 1 character long')
            .max(40, 'Name cannot be more than 40 characters long')
            .required('Please enter your Name'),
        email: Yup.string()
            .required("Please enter your email")
            .email("Enter valid Email Id"),

        phone: Yup.string()
            .required("Please enter your phone number"),
        address: Yup.string()
            .required("Please enter your address")

    })

// For new data updated against old data 
    const updatedInitialValues = Object.assign(initialValues, {
        name: userData && Object.keys(userData).length > 0 ? userData.name : "",
        email: userData && Object.keys(userData).length > 0 ? userData.email : "",
        phone: userData && Object.keys(userData).length > 0 ? userData.phone : "",
        address: userData && Object.keys(userData).length > 0 ? userData.address : "",
    })


    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange, touched, setFieldTouched }) => {

                    return (
                        <Form> 
                        {
                            errors.success ? (
                                <div className="alert alert-success"> {errors.success}</div>
                            ) : (null)
                        }
                        <div className="row no-gutters">
                        <div className="col-xl-12">
                        <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Enter Name*"
                                    id="name"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.name}
                                    isInvalid={errors.name && touched.name}
                                    onBlur={() => setFieldTouched("name")}
                                />
                                {
                                    errors.name && touched.name ? (
                                        <span className="error text-danger"> {errors.name}</span>
                                    ) : (null)
                                }
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name='email'
                                    id="email"
                                    className="form-control"
                                    placeholder="Enter Email ID *"
                                    onChange={handleChange}
                                    value={values.email}
                                    isInvalid={errors.email && touched.email}
                                    onBlur={() => setFieldTouched("email")}

                                />
                                {
                                    errors.email && touched.email ? (
                                        <span className="error text-danger">{errors.email}</span>
                                    ) : (null)
                                }
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name='phone'
                                    id="phone"
                                    className="form-control"
                                    placeholder="Enter Phone Number*"
                                    onChange={handleChange}
                                    value={values.phone}
                                    isInvalid={errors.phone && touched.phone}
                                    onBlur={() => setFieldTouched("phone")}

                                />
                                {
                                    errors.phone && touched.phone ? (
                                        <span className="error text-danger">{errors.phone}</span>
                                    ) : (null)
                                }
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name='address'
                                    id="address"
                                    className="form-control"
                                    placeholder="Enter Address"
                                    onChange={handleChange}
                                    value={values.address}
                                    isInvalid={errors.address && touched.address}
                                    onBlur={() => setFieldTouched("address")}

                                />
                                {
                                    errors.address && touched.address ? (
                                        <span className="error text-danger">{errors.address}</span>
                                    ) : (null)
                                }
                            </div>


                            <div className="form-group">
                                <button
                                    variant="primary"
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Update
                                </button>
                            </div>
                            </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default UpdatedEmployeeForm;