import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    lang: {language:"vi"},
}

export const i18nSlice = createSlice({
    name: 'i18n',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload
        },

    }
})

export const {setLang} = i18nSlice.actions;
export default i18nSlice.reducer;

