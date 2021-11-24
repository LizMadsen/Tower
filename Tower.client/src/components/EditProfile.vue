<template>
  <div class="row">
    <div class="col-11">
      <div class="profile form component">
        <form @submit.prevent="edit()">
          <label for="">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            class="form-control mb-2"
            required
            v-model="state.editable.name"
          />
          <label for="">Profile Picture</label>
          <input
            type="url"
            placeholder="Profile Image Url"
            name="picture"
            id="picture"
            class="form-control mb-2"
            required
            v-model="state.editable.picture"
          />

          <button type="submit" class="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router"
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
import { Modal } from 'bootstrap';
import { computed, reactive } from '@vue/reactivity';
import { eventService } from "../services/EventService";


export default {
  props: { account: { type: Object } },
  setup() {
    const state = reactive({
      editable: {}
    })
    const route = useRoute();
    watchEffect(async () => {
      try {
        state.editable.name = AppState.account.name
        state.editable.picture = AppState.account.picture
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message);
      }
    });
    return {
      state,
      account: computed(() => AppState.account),
      async edit() {
        try {
          await accountService.edit(state.editable)
          Modal.getOrCreateInstance(document.getElementById('editProfile')).hide();
        } catch (error) {
          logger.log(error)
          Pop.toast("Edit profile did not work", "error")
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>
</style>