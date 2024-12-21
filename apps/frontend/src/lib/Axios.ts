
import axios from 'axios';
import Cookie from "js-cookie"
const token =Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)
export const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URI, 
    headers: {
      'Content-Type': 'application/json',
      ...(token&&{"Authorization":`Bearer ${token}`})
    },
    withCredentials: true, 
  });