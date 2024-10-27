<template>
  <div class="form-section">
    <h4>Add a New Coin</h4>
    <form @submit.prevent="saveCoin">
      <label for="coin-name">Coin Name</label>
      <input type="text" id="coin-name" v-model="coinName" placeholder="e.g. Bitcoin" />

      <label for="ticker">Ticker</label>
      <input type="text" id="ticker" v-model="ticker" placeholder="e.g. BTC/USDT" />

      <label for="buy-price">Buy Price</label>
      <input type="number" id="buy-price" v-model="buyPrice" placeholder="Enter the buy price" />

      <label for="quantity">Quantity</label>
      <input type="number" id="quantity" v-model="quantity" placeholder="Enter quantity" />

      <button type="submit" class="styled-button">Save Coin</button>
    </form>
  </div>
</template>

<script>
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);

export default {
  name: "AddCoin",
  data() {
    return {
      coinName: "",
      ticker: "",
      buyPrice: "",
      quantity: ""
    };
  },
  methods: {
    async saveCoin() {
      if (this.coinName && this.ticker && this.buyPrice && this.quantity) {
        try {
          const validatedTicker = this.validateTicker(this.coinName, this.ticker);
          await setDoc(doc(db, "Portfolio", this.coinName), {
            Coin: this.coinName,
            Ticker: validatedTicker,
            Buy_Price: parseFloat(this.buyPrice),
            Buy_Quantity: parseFloat(this.quantity)
          });
          alert("Coin saved!");
          this.resetForm();
        } catch (error) {
          console.error("Error saving coin:", error);
        }
      } else {
        alert("Please fill in all fields.");
      }
    },
    validateTicker(coinName, ticker) {
      const cryptoList = [
        { name: "Bitcoin", symbol: "BTC/USDT" },
        { name: "Ethereum", symbol: "ETH/USDT" },
        { name: "Ripple", symbol: "XRP/USDT" },
        { name: "Dogecoin", symbol: "DOGE/USDT" },
        { name: "Litecoin", symbol: "LTC/USDT" }
      ];
      const coin = cryptoList.find(c => c.name.toLowerCase() === coinName.toLowerCase());
      return coin ? coin.symbol : ticker;
    },
    resetForm() {
      this.coinName = "";
      this.ticker = "";
      this.buyPrice = "";
      this.quantity = "";
    }
  }
};
</script>

<style scoped>
.form-section {
  margin-bottom: 2em;
  padding: 1.5em;
  background-color: #fce4ec;
  border-radius: 0.5em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
}

.form-section h4 {
  font-size: 1.5em;
  color: #d81b60;
  border-bottom: 0.2em solid #e91e63;
  padding-bottom: 0.5em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  color: #e91e63;
  font-weight: bold;
}

input[type="text"], input[type="number"] {
  width: calc(100% - 2em);
  padding: 1em;
  margin-bottom: 1em;
  border: 0.1em solid #ccc;
  border-radius: 0.4em;
}

.styled-button {
  width: 100%;
  padding: 1em;
  background-color: #e91e63;
  color: #fff;
  border: none;
  border-radius: 0.4em;
  cursor: pointer;
}

.styled-button:hover {
  background-color: #d81b60;
}
</style>
