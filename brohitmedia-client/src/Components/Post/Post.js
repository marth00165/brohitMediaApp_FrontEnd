import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import DeletePost from "./DeletePost";

const styles = {
  card: {
    position: "relative",
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
  likedPost = () => {
    return !!(
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.post.postId
      )
    );
  };

  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        postId,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;
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
          {deleteButton}
          <Typography variant={"body2"} color={"textSecondary"}>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant={"body1"}>{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton tip={"comments"}>
            <ChatIcon color={"primary"} />
          </MyButton>
          <span>{commentCount} comments</span>
          <PostDialog postId={postId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));