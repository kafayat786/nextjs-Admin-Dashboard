// axiosUtils.js
import axios from "axios";

// const API_BASE_URL = process.env.NEXT_APP_API_BASE_URL; // Adjust the base URL if necessary
const API_BASE_URL = "https://dummyjson.com";

const sendRequest = async (method, endpoint, data = null) => {
  try {
    const url = `${API_BASE_URL}/${endpoint}`;
    let response;

    switch (method) {
      case "GET":
        response = await axios.get(url);
        break;
      case "POST":
        response = await axios.post(url, data);
        break;
      case "PUT":
        response = await axios.put(url, data);
        break;
      case "DELETE":
        response = await axios.delete(url);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Error ${method} ${endpoint}:`, error);
    throw error;
  }
};

export default sendRequest;
