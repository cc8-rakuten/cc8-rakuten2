<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md7>
        <v-img :src="this.$store.state.tripPlan.pictureURL" class="travel-image"></v-img>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <v-layout row wrap>
          <v-flex v-for="n in 1" :key="n" d-flex xs12>
            <v-card color="grey" dark>
              <v-card-title primary-title>
                <h3>Travel Summary</h3>
              </v-card-title>
              <v-card-text>
                <div>From: {{$store.getters.from}}</div>
                <div>To: {{$store.getters.destination}}</div>
              </v-card-text>
            </v-card>
          </v-flex>
          <StartScreen v-if="!this.$store.state.submittedStatus"/>
          <v-flex d-flex xs12 v-if="$store.getters.airportSummary1 !== ''">
            <v-card color="grey" dark>
              <v-card-text>
                <h3>Flight Information</h3>
              </v-card-text>
              <v-card-text>
                <div>{{$store.getters.airportSummary1}}</div>
                <div>{{$store.getters.airportSummary2}}</div>
                <div>Price: {{$store.getters.price}}</div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
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
.travel-image {
  max-height: 100vh;
  width: auto;
}
</style>
