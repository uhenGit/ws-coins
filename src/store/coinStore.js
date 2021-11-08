import { runInAction, observable, toJS } from 'mobx';

class Coins {
    constructor() {
        this.coinsData = observable.box({});
        this.coins = observable.array([]);
    }
    ws = null;
    currencies = 'bitcoin,ethereum,binance-coin,cardano,tether,solana';
    getCoinsData() {
        return toJS(this.coins);
    }
    setCurrentCoins(items) {
        const curArr = this.currencies.split(',');    
        curArr.forEach(item => {
            for (let el of items) {
                if (item === el.id) {
                    runInAction(() => {
                        this.coins.push(el)
                    })
                }
            }    
        })
        this.startSocket();
        this.readSocket();
    }
    priceChange(newPrice) {
        const data = JSON.parse(newPrice);
        for (let coinId in data) {
            for (let i = 0; i < this.coins.length; i++) {
                if (this.coins[i].id === coinId) {
                    runInAction(() => {    
                        this.coins[i].priceUsd = data[coinId];
                    })
                }
            }
        }
    }
    async fetchAllCoins() {
        const res = await fetch('https://api.coincap.io/v2/assets');
        const result = await res.json();
        this.setCurrentCoins(result.data)
    }
    startSocket() {
        this.ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${this.currencies}`);
    }
    readSocket() {        
        this.ws.onmessage = (e) => {   
            runInAction(() => {
                this.coinsData.set(e.data)
            })
            this.priceChange(e.data);
        }
    }
    stopSocket() {
        this.ws.close();
        this.ws.onclose = (e) => {
            if (e.wasClean) {
                console.log('close event code: ', e.code);
            } else {
                console.log(('connection crashed'));
            }
        }
    }
}
export default new Coins()