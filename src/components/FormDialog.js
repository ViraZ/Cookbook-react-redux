import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "../store/index";
import { CLOSE_FORM } from "../constants/action-types";
import { ADD_ARTICLE } from "../constants/action-types";
window.store = store;

export default class FormDialog extends React.Component {
  state = {
    open: false,
    article: ""
  };

  handleClose = () => {
    store.dispatch({
      type: CLOSE_FORM,
      payload: {
        openFormDialog: false
      }
    });
  };

  handleChange = name => event => {
    this.setState({
      article: event.target.value
    });
  };

  handleSave = () => {
    store.dispatch({
      type: ADD_ARTICLE,
      payload: {
        title: this.state.article,
        id: store.getState()["articles"].length,
        date: new Date().toLocaleDateString()
      }
    });

    store.dispatch({
      type: CLOSE_FORM
    });
  };

  componentDidMount() {
    this.setState({
      open: store.getState()["uiState"]["openFormDialog"]
    });

    store.subscribe(() => {
      console.log(
        "Form Dialog State" + JSON.stringify(store.getState()["uiState"])
      );

      this.setState({
        open: store.getState()["uiState"]["openFormDialog"]
      });
    });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add recipe</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter new recipe.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Recipe article"
              multiline
              rowsMax="4"
              rows="4"
              fullWidth
              onChange={this.handleChange("multiline")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
