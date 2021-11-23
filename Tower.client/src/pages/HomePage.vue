<template>
  <div class="row m-0 justify-content-center">
    <div class="col-md-12 my-3 card p-5 rounded elevation-3">
      <!-- <Event /> -->
    </div>
  </div>
  <div class="row m-0 justify-content-center">
    <div class="col-md-12 my-3 card p-3 bg-light rounded elevation-3">
      <Navigation />
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
import { computed, onMounted } from "@vue/runtime-core"
import { eventService } from "../services/EventService"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      await eventService.getAllEvents()
    })
    return {
      events: computed(() => AppState.events),
    }
  }
}


</script>

<style scoped lang="scss">
// .eventCards {
//   height: 14rem;
// }
</style>
