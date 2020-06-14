import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from "../types";
import axios from "axios";
import { getUserData } from "./userActions";

// Get all Posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

// Like a post

export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a post

export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`, {
      headers: {
        Authorization: localStorage.getItem("FBIdToken"),
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
