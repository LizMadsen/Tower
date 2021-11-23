<template>
  <div v-for="c in comments" :key="c.id">
    <div class="card elevation-1">
      <!-- <p>{{ commentCreator.picture }} {{ commentCreator.name }}</p> -->
      {{ c.body }}
    </div>
  </div>
</template>


<script>

export default {
  props: {
    comments: []
  },
  setup(props) {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
</style>