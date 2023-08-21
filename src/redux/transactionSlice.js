import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategory: [],
    allTransaction: [],
    allIncome: [],
    allExpense: [],
    transactionSelect: null,
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        getAllCategory: (state, action) => {
            state.allCategory = action.payload
        },
        getAllTransaction: (state, action) => {
            state.allTransaction = action.payload
        },
        setTransactionSelect: (state, action) => {
            state.transactionSelect = action.payload
        },
        getAllIncome: (state, action) => {
            state.allIncome = action.payload
        },
        getAllExpense: (state, action) => {
            state.allExpense = action.payload
        },
        transactionLogout: (state) => {
            state.allTransaction = [];
            state.allIncome = [];
            state.allExpense = [];
            state.transactionSelect = null;
        }
    }
})

export const { getAllCategory, getAllTransaction, setTransactionSelect, getAllIncome, getAllExpense, transactionLogout } = transactionSlice.actions;
export default transactionSlice.reducer;

