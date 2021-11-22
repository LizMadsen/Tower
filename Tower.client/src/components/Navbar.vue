<template>
  <nav class="navbar navbar-expand-lg navbar-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <img class="towerLogo" src="https://i.imgur.com/FJsYad4.png" />
      <div class="d-flex flex-column align-items-center"></div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" align="center" id="navbarText">
      <ul class="navbar-nav me-auto"></ul>
      <span class="navbar-text">
        <button
          class="btn selectable text-light my-2 my-lg-0"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown my-2 my-lg-0" v-else>
          <div
            class="dropdown-toggle selectable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="authDropdown"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="profilePic"
            />
            <span class="mx-3 text-light">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            aria-labelledby="authDropdown"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Manage Account
              </div>
            </router-link>
            <div
              class="
                list-group-item list-group-item-action
                hoverable
                text-danger
              "
              @click="logout"
            >
              <i class="mdi mdi-logout"></i>
              Logout
            </div>
          </div>
        </div>
        <button
          class="btn text-light lighten-30 my-2 my-lg-0 align-items-middle"
          data-bs-toggle="modal"
          data-bs-target="#createEvent"
        >
          <img class="createEventBtn" src="https://i.imgur.com/CYu36JW.png" />
          Create Event
        </button>
        <Modal id="createEvent">
          <template #modal-title>Create Event</template>
          <template #modal-body><CreateEvent /> </template>
        </Modal>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.createEventBtn {
  height: 50px;
}
.towerLogo {
  height: 75px;
}
.navbar {
  background: #3770b1;
}
.profilePic {
  border-radius: 50%;
}
</style>
