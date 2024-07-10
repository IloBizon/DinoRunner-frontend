import {AuthManager} from "./authManager";

interface User
{
    telegramId: number,
    coins: number
}

export class UserManager
{
    private user: User = null;
    private authManager: AuthManager;
    private static instance: UserManager = new UserManager();

    constructor()
    {
        if (UserManager.instance)
        {
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        UserManager.instance = this;
        this.authManager = AuthManager.getInstance();

    }

    public static getInstance(): UserManager
    {
        UserManager.instance = UserManager.instance || new UserManager();
        return UserManager.instance;
    }

    async getUser()
    {
        if (!this.user)
        {
            const response = await fetch('https://89.248.207.120:5000/users/get-user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.authManager.getAuthToken()}`
                },
            })
            const user: User = await response.json();
            return user;
        } else
        {
            return this.user
        }

    }

}