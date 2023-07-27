<template>
  <div class="row text-center">
   
    <div  class="col-12 fs-4">  <span class="text-danger" v-if="tower.isCanceled == true"> Canceled</span> {{ tower.name }} </div>
    <router-link :to="{ name: 'Tower', params: { eventId: tower.id }}">
      <section class="row">

        <div class="col-12 pb-2">
        <img v-if="tower.isCanceled == false" class="img-fluid img rounded" :src="tower.coverImg" alt="">
        <img v-if="tower.isCanceled == true" class="img-fluid img canceled-img rounded" :src="tower.coverImg" alt="">
      </div>
    </section>
    </router-link>
  </div>
</template>


<script>
import { computed } from 'vue';
import { Tower } from '../models/Tower.js';
import { AppState } from '../AppState.js';

export default {
  props: {
    tower: {type: Tower, required: true}
  },
  activeTower: computed(()=> AppState.activeTower ),
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

.canceled-img{
  -webkit-filter: grayscale(100%);
       -moz-filter: grayscale(100%);
         -o-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
            filter: grayscale(100%);
}

.img {
      height: 20vh;
      width: 20vh;
      width: 100%;
      
      // object-fit: contain;
      object-position: center;
    }
</style>