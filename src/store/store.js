import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import dataSlice from './dataSlice';
import selectDataSlice from './selectDataSlice';

// Persist Configurations for Reducers
const dataPersistConfig = {
    key: 'data',
    storage,
    whitelist: ['allTickets', 'allUser', 'group', 'order'], // Specify keys to persist
};

const selectDataPersistConfig = {
    key: 'selectData',
    storage,
    whitelist: ['selectedData', 'user'], // Specify keys to persist
};

// Persist Reducers
const persistedDataReducer = persistReducer(dataPersistConfig, dataSlice);
const persistedSelectDataReducer = persistReducer(selectDataPersistConfig, selectDataSlice);

// Configure Store
const store = configureStore({
    reducer: {
        data: persistedDataReducer,
        selectData: persistedSelectDataReducer,
    },
});

export const persistor = persistStore(store);

export default store;
