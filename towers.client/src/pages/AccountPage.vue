<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>

    <div class="container">
      <section class="row">
        <div v-for="ticket in myTickets" :key="ticket.id" class="col-12 bg-secondary card mb-2">
          
        <div>
          <router-link :to="{ name: 'Tower', params: { eventId: ticket.event.id }}">
            <img :src="ticket.event.coverImg" alt="">
    </router-link>
          {{ ticket.event.name }}
          <button @click="unAttendTower()" class="btn btn-danger">Cancel</button>
        </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { ticketsService } from '../services/TicketsService.js';
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      tickets: computed(()=> AppState.tickets),
      myTickets: computed(()=> AppState.myTickets),

      async unAttendTower(){
        try{
            const ticketToRemove = AppState.myTickets.find(t => t.accountId == AppState.account.id)
            const ticketId = ticketToRemove.id
            const wantsToDelete = await Pop.confirm('Are you sure you want to cancel your ticket to this event?')
         if (!wantsToDelete) {
          return
        }
            await ticketsService.unAttendTower(ticketId)
            
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.ticket-img{
  height: 4vh;
  width: 4vh;
  border-radius: 50%;
}
</style>
