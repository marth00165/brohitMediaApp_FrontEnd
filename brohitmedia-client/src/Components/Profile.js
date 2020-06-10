import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { uploadImage, logoutUser } from "../redux/actions/userActions";

// Icons

const styles = (theme) => ({
  button: {
    marginTop: 20,
    position: "relative",
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});
class Profile extends Component {
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
    // send to server
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;
    let profileMarkUp = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className={"image-wrapper"}>
              <img className={"profile-image"} src={imageUrl} alt={"profile"} />
              <input
                hidden={"hidden"}
                type={"file"}
                id={"imageInput"}
                onChange={this.handleImageChange}
              />
              <Tooltip title={"Edit Profile Image"} placement={"top"}>
                <IconButton
                  onClick={this.handleEditPicture}
                  className={"button"}
                >
                  <EditIcon color={"primary"} />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className={"profile-details"}>
              <MuiLink
                variant={"h5"}
                component={Link}
                to={`/users/${handle}`}
                color={"primary"}
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant={"body2"}>{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color={"primary"} />
                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color={"primary"} />
                  <a
                    href={website}
                    targe={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color={"primary"} />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant={"body2"} align={"center"}>
            No profile, found please Login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant={"contained"}
              color={"primary"}
              component={Link}
              to={"/login"}
            >
              Login
            </Button>
            <Button
              variant={"contained"}
              color={"secondary"}
              component={Link}
              to={"/signup"}
            >
              Sign Up
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>loading...</p>
    );
    return profileMarkUp;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
