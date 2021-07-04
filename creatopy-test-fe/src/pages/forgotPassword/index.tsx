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
import { forgetPassword } from "../../redux/modules/userAuth/userAuth";
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

const ForgetPasswordPage: React.FC<Props> = ({ history }) => {
  const [email, setEmail] = useState({ value: "", message: "", isValid: true });

  const userAuth = useSelector<ReduxState, UserCall>((state) => state.userAuth);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedField: any = { value: event.target.value, message: "", isValid: true };
    switch (event.target.name) {
      case "email":
        setEmail(updatedField);
        break;
    }
  };

  const formIsValid = () => {
    const emailObj: any = { ...email };
    const emailTest: RegExp = Validations.emailValidation;
    let isGood: boolean = true;
    emailObj.message = " ";
    emailObj.isValid = true;
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
    setEmail(emailObj);
    return isGood;
  };


  const onSubmit = () => {
    if (formIsValid()) {
      dispatch(forgetPassword(email.value));
    }
  };

  useEffect(() => {
    const messages: any = {
      [HttpStatusCodeName.INTERNAL_SERVER_ERROR]: {
        type: "e",
        message: "Problem in internet connection",
      },
      [HttpStatusCodeName.FORBIDDEN]: {
        type: "e",
        message:
          "Your email is not confirmed yet, please confirm it before logging in.",
      },
      [HttpStatusCodeName.UNAUTHORIZED]: {
        type: "e",
        message: "Please check your credentials again.",
      },
      [HttpStatusCodeName.BAD_REQUEST]: {
        type: "e",
        message: "General error, please check support team.",
      },
      [HttpStatusCodeName.OK]: {
        type: "s",
        message: "An email is sent to you for reset password.",
      },
    };
    Utils.notifyUserToast(notifyUser, userAuth.status, messages);
    if (userAuth.status === HttpStatusCode.OK) {
      history.push({ pathname: RoutesPaths.Login });
    }
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
          </form>
        </CardContent>
        <CardActions>
          <Button size="large" color="secondary" onClick={() => {
            history.push(RoutesPaths.Login);
          }}>Login</Button>
          <Button size="large" color="primary" onClick={onSubmit}>Reset password</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ForgetPasswordPage;
