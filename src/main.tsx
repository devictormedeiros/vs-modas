import ReactDOM from "react-dom/client";
import "./index.scss";
import Routers from "./routers/index.tsx";
import { CartProvider } from "./context/cartContext.tsx";
import { LoadingProvider } from "./context/loadingContext.tsx";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAVfwoIvC4Dpq3UMBx3tAuuEN2U2FKGjnc",
  authDomain: "vsmodas-551c5.firebaseapp.com",
  projectId: "vsmodas-551c5",
  storageBucket: "vsmodas-551c5.appspot.com",
  messagingSenderId: "380283986622",
  appId: "1:380283986622:web:e5a99e8fadb1b1efc3f4ef"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(


  <LoadingProvider>
    <CartProvider>
      <Routers />
    </CartProvider>
  </LoadingProvider>
);
