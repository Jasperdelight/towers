<template>
<div class="container">
  <section v-if="activeTower" class="row">
    <div class="col-4">
      <img class="img-fluid" :src="activeTower.coverImg" alt="">
    </div>
    <div class="col-8">
      <h2> {{activeTower.name}}</h2>
      <p>{{activeTower.description}}</p>
    </div>
  </section>


</div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { computed, onMounted, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { towersService } from '../services/TowersService.js';
import { ticketsService } from '../services/TicketsService.js';
import { commentsService } from '../services/CommentsService.js';

export default {
  setup(){
    const route = useRoute()

    async function getTowerById(){
      try{
        const towerId = route.params.eventId
          await towersService.getTowerById(towerId)
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }
    }
    async function getTicketsByTowerId(){
      try{
          const towerId = route.params.eventId
          await ticketsService.getTicketsByTowerId(towerId)
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }
    }
    async function getCommentsByTowerId(){
      try{
          const towerId = route.params.eventId
          await commentsService.getCommentsByTowerId(towerId)
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }
    }


    // onMounted(()=>{
    //   getTowerById()
    //   getTicketsByTowerId()
    // })
    watchEffect(()=>{
      getTowerById()
      getTicketsByTowerId()
      getCommentsByTowerId()
    })

    return {
      towers: computed(()=> AppState.towers),
      activeTower: computed(()=> AppState.activeTower),
      tickets: computed(()=> AppState.tickets),
      comments: computed(()=> AppState.comments)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>