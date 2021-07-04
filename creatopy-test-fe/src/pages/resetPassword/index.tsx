import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Messages, Validations } from "../../config/validationConstant";
import * as Utils from "../../helper/utils";
import HttpStatusCode, {
  HttpStatusCodeName,
} from "../../models/objects/httpStatusCode";
import RoutesPaths from "../../routes/routesPaths";
import ReduxState from "../../models/objects/reduxState";
import { UserCall } from "../../models/objects/user";
import { resetPassword } from "../../redux/modules/userAuth/userAuth";
import { notifyUser } from "../../redux/modules/views/views";
import DefaultProps from "../../models/objects/defaultProps";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";


const RestPasswordPage: React.FC<DefaultProps> = (props: DefaultProps) => {
  const [password, setPassword] = useState({ value: "", message: "", isValid: true });
  const userAuth = useSelector<ReduxState, UserCall>((state) => state.userAuth);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedField: any = { value: event.target.value, message: "", isValid: true };
    switch (event.target.name) {
      case "password":
        setPassword(updatedField);
        break;
    }
  };

  const formIsValid = () => {
    const passwordObj: any = { ...password };
    let isGood: boolean = true;
    passwordObj.message = " ";
    passwordObj.isValid = true;
    if (!(passwordObj.value.length > 0)) {
      passwordObj.isValid = false;
      passwordObj.message = Messages.emptyMessage;
      isGood = false;
    }
    setPassword(passwordObj);
    return isGood;
  };

  const onSubmit = () => {
    if (formIsValid()) {
      dispatch(resetPassword(password.value, props.match.params.token));
    }
  };

  useEffect(() => {
    if (userAuth.status === HttpStatusCode.OK) {
      props.history.push({ pathname: RoutesPaths.Login });
    }
    const messages: any = {
      [HttpStatusCodeName.INTERNAL_SERVER_ERROR]: {
        type: "e",
        message: "Problem in internet connection",
      },
      [HttpStatusCodeName.FORBIDDEN]: {
        type: "e",
        message:
          "Your reset password link is not valid anymore.",
      },
      [HttpStatusCodeName.UNAUTHORIZED]: {
        type: "e",
        message: "Your reset password link is not valid anymore.",
      },
      [HttpStatusCodeName.BAD_REQUEST]: {
        type: "e",
        message: "General error, please check support team.",
      },
    };
    Utils.notifyUserToast(notifyUser, userAuth.status, messages);
  }, [userAuth.status, userAuth.isAuthenticated]);


  return (
    <Container maxWidth="sm">
      <Card variant="outlined">
        <CardContent>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                fullWidth
                margin="normal"
                id="standard-basic"
                label="Password"
                //className={`form-control ${passwordGroupClass}`}
                name="password"
                type={"password"}
                value={password.value}
                onChange={handleChange}
              />
            </div>
          </form>
        </CardContent>
        <CardActions>
          <Button size="large" color="secondary" onClick={() => {
            props.history.push(RoutesPaths.ForgotPassowrd);
          }}>Forget Password</Button>
          <Button size="large" color="secondary" onClick={() => {
            props.history.push(RoutesPaths.Login);
          }}>Login</Button>
          <Button size="large" color="primary" onClick={onSubmit}>Reset password</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default RestPasswordPage;
