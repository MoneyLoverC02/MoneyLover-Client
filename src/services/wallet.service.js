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
    static getAllWallet(idUser) {
        return axios.get(`http://localhost:4000/api/users/${idUser}/wallets`);
    }
}