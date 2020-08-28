import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LinkIcon from "@material-ui/icons/Link";
import LocationOn from "@material-ui/icons/LocationOn";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={"image-wrapper"}>
          <img className={"profile-image"} src={imageUrl} alt={"profile"} />
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
              <a href={website} targe={"_blank"} rel={"noopener noreferrer"}>
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
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(StaticProfile);
