<template>
  <div>
    <h2 class="about-header">About the Cryptocurrency Paper Portfolio (CPP)</h2>
    <div class="about-container">
      <div class="about-content">
        <h4>What is this Crypto Paper Portfolio About?</h4>
        <p>
          This Cryptocurrency Paper Portfolio allows users to simulate purchasing of cryptocurrencies, 
          which is tracks the coin prices and compute their profits without actually conducting the trades. 
        </p>
        
        <h4>Logic and Features behind the Cryptocurrency Paper Portfolio</h4>
        <p>
          Users are able to add various currencies and their intended buy_price, 
          which is then added to a Firestore Database that is pulled and displayed for users to view.
          Users are able to interact with the database by deleting specific coins, in an aesthetically pleasing, 
          user-friendly way.
          The CPP also pulls the real-time market prices through an API which then computes the user's profits
          based on the coins they purchased with the buy_price stated.
        </p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped>
/* General styling */
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

/* Header styling */
.about-header {
  text-align: center;
  color: #e91e63;
  margin-bottom: 1em;
}

/* Container styling */
.about-container {
  background-color: #fff;
  border: 0.1em solid #ccc;
  padding: 1.5em;
  border-radius: 0.5em;
  max-width: 40em;
  margin: 1em auto;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Content section styling */
.about-content {
  text-align: left;
  background-color: #fce4ec;
  border-radius: 0.5em;
  padding: 1.5em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
}

.about-content p {
  font-size: 1em;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5em;
}

</style>
