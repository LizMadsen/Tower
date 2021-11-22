<template>
  <div class="row m-0 justify-content-center">
    <div class="col-md-11 my-3 card p-5 bg-light rounded elevation-3">
      EVENT HEADER
    </div>
  </div>
  <div class="row m-0 justify-content-center">
    <div class="col-md-11 my-3 card p-3 bg-light rounded elevation-3">
      <Navigation />
    </div>
  </div>
  <div class="row m-0 justify-content-around">
    <div class="col-md-2 my-3 card p-5 bg-light rounded elevation-3 eventCards">
      <Event />
    </div>
    <div class="col-md-2 my-3 card p-5 bg-light rounded elevation-3 eventCards">
      <Event />
    </div>
    <div class="col-md-2 my-3 card p-5 bg-light rounded elevation-3 eventCards">
      <Event />
    </div>
    <div class="col-md-2 my-3 card p-5 bg-light rounded elevation-3 eventCards">
      <Event />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped lang="scss">
.eventCards {
  height: 14rem;
}
</style>
