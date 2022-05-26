import Settings from "../Settings";
import axios from "axios";

let config = {
    baseURL: Settings.getAPIBaseUrl()
};

const axiosClient = axios.create(config);

axiosClient.interceptors.request.use(config => {
    config.headers.USER_DATABASE_TOKEN = Settings.getUserToken()
    return config;
});

export default axiosClient
