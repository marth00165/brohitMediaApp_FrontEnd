import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Post } from "../Components/Post";
import { Profile } from "../Components/Profile";
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";
import PostSkeleton from "../util/PostSkeleton";
import PropTypes from "prop-types";

class Home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>{" "}
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(Home);
