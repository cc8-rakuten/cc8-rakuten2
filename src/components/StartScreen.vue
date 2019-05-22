<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/airplane.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      // add data here
    })
  }
</script>

<style>

</style>
