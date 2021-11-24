<template>
  <div class="card elevation-2 rounded">
    <img
      @click="linkEvent(event.id)"
      class="imgFit selectable"
      :src="event.coverImg"
      alt="Event cover image"
    />
    <h3>{{ event.name }}</h3>
    <p>
      <b>Start Date:</b> {{ event.startDate.substring(0, 10) }} <br /><b
        >Location</b
      >:
      {{ event.location }}
    </p>
    <p>{{ event.description }}</p>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router"
import { AppState } from "../AppState";
import { eventService } from '../services/EventService'
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  props: { event: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    async () => { await eventService.getAll() };
    return {
      events: computed(() => AppState.events),
      async linkEvent(id) {
        try {
          if (id) {
            router.push({ path: '/eventdetails/' + id })
            await eventService.getActiveEvent(id);
            await eventService.getCommentsByEvent(id);
            await eventService.getAttendeesByEvent(id);
          }
        } catch (error) {
          logger.log(error)
          Pop.toast("Error")
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.attendBtn {
  width: 6rem;
}
</style>