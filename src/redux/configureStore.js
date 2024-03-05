import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./user/userSlice";
import multiPickSlice from "./user/multiPickSlice";

const persistConfig = {
    key: "gtech",
    version: 1,
    storage,
};

const reducer = combineReducers({
    user: userSlice,
    multipick: multiPickSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

// const store = configureStore({
//     reducer: reducer,
//     middleware: getDefaultMiddleware().concat(logger),
// });

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    devTools: true,
});

export default store;
