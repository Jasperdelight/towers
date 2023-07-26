<template>
  <div class="row">
    <div class="col-12">{{ tower.name }}</div>
    <router-link :to="{ name: 'Tower', params: { eventId: tower.id }}">
      <div class="col-12">
        <img class="img-fluid" :src="tower.coverImg" alt="">
      </div>
    </router-link>
  </div>
</template>


<script>
import { Tower } from '../models/Tower.js';

export default {
  props: {
    tower: {type: Tower, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>