<template>
  <form @submit.prevent="edit()">
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
    <div class="d-flex justify-content-around">
      <input
        v-model="state.editable.capacity"
        class="form-control mb-3 justify-content-around d-flex mx-2"
        type="number"
        name="capacity"
        id="capacity"
        placeholder="Capacity"
        required
      />
      <div>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle dropdownMenuBtn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Event Type: {{ state.editable.type }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="option in options" :key="option">
              <a
                class="dropdown-item text-dark"
                @click="state.editable.type = option"
                href="javascript:void(0)"
                >{{ option }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <input
        v-model="state.editable.startDate"
        class="form-control mb-3 mx-2"
        type="date"
        name="startDate"
        id="startDate"
        placeholder="Start Date"
        required
      />
    </div>
    <input
      v-model="state.editable.location"
      class="form-control mb-3"
      type="text"
      name="location"
      id="location"
      placeholder="Event location"
      min="10"
      max="250"
      required
    />
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
import { computed, reactive } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventService } from "../services/EventService"
import { Modal } from "bootstrap"
export default {
  props: { activeEvent: { type: Object } },
  setup() {
    const state = reactive({
      editable: {}
    })
    const route = useRoute();
    watchEffect(async () => {
      try {
        state.editable.name = AppState.activeEvent.name
        state.editable.description = AppState.activeEvent.description
        state.editable.coverImg = AppState.activeEvent.coverImg
        state.editable.capacity = AppState.activeEvent.capacity
        state.editable.type = AppState.activeEvent.type
        state.editable.startDate = AppState.activeEvent.startDate
        state.editable.location = AppState.activeEvent.location
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message);
      }
    });
    return {
      state,
      options: ['concert', 'convention', 'sport', 'digital'],
      activeEvent: computed(() => AppState.activeEvent),
      async edit() {
        try {
          await eventService.editEvent(this.activeEvent.id, state.editable)
          Modal.getOrCreateInstance(document.getElementById('editEvent')).hide();
        } catch (error) {
          logger.log(error)
          Pop.toast("Edit event did not work", "error")
        }
      },
    }
  }
}
</script>