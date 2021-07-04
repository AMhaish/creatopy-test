import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import auth from '../../../services/auth';


const PrivateRoute = (props) => {
  const { component: BaseComponent, ...rest } = props;
  const { location } = props;

  const isAuthenticated = () => {
    // $FlowIgnore
    const checkUserHasId = user => user && user.id && user.id.length > 0;
    const user = auth.getUserInfo() ? auth.getUserInfo() : null;
    const isAuthenticated =
      auth.getToken() && checkUserHasId(user) ? true : false;
    return isAuthenticated;
  }

  const isExpired = () => {
    //return auth.isExpiredToken(auth.getToken());
    return false;
  }
  const isUserAuthenticated = isAuthenticated();
  const isTokenExpired = isExpired();

  return (
    <Route
      {...rest}
      render={props =>
        !isTokenExpired && isUserAuthenticated ? (
          <BaseComponent {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );


}
PrivateRoute.propTypes = {
  // react-router 4:
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  component: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default withRouter(PrivateRoute);