import axios from "axios";

const baseUrl = "http://localhost:8080/auth";

export const Signup = (formData: any) =>
  axios.post(`${baseUrl}/signup`, formData);
export const Login = (formData: any) =>
  axios.post(`${baseUrl}/login`, formData);

export const Verified = (token: any, id: any) =>
  axios.get(`http://localhost:8080/auth/${id}/verify/${token}`);
