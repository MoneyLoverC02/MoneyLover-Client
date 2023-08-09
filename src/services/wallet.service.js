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
    static getCurrency(accessToken) {
        return axios.get('http://localhost:4000/api/currencies',
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )}
    static createWallet(data, userID) {
        return axios.post(`http://localhost:4000/api/users/${userID}/wallets`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static createDetailWallet(data) {
        return axios.post('http://localhost:4000/api/users/walletRoles', data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static getAllWallet(userID, accessToken) {
        return axios.get(`http://localhost:4000/api/users/${userID}/wallets`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
    }
    static getInfoWallet(userID, walletID) {
        return axios.get(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static updateWallet(userID, walletID, data) {
        return axios.put(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static deleteWallet(userID, walletID) {
        return axios.delete(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static archivedWallet(userID,walletID){
        return axios.get(`http://localhost:4000/api/users/${userID}/wallets/${walletID}/archived`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}