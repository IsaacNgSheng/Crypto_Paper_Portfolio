# Cryptocurrency Paper Portfolio (CPP)

This template should help get you started developing with Vue 3 in Vite.

## About the Cryptocurrency Paper Portfolio (CPP)

This Cryptocurrency Paper Portfolio allows users to simulate purchasing cryptocurrencies, tracking the coin prices, and computing their profits without actually conducting the trades.

## Logic and Features Behind the CPP

Users can add various currencies and their intended buy prices, which are then added to a Firestore Database. This database is pulled and displayed for users to view. Users can interact with the database by deleting specific coins in an aesthetically pleasing, user-friendly way. The CPP also pulls real-time market prices through an API, computing the user’s profits based on the coins they purchased at the stated buy prices.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
