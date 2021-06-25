import axios from 'axios';

const TRMClient = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'local' ? 'http://localhost:4000' : process.env.TRM_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default TRMClient;
