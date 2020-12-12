import {
  ADD_TAG_TO_IMAGE,
  DELETE_IMAGE,
  GET_ALL_IMAGES,
  SEARCH_IMAGE,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  UPLOAD_IMAGE,
} from "./actionTypes";

const initialState = {
  user: {
    loggedIn: false,
    data: null,
  },
  images: {},
};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      {
        const { user, data } = payload;
        if (user && data.success)
          return {
            ...state,
            user: {
              loggedIn: true,
              data: user,
            },
          };
      }
      break;
    case SIGN_OUT: {
      return {
        ...state,
        user: {
          loggedIn: false,
          data: null,
        },
      };
    }
    case SIGN_UP:
      {
        const { user, data } = payload;
        if (user && data.success)
          return {
            ...state,
            user: {
              loggedIn: true,
              data: user,
            },
          };
      }
      break;
    case GET_ALL_IMAGES: {
      const { images } = payload;
      return {
        ...state,
        images: {
          ...images,
        },
      };
    }
    case SEARCH_IMAGE: {
      const { images } = payload;
      return {
        ...state,
        images: {
          ...images,
        },
      };
    }
    case ADD_TAG_TO_IMAGE: {
      const { tags, imageId } = payload;
      const newImages = { ...state.images };
      const newImage = newImages[imageId];
      newImage.tags = [...newImages[imageId].tags, ...tags];
      newImages[imageId] = newImage;
      return {
        ...state,
        newImages,
      };
    }
    case DELETE_IMAGE: {
      const { imageId } = payload;
      const newImages = { ...state.images };
      delete newImages[imageId];
      return {
        ...state,
        newImages,
      };
    }
    case UPLOAD_IMAGE: {
      window.location.reload();
      break;
    }
    default:
      return state;
  }
};

export default reducers;
