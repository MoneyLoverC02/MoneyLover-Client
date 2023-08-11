import axios from "axios";

export class TransactionService {
    static async getAllCategory() {
        return await axios.get(`http://localhost:4000/api/categories`,
        )
    }
    static async getAllTransactionOfWallet(walletID) {
        let token = localStorage.getItem('token');
        return await axios.get(`http://localhost:4000/api/users/wallets/${walletID}/transactions`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async createTransaction(walletID, data) {
        let token = localStorage.getItem('token');
        return await axios.post(`http://localhost:4000/api/users/wallets/${walletID}/transactions`, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async getInfoTransaction(walletID, transactionID) {
        let token = localStorage.getItem('token');
        return await axios.get(`http://localhost:4000/api/users/wallets/${walletID}/transactions/${transactionID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
    static async deleteTransaction(walletID, transactionID) {
        let token = localStorage.getItem('token');
        return await axios.delete(`http://localhost:4000/api/users/wallets/${walletID}/transactions/${transactionID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
}