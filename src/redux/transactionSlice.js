import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategory: [],
    allTransaction: []
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
    }
})

export const { getAllCategory, getAllTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;

