<template>
  <div class="row">
   
    <div  class="col-12">  <span class="text-danger" v-if="tower.isCanceled == true"> Canceled</span> {{ tower.name }} </div>
    <router-link :to="{ name: 'Tower', params: { eventId: tower.id }}">
      <div class="col-12">
        <img v-if="tower.isCanceled == false" class="img-fluid" :src="tower.coverImg" alt="">
        <img v-if="tower.isCanceled == true" class="img-fluid canceled-img" :src="tower.coverImg" alt="">
      </div>
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
</style>