<template>
  <div class="row m-0 justify-content-center">
    <div class="col-11 my-3 card p-5 bg-light rounded elevation-3">
      EVENT HEADER
    </div>
  </div>
  <div class="row m-0 justify-content-center">
    <div class="col-11 my-3 card p-3 bg-light rounded elevation-3">
      <Navigation />
    </div>
  </div>
  <div class="row m-0 justify-content-around">
    <div class="col-2 my-3 card p-5 bg-light rounded elevation-3 eventCards">
      EVENT CARDS
    </div>
    <div class="col-2 my-3 card p-5 bg-light rounded elevation-3 eventCards">
      EVENT CARDS
    </div>
    <div class="col-2 my-3 card p-5 bg-light rounded elevation-3 eventCards">
      EVENT CARDS
    </div>
    <div
      class="
        col-2
        my-3
        card
        p-5
        bg-light
        text-dark
        rounded
        elevation-3
        eventCards
      "
    >
      EVENT CARDS
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.eventCards {
  height: 14rem;
}
</style>
