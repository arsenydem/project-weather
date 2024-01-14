<script>

// Компоненты
import NavBar from './components/NavBar.vue';
import { RouterView } from 'vue-router'

// Главная страница
export default {
	components: {
		NavBar,
		RouterView
	}
};


</script>

<template>
	<div class="app">
		<div class="row justify-content-center">
			<div class="">
				<!-- Шапка -->
				<div class="shapka">
					<nav-bar></nav-bar>
				</div>
				<!-- Меняющаяся часть -->
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<style>
.app {
	padding: 35px;
	background: linear-gradient(to bottom, #ccff33 0%, #996600 100%);
}
</style>
