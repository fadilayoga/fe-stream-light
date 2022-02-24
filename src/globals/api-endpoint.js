import CONFIG from './config';

const API_ENDPOINT = {
  REGISTRATION_TOKEN: `${CONFIG.BASE_URL}registration-token`,
  LIGHTING_ALL: `${CONFIG.BASE_URL}lighting-all`,
  PROBLEM_LOGS: `${CONFIG.BASE_URL}problem-logs`
};

export default API_ENDPOINT;
