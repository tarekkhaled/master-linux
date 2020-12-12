import axios from "axios";
import { config, getAuthCookie } from "../utils";
import Config from "../config";
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

// Actions related to auth

export const signUserIn = async (user) => {
  const response = await axios.post(
    `${Config.server}/auth/login`,
    user,
    config(getAuthCookie())
  );
  return {
    type: SIGN_IN,
    payload: {
      user: response.data.user,
      ...response,
    },
  };
};

export const signUserOut = async (user) => {
  const response = await axios.post(
    `${Config.server}/auth/logout`,
    user,
    config(getAuthCookie())
  );
  return {
    type: SIGN_OUT,
    payload: {
      ...response,
    },
  };
};

export const signUserUp = async (user) => {
  const response = await axios.post(
    `${Config.server}/auth/signup`,
    user,
    config(getAuthCookie())
  );
  return {
    type: SIGN_UP,
    payload: {
      user: response.data.data,
      ...response,
    },
  };
};

// Actions related to Image
export const AddTagToImage = async (imageId, tags) => {
  const response = await axios.post(
    `${Config.server}/api/images/${imageId}/tags`,
    { tags },
    config(getAuthCookie())
  );
  return {
    type: ADD_TAG_TO_IMAGE,
    payload: {
      tags,
      imageId,
      ...response,
    },
  };
};

export const getAllImages = async () => {
  const response = await axios.get(
    `${Config.server}/api/images`,
    config(getAuthCookie())
  );
  return {
    type: GET_ALL_IMAGES,
    payload: {
      images: response.data.images,
      ...response,
    },
  };
};

export const searchImage = async (searchQuery) => {
  const response = await axios.get(
    `${Config.server}/search?q=${searchQuery}`,
    config(getAuthCookie())
  );
  return {
    type: SEARCH_IMAGE,
    payload: {
      images: response.data.images,
      ...response,
    },
  };
};

export const deleteImage = async (imageId) => {
  const response = await axios.delete(
    `${Config.server}/api/images/${imageId}`,
    config(getAuthCookie())
  );
  return {
    type: DELETE_IMAGE,
    payload: {
      ...response,
    },
  };
};

export const uploadImage = async (image) => {
  const response = await axios.post(
    `${Config.server}/api/images/`,
    image,
    config(getAuthCookie())
  );
  return {
    type: UPLOAD_IMAGE,
    payload: {
      image: response.data.data,
      ...response,
    },
  };
};
