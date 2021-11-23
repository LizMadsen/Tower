<template>
  <div class="row m-0 justify-content-center">
    <div class="col-md-11 bg-light card elevation-1">
      <h3>{{ event.name }}</h3>
      <img
        class="imgFit eventDetailsCoverImage"
        :src="event.coverImg"
        alt="Event cover image"
      />
      <p>
        <b>Capacity:</b> {{ event.capacity }} <br /><b>Start Date:</b>
        {{ event.startDate }} <br /><b>Location</b>:
        {{ event.location }}
      </p>
      <p>{{ event.description }}</p>
    </div>
  </div>
  <div class="row m-0 my-5 justify-content-center">
    <div class="col-8 card elevation-1">
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
      async createComment() {
        try {
          newComment.editable.eventId = this.event.id
          newComment.editable.accountId = AppState.account.id
          await eventService.createComment(newComment.editable)
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
</style>
