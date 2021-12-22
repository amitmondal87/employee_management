import React from 'react'
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { login } from '../../actions/login.action';


const initialValues = {
    email: '',
    password: ''
};


const Login = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const userData = useSelector((state) => state.authlogin.userData);
const isloggedin = useSelector((state) => state.authlogin.isloggedin);


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Please enter your email ID")
        .email("Enter valid Email Id"),
    password: Yup.string()
        .required("Please enter your password"),
})








const handleSubmit = (values, actions) => {
    let loginData = {
        email: values.email,
        password: values.password,

    }

    dispatch(login(loginData,
        (success) => {
            alert('Success')

        },
        (err) => {
            alert('Failed')
            actions.setErrors(err)
        }
    ))

}

if (isloggedin) return navigate("/dashboard")
    return ( 
<div className="authincation h-100">
    <div className="container-fluid h-100">
        <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-4">
                <div className="authincation-content">
                    <div className="row no-gutters">
                        <div className="col-xl-12">
                            <div className="auth-form">
                                <h4 className="text-center mb-4">Sign in your account</h4>
                                <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                 >
                                 {({ values, errors, handleChange, touched, setFieldTouched }) => {

                                return (
                                        <FormikForm>
                                        <div className="form-group">
                                            <label><strong>Email</strong></label>
                                            <input type="email" 
                                            className="form-control"
                                            name='email'
                                            id="email"
                                            placeholder="Enter Email *"
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
                                            id="password"
                                            placeholder="Enter password *"
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
                                        <div className="text-center mt-4">
                                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                                        </div>
                                        </FormikForm>
                                        );
                                    }}
                                </Formik>
                                <div className="new-account mt-3">
                                    <p>Don't have an account? <Link className="text-primary" to="/register">Sign up</Link></p>
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

export default Login
