import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"

import ScrollToTop from "./utility/ScrollTop"
import { persistor, store } from "./redux/store.js"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <ScrollToTop />
                <App />
            </Router>
        </PersistGate>
    </Provider>
)
