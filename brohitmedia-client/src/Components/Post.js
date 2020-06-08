import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI Stuff

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  image: {
    minWidth: 200,
  },
};

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount,
      },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          title={"Profile Image"}
          image={userImage}
        />
        <CardContent className={classes.content}>
          <Typography
            variant={"h5"}
            component={Link}
            to={`/users/${userHandle}`}
            color={"primary"}
          >
            {userHandle}
          </Typography>
          <Typography variant={"body2"} color={"textSecondary"}>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant={"body1"}>{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
