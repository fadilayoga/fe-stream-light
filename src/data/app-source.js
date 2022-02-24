import API_ENDPOINT from '../globals/api-endpoint';
import axios from 'axios';

class AppSource {
  static async storeRegistrationTokens({ currentToken }) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_ENDPOINT.REGISTRATION_TOKEN}`, {
        registration_ids: currentToken
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });  
    })
  }
}

export default AppSource;
