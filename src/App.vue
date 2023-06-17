<script>
import AppSidebar from './components/AppSidebar.vue';
import {RouterView} from 'vue-router'
// import AppRegister from './components/AppRegister.vue';
// import AppEnter from './components/AppEnter.vue';


export default {
	components: {
		AppSidebar,
		RouterView
		// AppRegister
		// AppEnter
	}
};
</script>

<template>
	<div class="app">
		<!-- <app-header></app-header> -->

		<div class="container py-3">
			<div class="row">
				<div class="col-3">
					<app-sidebar></app-sidebar>
				</div>
				<div class="col-9">
					<router-view></router-view>
				</div>
			</div>
		</div>
		<!-- <app-register></app-register> -->
		<!-- <app-enter></app-enter> -->
	</div>
</template>

<style>
	body {
		background-color: #e3e3e3;
	}
</style>