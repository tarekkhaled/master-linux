import { createStore, compose, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducers from "./reducers";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

let composeEnhancers = compose;
if (process.env.NODE_ENV !== "production") {
  composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
}

const enhancers = composeEnhancers(applyMiddleware(reduxPromise));

const pReducer = persistReducer(persistConfig, reducers);
export const store = createStore(pReducer, enhancers);
export const persistor = persistStore(store);

export default store;
