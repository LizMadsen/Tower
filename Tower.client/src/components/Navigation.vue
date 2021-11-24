<template>
  <div class="NavigationPage row m-0 justify-content-around">
    <button class="btn col-2" @click="setFilter('all')">All Events</button>
    <button class="btn col-2" @click="setFilter('convention')">
      Conventions
    </button>
    <button class="btn col-2" @click="setFilter('sport')">Sports</button>
    <button class="btn col-2" @click="setFilter('digital')">Digital</button>
    <button class="btn col-2" @click="setFilter('concert')">Concerts</button>
  </div>
</template>


<script>
import { logger } from "../utils/Logger"
export default {
  emits: ["filterEvent"],
  setup(_, context) {
    return {
      setFilter(filter) {
        // logger.log(filter)
        context.emit("filterEvent", filter)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>