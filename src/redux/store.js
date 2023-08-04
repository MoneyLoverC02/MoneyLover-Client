import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./authSlice";
import walletReducer from "./walletSlice";

export default configureStore({
    reducer:{
    auth: authReducer,
    wallet: walletReducer,
    }
})