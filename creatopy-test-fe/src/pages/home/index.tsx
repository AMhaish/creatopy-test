import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { Messages, Validations } from "../../config/validationConstant";
import * as Utils from "../../helper/utils";
import HttpStatusCode, {
  HttpStatusCodeName,
} from "../../models/objects/httpStatusCode";
import RoutesPaths from "../../routes/routesPaths";
import ReduxState from "../../models/objects/reduxState";
import { UserCall } from "../../models/objects/user";
import { notifyUser } from "../../redux/modules/views/views";
import { GET_ITEMS_QUERY } from "../../models/graphql/queries";
import { ADD_ITEM_MUTATION } from "../../models/graphql/mutations";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import Item, { ItemQueryResult } from "../../models/objects/item";
import InboxIcon from '@material-ui/icons/Inbox';

interface Props {
  history: any;
}
// #endregion

const HomePage: React.FC<Props> = ({ history }) => {
  const { loading, data } = useQuery<ItemQueryResult>(GET_ITEMS_QUERY, { fetchPolicy: "no-cache" });
  const [addItem, mutationResult] = useMutation<any>(ADD_ITEM_MUTATION, { fetchPolicy: "no-cache" });

  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState({ value: "", message: "", isValid: true });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedField: any = { value: event.target.value, message: "", isValid: true };
    switch (event.target.name) {
      case "title":
        setTitle(updatedField);
        break;
    }
  };

  const formIsValid = () => {
    const titleObj: any = { ...title };
    let isGood: boolean = true;
    titleObj.message = " ";
    titleObj.isValid = true;
    if (!(titleObj.value.length > 0)) {
      titleObj.isValid = false;
      titleObj.message = Messages.emptyMessage;
      isGood = false;
    }
    setTitle(titleObj);
    return isGood;
  };

  const onSubmit = () => {
    if (formIsValid()) {
      addItem({ variables: { title: title.value } });
      setTitle({ value: "", message: "", isValid: true });
    }
  };

  useEffect(() => {
    if (data?.items && items.length === 0) {
      setItems(data.items);
    }
  }, [data]);

  useEffect(() => {
    if (mutationResult?.data?.addItem) {
      setItems(state => [...state, mutationResult.data.addItem]);
    }
  }, [mutationResult.data]);


  return (
    <Container maxWidth="sm">
      <Card variant="outlined">
        <CardContent>
          {(loading ?
            <span>Loading items...</span> :
            (items && items.length > 0 ?
              <List component="nav">
                {(
                  items.map((item: Item) => (
                    <ListItem button>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItem>
                  ))
                )}
              </List> :
              <span>Empty until now.</span>
            )
          )}
          <form noValidate autoComplete="on">
            <div>
              <TextField
                fullWidth
                margin="normal"
                id="standard-basic"
                label="New Title"
                name="title"
                onChange={handleChange}
                value={title.value}
              //className={`form-control ${emailGroupClass}`}
              />
            </div>
          </form>
        </CardContent>
        <CardActions>
          <Button size="large" color="primary" onClick={onSubmit}>Add</Button>
        </CardActions>
      </Card>
      <Button size="large" color="secondary" href="/logout">Logout</Button>
    </Container>
  );
};

export default HomePage;
