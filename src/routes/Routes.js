import React, { useLayoutEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

/** Private Routes */
import PrivateRoute from './PrivateRoute';

/** Public Routes */
import PublicRoute from './PublicRoute';

// import { withSuspense } from '../hoc/withSuspense';
// import TransparentLoader from '../components/loaders/TransparentLoader';
import Registration from '../pages/registration/Registration';
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PageNotFound from '../pages/error-pages/PageNotFound';

// const Dashboard = withSuspense(React.lazy(() => import(/* webpackChunkName: "Dashboard" */ '../pages/Dashboard')) ,<TransparentLoader/>);

const Routes = () => {
    /**
     * ? Scrolls to the top of page if any submission occurs or layout change occurs
     */

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <Switch>
            <PublicRoute exact path="/" component={Login} />
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Registration} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            {/* Use below code for dashboard when login form is done */}
            {/* <PrivateRoute exact path="/" component={Dashboard} /> */}

            <Route exact path="/404" component={PageNotFound} />
            <Route from="*" render={() => <Redirect to="/404" />} />
        </Switch>
    );
};

export default withRouter(Routes); //withRouter HOC will let us use props for location and history
