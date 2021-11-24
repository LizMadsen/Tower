<template>
  <div class="row m-0">
    <div class="col-md-11 about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="profilePic" :src="account.picture" alt="Profile Picture" />
      <p>{{ account.email }}</p>
    </div>
  </div>
  <div class="row m-0 justify-content-around">
    <div
      class="col-md-3 my-3 p-2 rounded eventCards"
      v-for="e in events"
      :key="e.id"
    >
      <button
        class="btn btn-secondary"
        v-if="amAttending(e)"
        @click="unattend()"
      >
        Unattend
      </button>
      <Event :event="e" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { eventService } from "../services/EventService"
import { logger } from "../utils/Logger"
export default {
  name: 'Account',
  setup() {
    //let myEventIds = AppState.attendees.filter(a => a.event. == AppState.account.id)
    onMounted(async () => {
      await eventService.getAllEvents()
    })
    {
      return {
        account: computed(() => AppState.account),
        //attendees: computer(() => AppState.attendees),
        events: computed(() => AppState.events.filter(e => AppState.attendees.filter(a => a.eventId == e.id))),
        amAttending(event) {
          logger.log(event.id)
          let attending = AppState.attendees.some(a => a.eventId == event.id && a.accountId == AppState.account.id)
          logger.log(attending)
          return attending
        },
        // amAttending: computed(() => AppState.attendees.some(
        //   a => a.accountId == AppState.account.id)
        // ),
        async unattend() {
          try {
            await eventService.unattend({ eventId: this.event.id, accountId: this.account.id })
          } catch (error) {
            logger.log(error)
            Pop.toast("Unattend event did not work", "error")
          }
        },
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
