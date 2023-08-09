import axios from "axios";

export class UserService {
    static async getAll() {
        return await axios.get('http://localhost:4000/api/users');
    }
    static async checkUserLogin(data) {
        return await axios.post('http://localhost:4000/api/login', data);
    }
    static async createUser(data) {
        return await axios.post('http://localhost:4000/api/users', data);
    }
}