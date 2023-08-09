import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    icons: [],
    currencies: [],
    walletSelect: null,
    allWallet: [],
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        getIcon: (state, action) => {
            state.icons = action.payload
        },
        getCurrencies: (state, action) => {
            state.currencies = action.payload
        },
        setWalletSelect: (state, action) => {
            state.walletSelect = action.payload
        },
        getAllWallet: (state, action) => {
            state.allWallet = action.payload
        },
        walletLogut: (state) => {
            state.icons = [];
            state.currencies = [];
            state.walletSelect = null;
            state.allWallet = [];
        }
    }
})

export const { getIcon, getCurrencies, setWalletSelect, getAllWallet, walletLogut } = walletSlice.actions;
export default walletSlice.reducer;

