<template>
  <div class="row m-0">
    <div
      class="col-md-11 bg-light card elevation-1"
      v-for="a in activeEvent"
      :key="a.id"
    >
      <img class="imgFit" :src="event.coverImg" alt="Event cover image" />
      <h3>{{ event.name }}</h3>
      <p>
        <b>Capacity:</b> {{ event.capacity }} <br /><b>Start Date:</b>
        {{ event.startDate }} <br /><b>Location</b>:
        {{ event.location }}
      </p>
      <p>{{ event.description }}</p>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { eventService } from "../services/EventService"
import { AppState } from "../AppState"
export default {
  setup() {
    onMounted(async () => {
      await eventService.getActiveEvent()
    })
    return {
      event: computed(() => AppState.activeEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
