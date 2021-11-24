<template>
  <div class="row m-0 justify-content-center" v-if="event">
    <div class="col-md-11 bg-light card elevation-1">
      <h3>
        {{ event.name }}
        <button
          class="btn"
          v-if="event.creatorId == account.id && !event.isCanceled"
          @click="cancelEvent()"
          :title="'Cancel event'"
        >
          <img class="cancelEventBtn" src="https://i.imgur.com/tf5eRvQ.png" />
        </button>
        <button
          data-bs-toggle="modal"
          data-bs-target="#editEvent"
          class="btn"
          :title="'Edit event'"
          v-if="event.creatorId == account.id && !event.isCanceled"
        >
          <img class="cancelEventBtn" src="https://i.imgur.com/tccYxoA.png" />
        </button>
        <Modal id="editEvent">
          <template #modal-title>Edit Event</template>
          <template #modal-body><EditEvent /></template>
        </Modal>
      </h3>
      <img
        class="eventDetailsCoverImage"
        :src="event.coverImg"
        alt="Event cover image"
      />
      <p>
        <b>Seats Taken:</b> {{ attendees.length }} / {{ event.capacity }}
        <br />
        <b>Start Date:</b> {{ event.startDate.substring(0, 10) }}
        <br />
        <b>Location</b>:
        {{ event.location }}
        <br />
        <button
          class="btn btn-primary"
          v-if="!event.isCanceled && !amAttending"
          @click="isAttending()"
        >
          Attend
        </button>
        <button class="btn btn-danger" disabled v-if="event.isCanceled">
          CANCELED
        </button>
        <button
          class="btn btn-secondary"
          disabled
          v-if="!event.isCanceled && amAttending"
        >
          Unattend
        </button>
      </p>

      <p>{{ event.description }}</p>
    </div>
  </div>
  <div class="row m-0 justify-content-center mt-3">
    <div class="col-8 card elevation-1">
      <img
        v-for="a in attendees"
        :key="a.id"
        class="profilePic p-1"
        :src="a.account.picture"
        alt="Event cover image"
        :title="a.account.name"
      />
    </div>
  </div>
  <div class="row m-0 mt-3 justify-content-center">
    <div class="col-8 mb-3 card elevation-1">
      <form @submit.prevent="createComment()">
        <textarea
          v-model="newComment.editable.body"
          type="text"
          class="form-control mt-3"
          name="comment"
          id="body"
          placeholder="Leave a comment"
          min="10"
          max="250"
          required
        />
        <div class="text-end mt-2">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
      <Comment :comments="comments" />
    </div>
  </div>
</template>


<script>
import { computed, onMounted, reactive } from "@vue/runtime-core"
import { eventService } from "../services/EventService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup() {
    const newComment = reactive({
      editable: {},
    })
    onMounted(async () => {
      //await eventService.getCommentsByEvent(AppState.activeEvent.id)
    })
    return {
      newComment,
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      attendees: computed(() => AppState.attendees),
      account: computed(() => AppState.account),
      amAttending: computed(() => AppState.attendees.some(a => a.accountId == this.account.id && a.eventId == this.event.id)),
      async isAttending() {
        try {
          await eventService.attendEvent({ eventId: this.event.id, accountId: this.account.id })
        } catch (error) {
          logger.log(error)
          Pop.toast("Attend event did not work", "error")
        }
      },
      async cancelEvent() {
        try {
          this.event.isCanceled = true
          await eventService.cancelEvent(this.event)
        } catch (error) {
          logger.log(error)
          Pop.toast("Cancel event did not work", "error")
        }
      },
      async createComment() {
        try {
          newComment.editable.eventId = this.event.id
          newComment.editable.accountId = AppState.account.id
          await eventService.createComment(newComment.editable)
          newComment.editable.body = ""
        } catch (error) {
          logger.log(error)
          Pop.toast("Create comment did not work", 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.eventDetailsCoverImage {
  object-fit: cover;
  height: 12rem;
  width: 100%;
}
.profilePic {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.cancelEventBtn {
  height: 25px;
}
</style>
