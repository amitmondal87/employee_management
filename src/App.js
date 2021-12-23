import React from 'react';
import { lazy, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { ErrorBoundary } from 'react-error-boundary';


  import FullPageLoader from './components/loaders/FullPageLoader';
  import ErrorFallback from './Error/ErrorBoundary/ErrorFallback';
  import errorHandler from './Error/ErrorBoundary/errorHandler';
  import { withSuspense } from './hoc/withSuspense';
  
//Tostify Alert
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'

// import Registration from './pages/registration/Registration';
// import Login from "./pages/login/Login";
// import Dashboard from "./pages/dashboard/Dashboard";

const Routes = withSuspense(
	lazy(() => import(/* webpackChunkName: "routes" */ './routes/Routes')),
	<FullPageLoader />
);




function App() {
  	useEffect(() => {
		// Disable logs in production
		if (process.env.NODE_ENV !== 'development') {
			let noOp = function () {}; // no-op function
			if (!window.console) {
				console = {
					log: noOp,
					warn: noOp,
					error: noOp,
				};
			} else {
				console = {
					...console,
					log: noOp,
					warn: noOp,
					error: noOp,
				};
			}
		}
	}, []);
  return (
    <>
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
    <Switch>
      <Route path="/" component={Routes} />
    </Switch>
   </ErrorBoundary>
    <ToastContainer />
    </>
  );
}

export default App;
