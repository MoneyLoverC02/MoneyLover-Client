import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    icons: [],
    currencies: [],
    iconSelect: {id: 1, icon: 'https://static.moneylover.me/img/icon/icon.png'},
    currencySelect: null,
}

export const walletSlice = createSlice ({
    name:'wallet',
    initialState,
    reducers: {
        getAllIcon: (state, action) => {
            state.icons = action.payload;
        },
        getAllCurrency: (state, action) => {
            state.currencies = action.payload
        },
        selectIcon: (state, action) => {
            state.iconSelect = action.payload
        },
        selectCurrency: (state, action) => {
            state.currencySelect = action.payload
        },
    }
})

export const { getAllIcon, getAllCurrency, selectIcon, selectCurrency, getAllWalletOfUser    } = walletSlice.actions;
export default walletSlice.reducer;

