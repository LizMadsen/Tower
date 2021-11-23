<template>
  <div class="row m-0">
    <div class="col-md-11 about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="profilePic" :src="account.picture" alt="Profile Picture" />
      <p>{{ account.email }}</p>
    </div>
  </div>
  <div class="row m-0 justify-content-center">
    <div class="col-md-11 card elevation-2 p-3">
      <p>Events you're attending</p>
    </div>
  </div>
  <div class="row m-0 mt-5 justify-content-center justify-content-around">
    <div class="col-md-2 card elevation-2 p-3"></div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventService } from "../services/EventService"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      async () => { await eventService.getEventById('creator') };
    })
    {
      return {
        account: computed(() => AppState.account),
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.profilePic {
  border-radius: 50%;
}
</style>
