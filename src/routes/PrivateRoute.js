import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default ({ component: Component, ...rest }) => {
	const { isloggedin } = useSelector((state) => state.authlogin);

	return (
		<Route
			{...rest}
			render={(props) => {
				return isloggedin ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/' }} />
				);
			}}
		/>
	);
};
