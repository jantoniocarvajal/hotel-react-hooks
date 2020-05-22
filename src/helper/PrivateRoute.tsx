import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMapState } from '../contexts/MapState';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const {mapState: {actualState}, setMapState} = useMapState();
    const isLogin = actualState?.userLogin ? true : false;

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to login page
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;