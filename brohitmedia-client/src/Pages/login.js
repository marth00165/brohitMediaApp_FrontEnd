import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar1 from "../images/femaleAvatar.png";
import Avatar2 from "../images/maleAvatar.jpeg";

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux Stuff

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const avatarArr = [Avatar1, Avatar2];
const styles = (theme) => ({
  ...theme.spreadThis,
  image: {
    borderRadius: "50%",
    height: "150px",
    width: "150px",
  },
});

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };
  random = (mn, mx) => {
    return Math.random() * (mx - mn) + mn;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img
            className={classes.image}
            alt={"login"}
            src={avatarArr[Math.floor(this.random(1, 3)) - 1]}
          />
          <Typography variant={"h2"} className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id={"email"}
              name={"email"}
              type={"email"}
              label={"Email"}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={!!errors.email}
              fullWidth
            />{" "}
            <TextField
              id={"password"}
              name={"password"}
              type={"password"}
              label={"Password"}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={!!errors.password}
              fullWidth
            />
            {errors.general && (
              <Typography
                variant={"body2"}
                className={classes.customError}
                value={errors.general}
              >
                {errors.general}
              </Typography>
            )}
            <Button
              type={"submit"}
              variant={"contained"}
              color={"primary"}
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
            <small>
              Don't have an account? <Link to={"/signup"}>Sign Up!</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
