<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {

        }
    },
    methods: {
        goLocation() {
            this.$router.push({
                name: 'location'
            })
        },
        goLogin() {
            this.$router.push({
                name: 'login'
            })
        },
    }
}
</script>
<template>
    <div class="top-navbar mb-3">
        <div class="logo ms-4">
            <img class="w-100" src="../assets/loon-icon.svg" alt="">
        </div>
        <button @click="goLogin" class="navbar-but">
            Сегодня
        </button>

        <button @click="goLocation" class="navbar-but">
            Изменить местоположение
        </button>
    </div>
</template>

<style>
.top-navbar {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    top: 0;
    background: linear-gradient(to bottom, #3366cc 0%, #ff9999 100%);
    border-radius: 20px;
}

.logo {
    width: 180px;
}
.navbar-but {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35%;
    height: 80px;
    background: gold;
    box-shadow: 0 -200px 100px -120px crimson inset;
    border-radius: 30px;
    border: 10px solid white;
    animation: background 8s infinite alternate;
    border: 1px solid black;
    margin: 30px 120px;
    border-radius: 10px;
    font-size: 30px;
    cursor: pointer;
    font-weight: bold;
}

@keyframes background {
  50% {
    background: skyblue;
    box-shadow: 0 -200px 100px -100px yellowgreen inset;
  }
}
</style>