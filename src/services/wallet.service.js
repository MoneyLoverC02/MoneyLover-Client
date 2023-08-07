import axios from "axios";

export class WalletService {
    static getIcon() {
        return axios.get('http://localhost:4000/api/iconWallets');
    }
    static getCurrency() {
        return axios.get('http://localhost:4000/api/currencies');
    }
    static createWallet(data) {
        return axios.post('http://localhost:4000/api/users/wallets', data);
    }
    static createDetailWallet(data) {
        return axios.post('http://localhost:4000/api/users/walletRoles', data);
    }
    static getAllWallet(userID) {
        return axios.get(`http://localhost:4000/api/users/${userID}/wallets`);
    }
    static getInfoWallet(userID, walletID) {
        return axios.get(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`)
    }
    static updateWallet(userID, walletID, data) {
        return axios.put(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`, data)
    }
    static deleteWallet(userID,walletID) {
        return axios.delete(`http://localhost:4000/api/users/${userID}/wallets/${walletID}`);
    }
}