import React, { Component } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Redux

import { connect } from "react-redux";
import { getPost } from "../redux/actions/dataActions";

const styles = {};

class PostDialog extends Component {
  render() {
    return <div></div>;
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.data.UI,
});

export default connect(mapStateToProps, { getPost })(
  withStyles(styles)(PostDialog)
);
