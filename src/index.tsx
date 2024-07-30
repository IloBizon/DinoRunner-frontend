import {AuthManager} from "./game/classes/authManager";
import ReactDOM from "react-dom/client";
import React from "react";
import App from './react/App';
import './css/index.css'
import {BrowserRouter} from "react-router-dom";


const WebApp = Telegram.WebApp;
WebApp.expand()
WebApp.enableClosingConfirmation();
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
)
AuthManager.getInstance().authorizeUser().then((t) =>
{

    if (t)
    {
        //if (window.navigator.userAgent.indexOf("Win") != -1 || window.navigator.userAgent.indexOf("Mac") != -1 || window.navigator.userAgent.indexOf("Linux") != -1) return;


    } else
    {
    }
})







