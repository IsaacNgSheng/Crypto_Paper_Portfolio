<template>
  <h2>Profit Analysis</h2>
  <ProfitDisplay />
</template>

<script>
// Importing of ProfitDisplay
import ProfitDisplay from '@/components/ProfitDisplay.vue';
export default {
  name: 'OnlyProft',
  components: {
    ProfitDisplay,
  }
};
</script>

<style scoped>
/* Styling Overall Page */
h2 {
  color: #e91e63;
  text-align: center;
}
</style>
