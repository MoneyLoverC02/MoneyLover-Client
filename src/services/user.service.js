import axios from "axios";

export class UserService {
    static getAll() {
        return axios.get('http://localhost:4000/api/users');
    }
    static checkUserLogin(data) {
        return axios.post('http://localhost:4000/api/login', data);
    }
    static createUser(data) {
        return axios.post('http://localhost:4000/api/users', data);
    }
}