<template>
<div class="container">
  <section v-if="activeTower" class="row bg-primary">
    <div class="col-md-4 col-6">
      <img class="img-fluid" :src="activeTower.coverImg" alt="">
    </div>
    <div class="col-md-8 col-6">
      <h2> {{activeTower.name}}</h2>
      <p>{{activeTower.description}}</p>
      <h4>Spots Left: {{ ticketsLeft}}</h4>
      <button @click="attendTower()" class="btn btn-warning">Attend</button>
    </div>
  </section>

  <h5 class="mb-0">Who's Going</h5>
  <section class="row bg-secondary">
    <div v-for="ticket in tickets" :key="ticket.id" class="col-12">
      <img class="ticket-img" :src="ticket.profile.picture" :alt="ticket.profile.name" :title="ticket.profile.name">
    </div>
  </section>

  <section class="row">
    <div class="col-md-10 col-12">
      <form @submit.prevent="createComment()">
        <label for="comment">Comments</label>
        <textarea required v-model="editable.body" class="form-control" name="comment" id="comment" rows="3"></textarea>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </section>

  <section class="row bg-dark">
    <div v-for="comment in comments" :key="comment.id" class="col-md-10 col-12">
      <section class="row">
        <div class="col-md-4 col-6 d-flex justify-content-end">
          <img class="img-fluid ticket-img" :src="comment.creator.picture" alt="">
          <h5>{{ comment.creator.name }}</h5>
        </div>
        <div class="col-md-8 col-6 bg-light">
          
          <p>{{ comment.body }}</p>
        </div>
      </section>
    </div>
  </section>
</div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { computed, onMounted, ref, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { towersService } from '../services/TowersService.js';
import { ticketsService } from '../services/TicketsService.js';
import { commentsService } from '../services/CommentsService.js';

export default {
  setup(){
    const editable = ref({})
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
      editable,
      towers: computed(()=> AppState.towers),
      activeTower: computed(()=> AppState.activeTower),
      tickets: computed(()=> AppState.tickets),
      comments: computed(()=> AppState.comments),
      ticketsLeft: computed(()=> AppState.activeTower.capacity - AppState.activeTower.ticketCount),


      async createComment(){
        try{
          const commentData = editable.value
          commentData.eventId = route.params.eventId
          await commentsService.createComment(commentData)
          editable.value = {}
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      },
      async attendTower(){
        try{
          const towerId = route.params.eventId
        const profileData = {}
        profileData.eventId = towerId
        await towersService.attendTower(profileData)
        AppState.activeTower.ticketCount--
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
.ticket-img{
  height: 4vh;
  width: 4vh;
  border-radius: 50%;
}

</style>