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

    static async deleteUser(userID, token) {
        return await axios.delete(`http://localhost:4000/api/users/${userID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    }
    static async updateUser(userID, token, data) {
        return await axios.put(`http://localhost:4000/api/users/${userID}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}