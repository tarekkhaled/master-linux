import axios from "axios";
import { config, getAuthCookie } from "../utils";
import {server} from "../config";
import {
  ADD_TAG_TO_IMAGE,
  DELETE_IMAGE,
  GET_ALL_IMAGES,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  UPLOAD_IMAGE,
} from "./actionTypes";

export const AddTagToImage = async (imageId, tags) => {
  const response = await axios.post(
    `${server}/api/images/${imageId}/tags`,
    { tags },
    config(getAuthCookie())
  );
  return {
      type: ADD_TAG_TO_IMAGE,
      payload: {
          tags,
          ...response
      }
  }
};
