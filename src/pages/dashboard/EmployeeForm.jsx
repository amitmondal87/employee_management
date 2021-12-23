import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee } from '../../actions/employee.action';
const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: ''

};
const EmployeeForm = () => {
    const dispatch = useDispatch();
    const loggedUserId = useSelector((state) => state.authlogin.id);

    const handleSubmit = (values, actions) => {
        let userData = {
            id: loggedUserId,
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address
        }



        dispatch(addEmployee(userData,
            (success) => {              
                actions.resetForm()
            },
            (err) => {
                actions.setErrors(err)
            }
        ))

    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(1, 'Name cannot be less than 1 character long')
            .max(40, 'Name cannot be more than 40 characters long')
            .required('Please enter your Name'),
        email: Yup.string()
            .required("Please enter your email")
            .email("Enter valid Email Id"),

        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
            .required("Please enter your phone number"),
        address: Yup.string()
            .required("Please enter your address")

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
                        <Form id="addNewEmployeeForm"> 
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
                                    Add Employee
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

export default EmployeeForm;