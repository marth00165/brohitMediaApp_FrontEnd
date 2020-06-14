import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
} from "../types";

const initialState = {
  loading: false,
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
      };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_POST:
      console.log(state.likes);
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId,
          },
        ],
      };
    case UNLIKE_POST:
      console.log(state.likes);
      const likes = state.likes.filter(
        (like) => like.postId !== action.payload.postId
      );
      return {
        ...state,
        likes: likes,
      };
    default:
      return state;
  }
}
