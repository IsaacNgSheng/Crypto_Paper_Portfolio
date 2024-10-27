<template>
  <div>
    <WelcomeCpp/>
    <!-- Container for the Objects-->
    <div class="container">
      <AddCoin @added="updatePortfolio"/>
      <ProfitDisplay :portfolio="portfolio" :total-profit="totalProfit" />
      <img id = "coin-icon" src = "@/assets/Coins.png" alt="">
    </div>
  </div>
</template>

<script>
// Imports for the Script
import { ref, onMounted } from 'vue';
import WelcomeCpp from '@/components/WelcomeCpp.vue';
import AddCoin from '@/components/AddCoin.vue';
import ProfitDisplay from '@/components/ProfitDisplay.vue';

export default {
  components: {
    WelcomeCpp,
    AddCoin,
    ProfitDisplay
  },
  setup() {
    const portfolio = ref([]);
    const totalProfit = ref(0);

    const updatePortfolio = async () => {
      try {

        // Pull and compute the updated portfolio
        const snapshot = await db.collection("Portfolio").get();
        totalProfit.value = 0;
        portfolio.value = [];

        for (const doc of snapshot.docs) {
          const coinData = doc.data();
          const currentPrice = await getCurrentPrice(coinData.Ticker);
          const profit = (currentPrice - coinData.Buy_Price) * coinData.Buy_Quantity;
          totalProfit.value += profit;

          portfolio.value.push({
            ...coinData,
            CurrentPrice: currentPrice,
            Profit: profit
          });
        }
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    onMounted(() => {
      updatePortfolio();
    });

    return {
      portfolio,
      totalProfit,
      updatePortfolio
    };
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
  margin: 0;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container {
  background-color: #fff;
  border: 0.1em solid #ccc;
  padding: 1.5em;
  border-radius: 0.5em;
  max-width: 40em;
  margin: 1em auto;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.1);
  text-align: center;
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

h2, h4 {
  color: #e91e63;
}

/* Table Styling*/
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2em;
}

th, td {
  padding: 0.5em;
  text-align: center;
  border: 0.1em solid #ccc;
}

th {
  background-color: #d81b60;
  color: white;
}

td {
  background-color: #fce4ec;
  color: #d81b60;
}

/* Ensure Size of Icons Fit */
#coin-icon {
  max-width: 40em;
  max-height: 40em;
  margin: 1em;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>
