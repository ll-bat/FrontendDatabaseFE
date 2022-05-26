
export default class Settings {
    static getUserToken() {
        return process.env.token
    }

    static getAPIBaseUrl() {
        return process.env.api_url
    }
}