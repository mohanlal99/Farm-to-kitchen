import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "./components/layout/MainLayout";
import AuthProvider from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./app/store";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <MainLayout>
          <App />
        </MainLayout>
      </Provider>
    </AuthProvider>
  </BrowserRouter>
);
