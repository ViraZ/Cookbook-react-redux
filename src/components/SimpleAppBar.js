import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/Delete";
import store from "../store/index";
import { DELETE_ARTICLE } from "../constants/action-types";
import LocalLibrary from "@material-ui/icons/LocalLibrary";

const styles = {};
class SimpleAppBar extends React.Component {
  state = {
    checked: []
  };
  handleDelete = () => {
    store.dispatch({
      type: DELETE_ARTICLE
    });
  };

  componentDidMount() {
    this.setState({
      checked: store.getState()["uiState"]["checked"]
    });

    store.subscribe(() => {
      this.setState({
        checked: store.getState()["uiState"]["checked"]
      });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" style={{'backgroundColor': '#ffbbbb70'}} color="default">
        <Toolbar>
          <Typography variant="title" color="secondary">
              <LocalLibrary />  Cookbook
          </Typography>

          {this.state.checked.length !== 0 ? (
            <IconButton onClick={this.handleDelete} color="inherit">
              <AccountCircle />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
