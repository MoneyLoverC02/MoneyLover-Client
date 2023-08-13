import axios from "axios";

export class UserService {
    static async getAll() {
        return await axios.get('http://localhost:4000/api/users');
    }
    static async checkUserLogin(data) {
        return await axios.post('http://localhost:4000/api/login', data);
    }
    static async createUser(data) {
        return await axios.post('http://localhost:4000/api/register', data);
    }
    static async deleteUser(accessToken) {
        let token = localStorage.getItem('token');
        return await axios.delete(`http://localhost:4000/api/users`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
    }
    static async updateUser(data) {
        let token = localStorage.getItem('token');
        return await axios.put(`http://localhost:4000/api/users`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}