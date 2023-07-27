<template>
<div class="container">
  <section v-if="activeTower" class="row bg-primary mt-4">
    <div class="col-md-4 col-6">
      <img v-if="activeTower.isCanceled == false" class="img-fluid" :src="activeTower.coverImg" alt="">
      <img v-else class="img-fluid canceled-img" :src="activeTower.coverImg" alt="">
      <div>Created At: {{ formatDate(activeTower.createdAt) }}</div>
    </div>
    <div class="col-md-8 col-6">
      <h1 class="text-danger" v-if="activeTower.isCanceled == true">Canceled</h1>
      <h2  > {{activeTower.name}}</h2>
      <p>{{activeTower.description}}</p>
      <p class="fs-4 text-danger" v-if="activeTower.isCanceled == true">Event is Canceled</p>
      <h4 v-else >Spots Left: {{ ticketsLeft}}</h4>

      <button v-if="!isAttending && activeTower.isCanceled == false && activeTower.capacity - activeTower.ticketCount != 0" @click="attendTower()" class="btn btn-warning">Attend</button>

      <button disabled v-if="activeTower.capacity - activeTower.ticketCount === 0"  class="btn btn-warning">FULL</button>

      <button v-if="isAttending && activeTower.isCanceled == false " @click="unAttendTower()" class="btn btn-danger">Cancel</button>
      <div>Event Time: {{ formatDate(activeTower.startDate) }} </div> 

    </div>
    <button v-if="account.id == activeTower.creatorId && activeTower.isCanceled == false" @click="archiveTower()" class="btn btn-danger"> Cancel Event</button>
  </section>

  <h5  class="mb-0">Who's Going</h5>
  <section class="row bg-secondary">
    <div class="col-12 d-flex">

      <div v-for="ticket in tickets" :key="ticket.id" class="">
      <img class="ticket-img" :src="ticket.profile.picture" :alt="ticket.profile.name" :title="ticket.profile.name">
    </div>
      </div>
  </section>

  <section class="row" v-if="!activeTower?.isCanceled">
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
        <div class="col-md-8 col-6 bg-light elevation-4 my-2">
          
          <p>{{ comment.body }}</p>
          <button v-if="account.id == comment.creatorId " @click="deleteComment()" class="btn btn-danger">Delete</button>
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

    // TODO page update when canceled
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
      account: computed(()=> AppState.account),
      isAttending: computed(()=> {
        return AppState.tickets.find(t => t.accountId == AppState.account.id)
      }),

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
      async deleteComment(){
  try{
      const commentToDelete = AppState.comments.find(c => c.creatorId == AppState.account.id)
      const commentToDeleteId = commentToDelete.id
      await commentsService.deleteComment(commentToDeleteId)
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
        await ticketsService.attendTower(profileData)
        AppState.activeTower.ticketCount++
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      },
      async unAttendTower(){
        try{
          
            const ticketToRemove = AppState.tickets.find(t => t.accountId == AppState.account.id)
            const profileId = ticketToRemove.id
            const wantsToDelete = await Pop.confirm('Are you sure you want to cancel your ticket to this event?')
         if (!wantsToDelete) {
          return
        }
            await ticketsService.unAttendTower(profileId)
            AppState.activeTower.ticketCount--
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }},
    
    async archiveTower(){
      try{
        const towerId = route.params.eventId
         const wantsToDelete = await Pop.confirm('Are you sure you want to cancel event?')
         if (!wantsToDelete) {
          return
        }
        await towersService.archiveTower(towerId)
        getTowerById()
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }
    },
    
     formatDate(createdAt){
        const date = new Date(createdAt)
        const dateFormat = {
          dateStyle: 'short',
          timeStyle: 'short'
        }
        return date.toLocaleString(undefined, dateFormat)
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

.canceled-img{
  -webkit-filter: grayscale(100%);
       -moz-filter: grayscale(100%);
         -o-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
            filter: grayscale(100%);
}

</style>