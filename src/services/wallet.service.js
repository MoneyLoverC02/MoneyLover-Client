import axios from "axios";

export class WalletService {

    static async getIcon() {
        return await axios.get('http://localhost:4000/api/iconWallets');
    }
    static async getCurrency() {
        return await axios.get('http://localhost:4000/api/currencies');
    }
    static async createWallet(data) {
        let token = localStorage.getItem('token');
        return await axios.post(`http://localhost:4000/api/users/wallets`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async createDetailWallet(data) {
        let token = localStorage.getItem('token');
        return await axios.post('http://localhost:4000/api/users/walletRoles', data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async getAllWallet() {
        let token = localStorage.getItem('token');
        return await axios.get(`http://localhost:4000/api/users/wallets`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async getInfoWallet(walletID) {
        let token = localStorage.getItem('token');
        return await axios.get(`http://localhost:4000/api/users/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }

    static async updateWallet(walletID, data) {
        let token = localStorage.getItem('token');
        return await axios.put(`http://localhost:4000/api/users/wallets/${walletID}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async deleteWallet(walletID) {
        let token = localStorage.getItem('token');
        return await axios.delete(`http://localhost:4000/api/users/wallets/${walletID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async tranferMoney(walletSelectID, data) {
        let token = localStorage.getItem('token');
        return await axios.post(`http://localhost:4000/api/users/wallets/${walletSelectID}/transfer`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    // static async archivedWallet1(walletID) {
    //     return await axios.post(`http://localhost:4000/api/users/wallets/4/archived`,
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         }
    //     )
    // }
    static async archivedWallet(walletID) {
        let token = localStorage.getItem('token');
        return await axios.get(`http://localhost:4000/api/users/wallets/${walletID}/archived`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async leaveWallet(walletRoleID, data) {
        let token = localStorage.getItem('token');
        return await axios.put(`http://localhost:4000/api/users/walletRoles/${walletRoleID}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
}