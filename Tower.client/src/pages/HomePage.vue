<template>
  <div class="row m-0 justify-content-center">
    <div class="col-md-12 my-3 card p-5 rounded elevation-3">
      <!-- <Event /> -->
    </div>
  </div>
  <div class="row m-0 justify-content-center">
    <div class="col-md-12 my-3 card p-1 bg-light rounded elevation-3">
      <Navigation @filterEvent="filterEvents($event)" />
    </div>
  </div>
  <div class="row m-0 justify-content-around">
    <div
      class="col-md-3 my-3 p-2 rounded eventCards"
      v-for="e in events"
      :key="e.id"
    >
      <Event :event="e" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "@vue/runtime-core"
import { watchEffect } from "@vue/runtime-core"
import { eventService } from "../services/EventService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
export default {
  name: 'Home',
  setup() {
    const currentFilter = reactive({
      type: 'all'
    })
    onMounted(async () => {
      await eventService.getAllEvents()
    })
    return {
      events: computed(() => AppState.events.filter(e =>
        currentFilter.type == 'all' ? e : e.type == currentFilter.type
      )),
      filterEvents(filter) {
        currentFilter.type = filter
      }
    }
  }
}


</script>

<style scoped lang="scss">
</style>
