import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import userSlice from '../features/user/userSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
    
})

export default store;