import axios from "axios";

export class TransactionService {
    static token = localStorage.getItem('token');
    static async getAllCategory() {
        return await axios.get(`http://localhost:4000/api/categories`,
            {
                headers: {
                    'Authorization': `Bearer ${TransactionService.token}`
                }
            }
        )
    }
    static async getAllTransactionOfWallet(walletID) {
        return await axios.get(`http://localhost:4000/api/users/wallets/${walletID}/transactions`,
            {
                headers: {
                    'Authorization': `Bearer ${TransactionService.token}`
                }
            }
        )
    }
    static async createTransaction(walletID, data) {
        return await axios.post(`http://localhost:4000/api/users/wallets/${walletID}/transactions`, data,
            {
                headers: {
                    'Authorization': `Bearer ${TransactionService.token}`
                }
            }
        )
    }
    static async getInfoTransaction(walletID, transactionID) {
        return await axios.get(`http://localhost:4000/api/users/wallets/${walletID}/transactions/${transactionID}`,
            {
                headers: {
                    'Authorization': `Bearer ${TransactionService.token}`
                }
            }
        )
    }
}