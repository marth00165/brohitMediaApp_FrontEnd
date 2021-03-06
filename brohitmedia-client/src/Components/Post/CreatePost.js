import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

// Redux stuff
import { connect } from "react-redux";
import {
  createPost,
  // getPosts,
  clearErrors,
} from "../../redux/actions/dataActions";

// MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
});

class CreatePost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false });
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
    this.props.clearErrors();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createPost({
      body: this.state.body,
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip={"Create Post"}>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth={"sm"}
        >
          <MyButton
            tip={"close"}
            onClick={this.handleClose}
            btnClassName={classes.closeButton}
          >
            <Close />
          </MyButton>
          <DialogTitle> What you feeling like...</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name={"body"}
                type={"text"}
                label={"Post"}
                multiline
                rows={3}
                placeholder={"Cook Up A Post"}
                error={!!errors.body}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CreatePost.propTypes = {
  UI: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { createPost, clearErrors })(
  withStyles(styles)(CreatePost)
);
