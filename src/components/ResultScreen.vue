<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md7>
        <v-card color="grey" dark id="pic-card">

          <img :src="this.$store.state.tripPlan.pictureURL" class="travel-image">

        </v-card>
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
          <v-flex d-flex xs12 v-if="this.$store.state.submittedStatus === 3">
            <v-card color="grey" dark>
              <v-card-title primary-title>
                <h2>Flight Information</h2>
              </v-card-title>
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
          <v-flex d-flex xs12 v-if="this.$store.state.submittedStatus === 2">
            <v-card color="grey" dark>
              <v-card-title primary-title>
                <h2>Flight Information</h2>
              </v-card-title>
              <v-card-text color="grey" dark>
                <div id="loader"></div>
              </v-card-text>
            </v-card>
            <!-- <div class="flight-loader">
              <h4>Searching flights ...</h4>
            </div> -->
          </v-flex>
          <v-spacer></v-spacer>
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
#pic-card {
  text-align: center;
  padding: 5px;
}
.travel-image {
  max-height: 500px;
  max-width: 100%;
  margin: 0;
  border-radius: 10px;
}

.flight-loader {
  animation: flash 2s ease infinite alternate;
}

@keyframes flash {
  50% {
    opacity: 0;
  }
}

#loader {
  margin: 5px auto;
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  border-top: 10px solid #3498db;
  width: 60px;
  height: 60px;
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

img {
  max-height: 0.2vh; 
}
</style>
