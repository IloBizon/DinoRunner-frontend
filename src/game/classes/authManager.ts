
export class AuthManager
{

    private static instance: AuthManager = new AuthManager();
    private authToken: string;

    constructor()
    {
        if (AuthManager.instance)
        {
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        AuthManager.instance = this;
    }

    public static getInstance(): AuthManager
    {
        AuthManager.instance = AuthManager.instance || new AuthManager();
        return AuthManager.instance;
    }

    async authorizeUser(): Promise<string>
    {
        const WebApp = Telegram.WebApp;

        const backendIP = process.env.BACKEND_IP;
        const url: string = `https://${backendIP}/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({initData: WebApp.initData})
        })

        if (response.status == 401)
        {
            this.authToken = null;
            return null;
        } else
        {
            let token = await response.text();
            this.authToken = token;
            return token;
        }
    }

    getAuthToken()
    {
        return this.authToken;
    }

}