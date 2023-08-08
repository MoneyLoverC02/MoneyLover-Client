import axios from "axios";
let token = localStorage.getItem('token');
export class WalletService {
    static async getIcon(accessToken) {
        return await axios.get('http://localhost:4000/api/iconWallets',
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )}
    static async getCurrency(accessToken) {
        return await axios.get('http://localhost:4000/api/currencies',
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )}
    static async createWallet(data, userID) {
        return await axios.post(`http://localhost:4000/api/users/${userID}/wallets`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async createDetailWallet(data) {
        return await axios.post('http://localhost:4000/api/users/walletRoles', data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async getAllWallet(userID, accessToken) {
        return await axios.get(`http://localhost:4000/api/users/${userID}/wallets`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
    }
    static async getInfoWallet(userID, walletID) {
        return await axios.get(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async updateWallet(userID, walletID, data) {
        return await axios.put(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async deleteWallet(userID, walletID) {
        return await axios.delete(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
}