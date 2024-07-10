import {TelegramWebApps} from "telegram-webapps";

export class WebApps
{
    tg: TelegramWebApps.WebApp;

    constructor()
    {
        this.tg = Telegram.WebApp;
    }
}