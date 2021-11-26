<template>
  <div v-for="c in comments" :key="c.id">
    <div class="card p-2 my-1 d-flex flex-row mb-2">
      <img
        class="profilePic"
        :src="c.creator.picture"
        alt="Profile Picture"
      />&nbsp;
      {{ c.creator.name }}
      <br />
      {{ c.body }}
      <button
        class="btn align-self-end"
        v-if="c.creatorId == account.id"
        @click="deleteComment(c.id)"
      >
        <img class="trashCan" src="https://i.imgur.com/SHjFXfJ.png" />
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { eventService } from "../services/EventService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"

export default {
  props: {
    comments: []
  },
  setup(props) {
    return {
      creator: computed(() => AppState.attendees),
      account: computed(() => AppState.account),
      async deleteComment(id) {
        try {
          await eventService.removeComment(id)
        } catch (error) {
          logger.log(error)
          Pop.toast("Delete comment is not working", "Error")
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.trashCan {
  height: 25px;
}
.profilePic {
  height: 30px;
  border-radius: 50%;
}
</style>