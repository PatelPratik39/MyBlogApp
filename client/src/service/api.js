import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";

const API_URL = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    //Stop global loader here
    return processResponse(response);
  },
  function (error) {
    //Stop global loader here
    return Promise.reject(processError(error));
  }
);

//If success -> return{ isSuccess: true, data: Object}
//If faile -> return{ isFailure: true, string status, string message code: int}
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.msg,
      code: response?.code
    };
  }
};

//If success -> return{ isSuccess: true, data: Object}
//If faile -> return{ isFailure: true, string status, string message code: int}
const processError = (error) => {
  if (error.response) {
    // requwst made and server responded with a status
    // console.log("ERROR IN RESPONSE : ", error.toJSON());
    console.log("ERROR IN RESPONSE : ", error.response.data);
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status
    };
  } else if (error.request) {
    //Request has been made but no response was received
    // console.log("ERROR IN REQUEST : ", error.toJSON());
    console.log("ERROR IN REQUEST : ", error.request);
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.requestFailure,
      code: ""
    };
  } else {
    //Something happend in setting up request that triggers an error
    // console.log("ERROR IN NETWORK : ", error.toJSON());
    console.log("ERROR IN NETWORK : ", error.message);
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.networkError,
      code: ""
    };
  }
};

// API Object to call api
const API = {};

// for (const [key, value] of Object.entries(SERVICE_URLS)) {
//   API[key] = (body, showUploadProgress, showDownloadProgress) => {
//     axiosInstance({
//       method: value.method,
//       url: value.url,
//       data: body,
//       responseType: value.responseType,
//       onUploadProgress: function (progressEvent) {
//         if (showUploadProgress) {
//           let percentageeCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           showUploadProgress(percentageeCompleted);
//         }
//       },
//       showDownloadProgress: function (progressEvent) {
//         if (showDownloadProgress) {
//           let percentageeCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           showDownloadProgress(percentageeCompleted);
//         }
//       }
//     });
//   };
// }
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = async (body, showUploadProgress, showDownloadProgress) => {
    try {
      const response = await axiosInstance({
        method: value.method,
        url: value.url,
        data: body,
        responseType: value.responseType,
        onUploadProgress: showUploadProgress,
        onDownloadProgress: showDownloadProgress
      });
      return processResponse(response);
    } catch (error) {
      return processError(error);
    }
  };
}
export { API };


// import axios from "axios";

// import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
// // import {
// //   getAccessToken,
// //   getRefreshToken,
// //   setAccessToken,
// //   getType
// // } from "../utils/common-utils";

// const API_URL = "http://localhost:8000";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
//   headers: {
//     "content-type": "application/json"
//   }
// });

// axiosInstance.interceptors.request.use(
//   function (config) {
//     if (config.TYPE.params) {
//       config.params = config.TYPE.params;
//     } else if (config.TYPE.query) {
//       config.url = config.url + "/" + config.TYPE.query;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   function (response) {
//     // Stop global loader here
//     return processResponse(response);
//   },
//   function (error) {
//     // Stop global loader here
//     return Promise.reject(ProcessError(error));
//   }
// );

// ///////////////////////////////
// // If success -> returns { isSuccess: true, data: object }
// // If fail -> returns { isFailure: true, status: string, msg: string, code: int }
// //////////////////////////////
// const processResponse = (response) => {
//   if (response?.status === 200) {
//     return { isSuccess: true, data: response.data };
//   } else {
//     return {
//       isFailure: true,
//       status: response?.status,
//       msg: response?.msg,
//       code: response?.code
//     };
//   }
// };

// ///////////////////////////////
// // If success -> returns { isSuccess: true, data: object }
// // If fail -> returns { isError: true, status: string, msg: string, code: int }
// //////////////////////////////
// const ProcessError = async (error) => {
//   if (error.response) {
//     // Request made and server responded with a status code
//     // that falls out of the range of 2xx
//     if (error.response?.status === 403) {
//       // const { url, config } = error.response;
//       // console.log(error);
//       // try {
//       //     let response = await API.getRefreshToken({ token: getRefreshToken() });
//       //     if (response.isSuccess) {
//       sessionStorage.clear();
//       //         setAccessToken(response.data.accessToken);

//       //         const requestData = error.toJSON();

//       //         let response1 = await axios({
//       //             method: requestData.config.method,
//       //             url: requestData.config.baseURL + requestData.config.url,
//       //             headers: { "content-type": "application/json", "authorization": getAccessToken() },
//       //             params: requestData.config.params
//       //         });
//       //     }
//       // } catch (error) {
//       //     return Promise.reject(error)
//       // }
//     } else {
//       console.log("ERROR IN RESPONSE: ", error.toJSON());
//       return {
//         isError: true,
//         msg: API_NOTIFICATION_MESSAGES.responseFailure,
//         code: error.response.status
//       };
//     }
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.log("ERROR IN RESPONSE: ", error.toJSON());
//     return {
//       isError: true,
//       msg: API_NOTIFICATION_MESSAGES.requestFailure,
//       code: ""
//     };
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log("ERROR IN RESPONSE: ", error.toJSON());
//     return {
//       isError: true,
//       msg: API_NOTIFICATION_MESSAGES.networkError,
//       code: ""
//     };
//   }
// };

// const API = {};

// for (const [key, value] of Object.entries(SERVICE_URLS)) {
//   API[key] = (body, showUploadProgress, showDownloadProgress) => {
//     axiosInstance({
//       method: value.method,
//       url: value.url,
//       data: body,
//       responseType: value.responseType,
//       onUploadProgress: function (progressEvent) {
//         if (showUploadProgress) {
//           let percentageeCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           showUploadProgress(percentageeCompleted);
//         }
//       },
//       showDownloadProgress: function (progressEvent) {
//         if (showDownloadProgress) {
//           let percentageeCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           showDownloadProgress(percentageeCompleted);
//         }
//       }
//     });
//   };
// }
// export { API };