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
      <button class="btn btn-secondary" @click.prevent="unattend(e)">
        Unattend
      </button>
      <Event :event="e" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService"
import { eventService } from "../services/EventService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      await accountService.getAccountAttendees(AppState.account.id)
    })
    {
      return {
        account: computed(() => AppState.account),
        attendees: computed(() => AppState.attendees),
        events: computed(() => AppState.events.filter(
          e => AppState.attendees.some(a => a.eventId == e.id))
        ),
        async unattend(event) {
          try {
            await eventService.unattendEvent({ eventId: event.id, accountId: this.account.id })
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
