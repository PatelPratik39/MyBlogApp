import axios from "axios";
import { API_NOTIFICATION_MESSAGE } from "../constants/config";

const API_URL = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});
axiosInstance.interceptors.req.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.res.use(
  function (res) {
    //Stop global loader here
    return proccessResponse(res);
  },
  function (error) {
    //Stop global loader here
    return Promise.reject(processError(error));
  }
);

//If success -> return{ isSuccess: true, data: Object}
//If faile -> return{ isFailure: true, string status, string message code: int}
const proccessResponse = (res) => {
  if (res?.status === 200) {
    return { isSuccess: true, data: res.data };
  } else {
    return {
      isFailure: true,
      status: res?.msg,
      code: res?.code
    };
  }
};

//If success -> return{ isSuccess: true, data: Object}
//If faile -> return{ isFailure: true, string status, string message code: int}
const processError = (error) => {
  if (error.res) {
    // requwst made and server responded with a status
    console.log("ERROR IN RESPONSE : ", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGE.responseFailure,
      code: error.res.status
    };
  } else if (error.request) {
    //Request has been made but no response was received
    console.log("ERROR IN REQUEST : ", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGE.requestFailure,
      code: error.res.status
    };
  } else {
    //Something happend in setting up request that triggers an error
    console.log("ERROR IN NETWORK : ", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGE.networkError,
      code: ""
    };
  }
};
 const API = {};