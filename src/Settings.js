
export default class Settings {
    static getUserToken() {
        return process.env.TOKEN
    }

    static getAPIBaseUrl() {
        return process.env.API_URL
    }
}