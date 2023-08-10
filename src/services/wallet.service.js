import axios from "axios";

export class WalletService {
    static token = localStorage.getItem('token');
    static async getIcon() {
        return await axios.get('http://localhost:4000/api/iconWallets',
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }
    static async getCurrency() {
        return await axios.get('http://localhost:4000/api/currencies',
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }
    static async createWallet(data) {
        return await axios.post(`http://localhost:4000/api/users/wallets`, data,
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }
    static async createDetailWallet(data) {
        return await axios.post('http://localhost:4000/api/users/walletRoles', data,
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }
    static async getAllWallet() {
        return await axios.get(`http://localhost:4000/api/users/wallets`,
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }
    static async getInfoWallet(walletID) {
        return await axios.get(`http://localhost:4000/api/users/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }

    static async updateWallet(walletID, data) {
        return await axios.put(`http://localhost:4000/api/users/wallets/${walletID}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }
    static async deleteWallet(walletID) {
        return await axios.delete(`http://localhost:4000/api/users/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }
    static async tranferMoney(walletSelectID, data) {
        return await axios.post(`http://localhost:4000/api/users/wallets/${walletSelectID}/transfer`, data,
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }
    static async archivedWallet(walletID) {
        return await axios.post(`http://localhost:4000/api/users/wallets/${walletID}/archived`,
            {
                headers: {
                    'Authorization': `Bearer ${WalletService.token}`
                }
            }
        )
    }
}