import React from "react";
import { Switch, Route } from "react-router-dom";
import RoutesPaths from "./routesPaths";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ForgotPasswordPage from "../pages/forgotPassword";
import ResetPasswordPage from "../pages/resetPassword";
import NotFoundPage from "../pages/notFound";
import Home from "../pages/home";
import { PrivateRoute, LogoutRoute } from "../components";


const RoutesList: React.FC = () => {
    return (
        <Switch>
            <Route path={RoutesPaths.Login} component={LoginPage} exact={true} />
            <Route path={RoutesPaths.Register} component={RegisterPage} exact={true} />
            <Route path={RoutesPaths.ForgotPassowrd} component={ForgotPasswordPage} exact={true} />
            <Route path={RoutesPaths.ResetPassword} component={ResetPasswordPage} exact={true} />
            <LogoutRoute path={RoutesPaths.Logout} />
            <PrivateRoute path={RoutesPaths.Home} component={Home} />
            <Route path={RoutesPaths.NotFound} component={NotFoundPage} />
        </Switch>
    );
};

export default RoutesList;
