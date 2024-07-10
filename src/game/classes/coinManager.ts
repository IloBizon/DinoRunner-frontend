import {AuthManager} from "./authManager";
import {UserManager} from "./userManager";
import MainScene from "../scenes/mainScene";


export class CoinManager
{
    private static instance: CoinManager = new CoinManager();
    private coins: number = null;
    private authManager: AuthManager;
    private userManager: UserManager

    constructor()
    {
        if (CoinManager.instance)
        {
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        CoinManager.instance = this;
        this.authManager = AuthManager.getInstance();
        this.userManager = UserManager.getInstance();

    }

    public static getInstance(): CoinManager
    {
        CoinManager.instance = CoinManager.instance || new CoinManager();
        return CoinManager.instance;
    }

    async getCoins()
    {
        if (this.coins == null)
        {
            const user = await this.userManager.getUser();
            this.coins = user.coins;
            return this.coins
        }

        return this.coins
    }

    addCoin(scene: MainScene, coinMultiplier: number)
    {
        this.coins += coinMultiplier;
        scene.game.events.emit('COINS_CHANGED', this.coins);
    }
}