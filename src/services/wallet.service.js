import axios from "axios";

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
    static async createWallet(data, userID, accessToken) {
        return await axios.post(`http://localhost:4000/api/users/${userID}/wallets`, data,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
    }
    static async createDetailWallet(data, accessToken) {
        return await axios.post('http://localhost:4000/api/users/walletRoles', data,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
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
    static async getInfoWallet(userID, walletID, accessToken) {
        return await axios.get(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
    }

    static async updateWallet(userID, walletID, data, accessToken) {
        return await axios.put(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
    }
    static async deleteWallet(userID, walletID, accessToken) {
        return await axios.delete(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
    }
    static tranferMoney(userID, walletSelectID, data, accessToken) {
        return axios.post(`http://localhost:4000/api/users/${userID}/wallets/${walletSelectID}/transfer`, data,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
        )
    }
    static async archivedWallet(userID,walletID,accessToken){
        return await axios.get(`http://localhost:4000/api/users/${userID}/wallets/${walletID}/archived`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
    }
}