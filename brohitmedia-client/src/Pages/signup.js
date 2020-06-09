import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar1 from "../images/femaleAvatar.png";
import Avatar2 from "../images/maleAvatar.jpeg";

// Redux stuff
import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/userActions";

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const avatarArr = [Avatar1, Avatar2];

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
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
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signUpUser(newUserData, this.props.history);
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
            Signup
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
            />
            <TextField
              id={"handle"}
              name={"handle"}
              type={"text"}
              label={"Handle"}
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              helperText={errors.handle}
              error={!!errors.handle}
              fullWidth
            />
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
            <TextField
              id={"confirmPassword"}
              name={"confirmPassword"}
              type={"password"}
              label={"Confirm Password"}
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              helperText={errors.confirmPassword}
              error={!!errors.confirmPassword}
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
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account? <Link to={"/login"}>Login!</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signUpUser })(
  withStyles(styles)(Signup)
);
