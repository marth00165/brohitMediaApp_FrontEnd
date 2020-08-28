import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// Redux

import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/dataActions";

// MUI

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = {
  deleteButton: {},
};

class DeleteComment extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  deleteComment = () => {
    this.props.deleteComment(this.props.postId, this.props.commentId);
    this.setState({
      open: false,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip={"Delete Comment"}
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color={"secondary"} />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth={"sm"}
        >
          <DialogTitle>Delete Comment?</DialogTitle>
          <DialogActions>
            <Button color={"primary"} onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color={"secondary"} onClick={this.deleteComment}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteComment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { deleteComment })(
  withStyles(styles)(DeleteComment)
);
