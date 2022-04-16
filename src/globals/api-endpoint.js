import CONFIG from './config';

const API_ENDPOINT = {
  REGISTRATION_TOKEN: `${CONFIG.BASE_URL}registration-token`,
  LIGHTING_ALL: `${CONFIG.BASE_URL}lighting-all`,
  PROBLEM_LOGS: `${CONFIG.BASE_URL}problem-logs`,
  LOGIN: `${CONFIG.BASE_URL}auth/login`,
  AUTH: `${CONFIG.BASE_URL}auth/authenticate`,
  LOGOUT: `${CONFIG.BASE_URL}auth/logout`,
  LOCATION: `${CONFIG.BASE_URL}location`,
  UPLOAD: `${CONFIG.BASE_URL}upload`,
};

export default API_ENDPOINT;