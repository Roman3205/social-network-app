<script>
import AppSidebar from './components/AppSidebar.vue';
import {RouterView} from 'vue-router'

export default {
	components: {
		AppSidebar,
		RouterView
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
	</div>
</template>

<style>
body {
	background-color: #e3e3e3;
}
</style>