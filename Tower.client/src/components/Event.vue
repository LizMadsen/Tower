<template>
  <div class="elevation-2 rounded" v-for="e in events" :key="e.id">
    {{ e.name }}
    {{ e.description }}
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
  setup() {
    const router = useRouter();
    async () => { await eventService.getAll() };
    return {
      events: computed(() => AppState.events),
      async linkEvent(id) {
        try {
          if (id) {
            router.push({ path: '/events/' + id })
            AppState.activeEvent = id
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
</style>