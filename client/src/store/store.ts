import { configureStore } from '@reduxjs/toolkit';
import { SecurityReducer } from './features/securityReducer/secure_action';

export const store = configureStore({
    reducer: {
        // allows the automatic call of combine reducers
        SecurityReducer: SecurityReducer,
    },
    middleware: (getDefaultMiddleware) => {
        // adds special capabilities that will be able to check things like cached lifetime
        return getDefaultMiddleware().concat();
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;