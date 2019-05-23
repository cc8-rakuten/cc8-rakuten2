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
                <h2>Travel Summary</h2>
              </v-card-title>
              <v-card-text>
                <div>
                  <h3>From: {{$store.getters.from}}</h3>
                </div>
                <div>
                  <h3>To: {{$store.getters.destination}}</h3>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <StartScreen v-if="!this.$store.state.submittedStatus"/>
          <v-flex d-flex xs12 v-if="$store.getters.airportSummary1 !== ''">
            <v-card color="grey" dark>
              <v-card-text>
                <h2>Flight Information</h2>
              </v-card-text>
              <v-card-text>
                <div>
                  <h3>{{$store.getters.fromAirport}} to {{$store.getters.toAirport}}</h3>
                </div>
                <div>
                  <h3>{{$store.getters.toAirport}} to {{$store.getters.fromAirport}}</h3>
                </div>
                <div>
                  <h3>Price: ${{$store.getters.price}}</h3>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 v-else>
            <v-card>
              <v-card-text>Searching flights ...</v-card-text>
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
