<template>
  <header class="main-color">
    <Navbar />
  </header>
  <main class="light-color">
    <router-view />
    
  </main>
   <footer class="main-color text-light">
    
  </footer>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Tower</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
        <form @submit.prevent="createTower()">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input v-model="editable.name" required type="text" class="form-control" id="name" placeholder="name..."
        maxlength="150" minlength="3">
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <input v-model="editable.description" required type="text" class="form-control" id="description" placeholder="description..."
        maxlength="1000" minlength="3">
    </div>
    <div class="mb-3">
      <label for="location" class="form-label">Location</label>
      <input v-model="editable.location" required type="text" class="form-control" id="location" placeholder="location..."
        maxlength="150" minlength="3">
    </div>
    <div class="mb-3">
      <label for="capacity" class="form-label">Capacity</label>
      <input v-model="editable.capacity" required type="number" class="form-control" id="capacity" placeholder="capacity..."
        maxlength="150" minlength="3">
    </div>
    <div class="mb-3">
      <label for="coverImg" class="form-label">Photo</label>
      <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg" placeholder="CoverImg..."
        maxlength="1000" minlength="3">
    </div>

    <div class="mb-3">
      <label for="startDate" class="form-label">Start Date</label>
      <input v-model="editable.startDate" required type="date" class="form-control" id="startDate" placeholder="startDate..."
        maxlength="150" minlength="3">
    </div>

    <select v-model="editable.type" required class="form-select mb-3" aria-label="Default select example">
      <option selected disabled value="">Open this select menu</option>
      <option v-for="type in types" :key="type" :value="type">
        {{ type }}
      </option>
    </select>

    <div class="text-end">
      <button class="btn btn-success" type="submit">Submit</button>
    </div>
  </form>

      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Pop from './utils/Pop.js';
import { logger } from './utils/Logger.js';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import {towersService} from './services/TowersService.js'
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      types:['concert', 'convention', 'sport', 'digital', 'misc'],
      appState: computed(() => AppState),

      async createTower(){
        try{
            const towerData = editable.value
            const tower = await towersService.createTower(towerData)
          editable.value = {}
          
          Modal.getOrCreateInstance('#exampleModal').hide()
          router.push({ name: 'Tower', params: {eventId: tower.id}})
          } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      }
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}
.main-color{
  background-color: #530c0b;
}
.secondary-color{
  background-color: #54251d
}
.danger-color{
  background-color: #ba7438
}
.light-color{
  background-color: #c6b273
}
.lighter-color{
  background-color: #c4c994
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
