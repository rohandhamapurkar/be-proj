import axios from 'axios';
import store from '@/vuex';

//const baseUri = window.location.protocol+"//"+window.location.host; //production url
const baseUri = 'http://localhost:3000';

export default {
    login: (userdata) => {
        // NOTE => userdata :{id:<user_id>,password:<user_password>}
        return axios.post(baseUri + '/auth/v0.1/user/login', { user: userdata })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    getEmbededImage: () => {
        return axios.get(baseUri + '/embeddedImage/v0.1/generatedImage', {
            headers: {
                auth: store.getters.auth
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    signupUser: (userdata) => {
        return axios.post(baseUri + '/auth/v0.1/createUser',{ user: userdata }, {
            headers: {
                auth: store.getters.auth
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    apiKeyVerification: (key) => {
        return axios.post(baseUri + '/auth/v0.1/verifyApiKey',{ key: key }, {
            headers: {
                auth: store.getters.auth.auth
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    verifyEmbededImage: (embededImage) => {
        return axios.post(baseUri + '/embeddedImageAuth/v0.1/authenticateEmbeddedImage',{ image: embededImage, userId: store.getters.sessionEmail }, {
            headers: {
                sessionId: store.getters.sessionId
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    verifyEmbededImage: (otp) => {
        return axios.post(baseUri + '/authenticateTotp/v0.1/verifyOtp',{ token: otp, userId: store.getters.sessionEmail }, {
            headers: {
                sessionId: store.getters.sessionId
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}