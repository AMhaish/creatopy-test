// #region imports
import React, { PureComponent } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import auth from '../../../services/auth';
import RoutesPaths from '../../../routes/routesPaths';
// #endregion

class LogoutRoute extends PureComponent {
  // #region lifecycle
  componentDidMount() {
    auth.clearAllAppStorage();
  }

  render() {
    console.log('Clearing the session');
    return (
      <Route {...this.props}>
        <Redirect to={{ pathname: RoutesPaths.Login }} />
      </Route>
    );
  }
  // #endregion
}

export default withRouter(LogoutRoute);