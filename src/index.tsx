import {AuthManager} from "./game/classes/authManager";
import ReactDOM from "react-dom/client";
import React from "react";
import App from './react/App';
import './index.css'


const WebApp = Telegram.WebApp;
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
AuthManager.getInstance().authorizeUser().then((t) =>
{
    root.render(
        <App/>
    )
    if (t)
    {
        //if (window.navigator.userAgent.indexOf("Win") != -1 || window.navigator.userAgent.indexOf("Mac") != -1 || window.navigator.userAgent.indexOf("Linux") != -1) return;


    } else
    {
    }
})







