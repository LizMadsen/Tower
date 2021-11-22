<template>
  <form @submit.prevent="createEvent">
    <div>
      <div>
        <label for="name" class="form-label d-flex">Event Name:</label>
        <input
          v-model="state.editable.name"
          class="form-control mb-3 justify-content-around d-flex"
          type="text"
          name="eventName"
          id="eventName"
          placeholder="Event name"
          min="10"
          max="200"
          required
        />
        <input
          v-model="state.editable.description"
          class="form-control mb-3 justify-content-around d-flex"
          type="text"
          name="eventDescription"
          id="eventDescription"
          placeholder="Event description"
          min="10"
          max="100"
          required
        />
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary text-light"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <button type="submit" class="btn btn-success">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>