<template>
<div class="container-fluid">
  <section class="row">
  <div class="col-md-12"> Tower Tickets</div>
</section>
<section class="row">
  
  <div class="col-md-2 col-4"><button>All</button></div>
<div class="col-md-2 col-4"><button>Expos</button></div>
<div class="col-md-2 col-4"><button>Conventions</button></div>
<div class="col-md-2 col-4"><button>Exhibits</button></div>
<div class="col-md-2 col-4"><button>Sports</button></div>
<div class="col-md-2 col-4"><button>Concerts</button></div>
</section>

<section class="row">
  <div v-for="tower in towers" :key="tower.id" class="col-md-3 col-12 bg-secondary pb-2">
    <TowerCard :tower="tower"/>
  </div>
</section>

</div>


</template>

<script>
import { computed, onMounted } from 'vue'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import {towersService} from '../services/TowersService.js'
import { AppState } from '../AppState.js';
export default {
  setup() {

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
    towers: computed(()=> AppState.towers)

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

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
