import React from 'react'
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { NewRegister } from '../../actions/register.action';
const initialValues = {
    id: '',
    name: '',
    email: '',
    password: '',
    cpassword: ''
};

const Registration = () => {
const dispatch = useDispatch();
const userData = useSelector((state) => state.newRegister.newRegister);
const navigate = useNavigate();
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .min(1, 'Name cannot be less than 1 character long')
        .max(40, 'Name cannot be more than 40 characters long')
        .required('Name is required !'),
    email: Yup.string()
        .required("Email is required !")
        .email("Email is invalid"),

    password: Yup.string()
        .required("Password is required !"),
    cpassword: Yup.string()
        .required("Confirm Password is required !")
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
})







const date = new Date()
const handleSubmit = (values, actions) => {
    let registrationData = {
        id: 'INT'.toUpperCase() + date.getTime().toString(),
        name: values.name,
        email: values.email,
        password: values.password,
        cpassword: values.cpassword
    }

    dispatch(NewRegister(registrationData,
        (success) => {
            alert('Success');
            document.getElementById('registrationform').reset();
            navigate("/login")
            
        },
        (err) => {
            actions.setErrors(err)
        }
    ));
}






    return (
<div className="authincation h-100">
    <div className="container-fluid h-100">
        <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-4">
                <div className="authincation-content">
                    <div className="row no-gutters">
                        <div className="col-xl-12">
                            <div className="auth-form">
                                <h4 className="text-center mb-4">Sign up your account</h4>
                                <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                >
                                {({ values, errors, handleChange, touched, setFieldTouched }) => {

                                return (
                                        <FormikForm id='registrationform'>
                                            <div className="form-group">
                                                <label><strong>Name</strong></label>
                                                <input type="text" 
                                                className="form-control" 
                                                name='name' 
                                                id='name'
                                                onChange={handleChange}
                                                value={values.name}
                                                onBlur={() => setFieldTouched("name")}
                                                 />
                                              {
                                                errors.name && touched.name ? (
                                                    <span className="error text-danger">{errors.name}</span>
                                                ) : (null)
                                              }
                                            </div>
                                            <div className="form-group">
                                                <label><strong>Email</strong></label>
                                                <input type="email" 
                                                className="form-control" 
                                                name='email' 
                                                id='email'
                                                onChange={handleChange}
                                                value={values.email}
                                                onBlur={() => setFieldTouched("email")}

                                            />
                                                {
                                                    errors.email && touched.email ? (
                                                        <span className="error text-danger">{errors.email}</span>
                                                    ) : (null)
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label><strong>Password</strong></label>
                                                <input type="password" 
                                                className="form-control" 
                                                name='password' 
                                                id='password' 
                                                onChange={handleChange}
                                                value={values.password}
                                                onBlur={() => setFieldTouched("password")}
                                                 />
                                               {
                                                    errors.password && touched.password ? (
                                                        <span className="error text-danger">{errors.password}</span>
                                                    ) : (null)
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label><strong>Confirm Password</strong></label>
                                                <input type="password" 
                                                className="form-control" 
                                                name='cpassword' 
                                                id='cpassword'
                                                onChange={handleChange}
                                                value={values.cpassword}
                                                onBlur={() => setFieldTouched("cpassword")}
                                                 />
                                               {
                                                    errors.cpassword && touched.cpassword ? (
                                                        <span className="error text-danger">{errors.cpassword}</span>
                                                    ) : (null)
                                                }
                                            </div>
                                            <div className="text-center mt-4">
                                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                                            </div>
                                        </FormikForm>
                                         );
                                    }}
                                </Formik>
                                <div className="new-account mt-3">
                                    <p>Already have an account? <Link className="text-primary" to="/">Sign in</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default Registration
