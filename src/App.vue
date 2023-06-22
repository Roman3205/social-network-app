<script>
import { RouterView } from 'vue-router'
import AppEnter from './views/AppEnter.vue'
import AppSidebar from './components/AppSidebar.vue'

export default {
  components: {
    RouterView,
    AppEnter,
    AppSidebar
  },
  computed: {
    shouldShowSidebar() {
      return this.$route.name !== 'login' && this.$route.name !== 'register'
    },
	showAuth() {
		return this.$route.name !== 'login' && this.$route.name !== 'register'
	}
  }
}
</script>

<template>
  <div class="app">
    <div class="container py-3" v-if="shouldShowSidebar">
      <div class="row">
        <div class="col-3">
          <app-sidebar></app-sidebar>
        </div>
        <div class="col-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <router-view v-if="!showAuth"></router-view>
  </div>
</template>

<style>
  body {
    background-color: #e3e3e3;
  }
</style>
