<template>
<div class="container-fluid">
  <section class="row">
  <div class="col-md-12"> </div>
</section>
<section class="row">
  
  <div class="col-md-2 col-4" @click="filterBy = ''"><button class="btn btn-info">All</button></div>
<div class="col-md-2 col-4" @click="filterBy = 'concert'" ><button class="btn btn-info">Concerts</button></div>
<div class="col-md-2 col-4" @click="filterBy = 'convention'"><button class="btn btn-info">Conventions</button></div>
<div class="col-md-2 col-4" @click="filterBy = 'digital'"><button class="btn btn-info">Digitals</button></div>
<div class="col-md-2 col-4" @click="filterBy='sport'"><button class="btn btn-info">Sports</button></div>
<div class="col-md-2 col-4" @click="filterBy ='misc'"><button class="btn btn-info">Misc</button></div>
</section>

<section class="row justify-content-center">
  <div v-for="tower in towers" :key="tower.id" class="col-md-3 col-12 bg-secondary card m-4">
    <TowerCard :tower="tower"/>
  </div>
</section>

</div>


</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import {towersService} from '../services/TowersService.js'
import { AppState } from '../AppState.js';
export default {
  setup() {
    const filterBy = ref('')
    async function getTowers(){
      try{
          await towersService.getTowers()
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }
    }

    onMounted(()=> {
      getTowers()
    })
    return {
      filterBy,
    towers: computed(()=> {
      if(filterBy.value == ''){
        return AppState.towers
      } else{
        return AppState.towers.filter(t => t.type == filterBy.value)
      }
    })

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    .img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
