// API notification messages

export const API_NOTIFICATION_MESSAGE = {
  loading: {
    title: "Loading.....",
    message: "Data is being loaded, Please Wait"
  },
  success: {
    title: "Success",
    message: "Data Successfully Loaded!!"
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occured while fetching response from the server. Please try agian!!"
  },
  requestFailure: {
    title: "Error",
    message: "An error occured while  Parsing request data."
  },
  networkError: {
    title: "Network Error",
    message: "Unable to connect with the server. Please check Internet connectivity and try again!!"
  }
};


// API SERVICE CALL

export const SERVICE_URLS = {
    userSignuo: {url:'/signup', method: 'POST'}
}