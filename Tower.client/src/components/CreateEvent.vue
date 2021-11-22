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
          max="100"
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
          max="250"
          required
        />
        <input
          v-model="state.editable.startDate"
          class="form-control mb-3 justify-content-around d-flex"
          type="date"
          name="startDate"
          id="startDate"
          placeholder="Start Date"
          required
        />
        <input
          v-model="state.editable.capacity"
          class="form-control mb-3 justify-content-around d-flex"
          type="number"
          name="capacity"
          id="capacity"
          placeholder="Capacity"
          required
        />
        <input
          v-model="state.editable.coverImg"
          class="form-control mb-3 justify-content-around d-flex"
          type="text"
          name="coverImg"
          id="coverImg"
          placeholder="Image URL"
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
import { watchEffect } from "@vue/runtime-core"
import { useRoute, useRouter } from "vue-router"
import { Modal } from 'bootstrap';
import { reactive } from '@vue/reactivity';
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventService } from '../services/EventService'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      editable: {}
    })
    watchEffect(async () => {

    })
    return {
      state,
      async createEvent() {
        try {
          logger.log("test")
          await eventService.createEvent(state.editable)
          Modal.getOrCreateInstance(document.getElementById('CreateEvent')).hide();
        } catch (error) {
          logger.log(error)
          Pop.toast("Create event did not work.", 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>