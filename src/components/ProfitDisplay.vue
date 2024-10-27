<template>
  <div class="profit-section">
    <h2>Total Portfolio</h2>

    <!-- Containing Size of Table -->
    <div class="table-container">
      <table class="styled-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Coin</th>
          <th>Ticker</th>
          <th>Buy Price</th>
          <th>Buy Quantity</th>
          <th>Current Price</th>
          <th>Profit</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, index) in portfolio" :key="coin.id">
          <td>{{ index + 1 }}</td>
          <td>{{ coin.Coin }}</td>
          <td>{{ coin.Ticker }}</td>
          <td>{{ coin.Buy_Price }}</td>
          <td>{{ coin.Buy_Quantity }}</td>
          <td>{{ coin.Current_Price }}</td>
          <td :class="{ profit: coin.Profit > 0, loss: coin.Profit < 0 }">
            {{ coin.Profit.toFixed(2) }}
          </td>
          <td>
            <button @click="deleteCoin(coin.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    
    <div class="total-profit-display">
      <h4>Total Profit</h4>
      <p id="total-profit">{{ totalProfit }}</p>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import ccxt from 'ccxt';

export default {
  name: "ProfitDisplay",
  data() {
    return {
      portfolio: [],
      totalProfit: 0,
    };
  },
  mounted() {
    this.loadPortfolio();
  },
  methods: {
    async loadPortfolio() {
      try {
        const db = getFirestore(firebaseApp);
        const portfolioSnapshot = await getDocs(collection(db, "Portfolio"));
        let portfolioData = [];
        let total = 0;

        for (const doc of portfolioSnapshot.docs) {
          const coinData = doc.data();
          const currentPrice = await this.getCurrentPrice(coinData.Ticker);
          const profit = (currentPrice - coinData.Buy_Price) * coinData.Buy_Quantity;

          portfolioData.push({
            ...coinData,
            Current_Price: currentPrice,
            Profit: profit,
            id: doc.id
          });

          total += profit;
        }

        this.portfolio = portfolioData;
        this.totalProfit = total.toFixed(2);
      } catch (error) {
        console.error("Error loading portfolio:", error);
      }
    },
    async getCurrentPrice(ticker) {
      try {
        const exchange = new ccxt.binance();
        const ohlcv = await exchange.fetch_ohlcv(ticker, "5m");
        return ohlcv[ohlcv.length - 1][4]; // Latest closing price
      } catch (error) {
        console.error("Error fetching current price:", error);
        return 0;
      }
    },
    async deleteCoin(coinId) {
      try {
        const db = getFirestore(firebaseApp);
        await deleteDoc(doc(db, "Portfolio", coinId));
        this.loadPortfolio(); // Reload the portfolio after deletion
      } catch (error) {
        console.error("Error deleting coin:", error);
      }
    }
  }
};
</script>

<style scoped>
.profit-section {
  text-align: center;
  padding: 1.5em;
  background-color: #fce4ec;
  border-radius: 0.5em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
}

h2 {
  color: #d81b60;
  font-size: 2em;
}

table.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
  font-size: 1em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px 15px;
  text-align: center;
}

th {
  background-color: #f48fb1;
  color: white;
}

td {
  border-bottom: 1px solid #ddd;
}

.profit {
  color: #388e3c;
}

.loss {
  color: #d32f2f;
}

.delete-btn {
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d81b60;
}

.total-profit-display {
  margin-top: 2em;
}

#total-profit {
  font-size: 2em;
  color: #d81b60;
  font-weight: bold;
}

/* CSS for the Profit Table */
.table-container {
  display: flex;
  justify-content: center; /* Centers the table horizontally */
  width: 100%; /* Ensures the container takes full width */
  overflow-x: hidden; /* Prevents horizontal scrolling */
}

.styled-table {
  width: 100%; /* Set the table width to 100% of its container */
  max-width: 80%; /* Set a maximum width for the table */
  margin: 0 auto; /* Center the table within its container */
  border-collapse: collapse;
  margin-top: 1em;
  font-size: 0.8em; /* Reduce the font size */
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
}

.styled-table th, .styled-table td {
  padding: 0.5em; /* Reduce padding */
}

@media screen and (max-width: 768px) {
  .styled-table {
    width: 100%; /* Adjust width for smaller screens */
    font-size: 0.7em; /* Further reduce font size for smaller screens */
  }
  .styled-table th, .styled-table td {
    padding: 0.3em; /* Further reduce padding for smaller screens */
  }
}

/* CSS for Icons */

</style>
