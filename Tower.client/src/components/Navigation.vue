<template>
  <div class="NavigationPage row m-0 justify-content-around">
    <button
      :class="{ selected: selection == 'all' }"
      class="btn col-2"
      @click="setFilter('all')"
    >
      All Events
    </button>
    <button
      :class="{ selected: selection == 'convention' }"
      class="btn col-2"
      @click="setFilter('convention')"
    >
      Conventions
    </button>
    <button
      :class="{ selected: selection == 'sport' }"
      class="btn col-2"
      @click="setFilter('sport')"
    >
      Sports
    </button>
    <button
      :class="{ selected: selection == 'digital' }"
      class="btn col-2"
      @click="setFilter('digital')"
    >
      Digital
    </button>
    <button
      :class="{ selected: selection == 'concert' }"
      class="btn col-2"
      @click="setFilter('concert')"
    >
      Concerts
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ["filterEvent"],
  setup(_, context) {
    const selection = ref('all')
    return {
      selection,
      setFilter(filter) {
        context.emit("filterEvent", filter)
        selection.value = filter
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.selected {
  background: #3973b6;
  color: white;
}
</style>