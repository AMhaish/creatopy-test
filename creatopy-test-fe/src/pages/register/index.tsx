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
import { registerAction } from "../../redux/modules/userAuth/userAuth";
import { notifyUser } from "../../redux/modules/views/views";

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


interface Props {
  history: any;
}
// #endregion

const RegisterPage: React.FC<Props> = ({ history }) => {
  const [email, setEmail] = useState({ value: "", message: "", isValid: true });
  const [password, setPassword] = useState({ value: "", message: "", isValid: true });
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const userAuth = useSelector<ReduxState, UserCall>((state) => state.userAuth);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedField: any = { value: event.target.value, message: "", isValid: true };
    switch (event.target.name) {
      case "email":
        setEmail(updatedField);
        break;
      case "password":
        setPassword(updatedField);
        break;
    }
  };

  const formIsValid = () => {
    const emailObj: any = { ...email };
    const passwordObj: any = { ...password };
    const emailTest: RegExp = Validations.emailValidation;
    let isGood: boolean = true;
    emailObj.message = " ";
    emailObj.isValid = true;
    passwordObj.message = " ";
    passwordObj.isValid = true;
    if (!emailTest.test(emailObj.value)) {
      emailObj.isValid = false;
      emailObj.message = Messages.emailMessage;
      isGood = false;
    }
    if (!(emailObj.value.length > 0)) {
      emailObj.isValid = false;
      emailObj.message = Messages.emptyMessage;
      isGood = false;
    }
    if (!(passwordObj.value.length > 0)) {
      passwordObj.isValid = false;
      passwordObj.message = Messages.emptyMessage;
      isGood = false;
    }
    setEmail(emailObj);
    setPassword(passwordObj);
    return isGood;
  };


  const onSubmit = () => {
    if (formIsValid()) {
      dispatch(
        registerAction({
          email: email.value,
          password: password.value
        })
      );
    }
  };

  useEffect(() => {
    if (userAuth.status === HttpStatusCode.OK && userAuth.isAuthenticated) {
      history.push({ pathname: RoutesPaths.Home });
    }
    const messages: any = {
      [HttpStatusCodeName.INTERNAL_SERVER_ERROR]: {
        type: "e",
        message: "Problem in internet connection",
      },
      [HttpStatusCodeName.FORBIDDEN]: {
        type: "e",
        message: "You have already an account in our system, please try to login.",
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
                label="Email"
                name="email"
                onChange={handleChange}
                value={email.value}
              //className={`form-control ${emailGroupClass}`}
              />
            </div>
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
            history.push(RoutesPaths.Login);
          }}>Already have an account</Button>
          <Button size="large" color="primary" onClick={onSubmit}>Register</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default RegisterPage;
