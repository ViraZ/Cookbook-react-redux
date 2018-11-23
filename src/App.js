import React, { Component } from "react";
import ListComponent from "./components/ListComponent";
import FormDialog from "./components/FormDialog";
import EditDialog from "./components/EditDialog";
import SimpleAppBar from "./components/SimpleAppBar";
import { OPEN_FORM } from "./constants/action-types";
import store from "./store/index";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
window.store = store;

class AppComponent extends Component {
  openDialog = () => {
    store.dispatch({
      type: OPEN_FORM
    });
  };

  render() {
    return (
      <div>
        <SimpleAppBar />
        <ListComponent />

        <FormDialog />
        <EditDialog />

        <Button
          variant="fab"
          style={{
            position: "absolute",
            bottom: 10,
            right: 10
          }}
          onClick={this.openDialog}
          color="secondary"
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default AppComponent;
