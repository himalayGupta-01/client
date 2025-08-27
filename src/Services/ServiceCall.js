import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_URL;

export const getStudent = async () => {
  return await axios.get(BACKEND_URL + "/getStudent");
};

export const getProgress = async () => {
  return await axios.get(BACKEND_URL + "/getProgress");
};

export const getProgressStats = async () => {
  return await axios.get(BACKEND_URL + "/getProgressStats", {});
};

export const updateProgress = async(problem, completed)=>{
    return await axios.post(BACKEND_URL + `/updateProgress?problemId=${problem}&completed=${completed}`);
}
