// _app.js
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* Delay rendering until state is rehydrated */}
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
