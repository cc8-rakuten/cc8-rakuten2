<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <div class="loader"></div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    // add data here
  })
};
</script>

<style scoped>
.loader {
  margin: 10px auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
