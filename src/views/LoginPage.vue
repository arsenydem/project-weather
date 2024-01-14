<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isLogin: false,
            password: '',
            password2: '',
            login: '',
            list: [],
            isSucsses: false,
            spanLogin: 'Вход выполнен успешно!',
            red: false
        }
    },
    mounted() {
        this.start();
    },
    methods: {
        async start() {
            let response = await axios.post('/pass');
            if (response.status == 200) {
                this.password2 = response.data.password;
                let response2 = await axios.post('/location', {
                    password: response.data.password
                });
                try {
                    let response3 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${response2.data}&units=metric&APPID=5e9c3ab76c29a2f9888cbecd1fada726`);
                    this.list = response3.data;
                    this.spanLogin = 'Вход выполнен успешно!';
                    this.red = false;
                    this.isSucsses = true;
                    setTimeout(() => {
                        this.isLogin = true;
                        this.isSucsses = false;
                    }, 1000)

                } catch (err) {
                    console.log(1)
                    this.undefin = true;
                    setTimeout(() => {
                        this.undefin = false;
                    }, 3000)
                }
            } else if (response.status == 201) {
                this.isLogin = false;
            }
        },
        async clickLogin() {
            let response = await axios.post('/logi', {
                login: this.login,
                password: this.password
            });
            if (response.status == 200) {
                this.password2 = response.data.password;
                let response2 = await axios.post('/location', {
                    password: response.data.password
                });
                try {
                    let response3 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${response2.data}&units=metric&APPID=5e9c3ab76c29a2f9888cbecd1fada726`);
                    this.list = response3.data;
                    this.spanLogin = 'Вход выполнен успешно!';
                    this.red = false;
                    this.isSucsses = true;
                    setTimeout(() => {
                        this.isLogin = true;
                        this.isSucsses = false;
                    }, 1000)

                } catch (err) {
                    console.log(1)
                    this.undefin = true;
                    setTimeout(() => {
                        this.undefin = false;
                    }, 3000)
                }
            } else {
                this.isLogin = false
                this.spanLogin = 'Неправельный логин или пароль!'
                this.red = true;
                this.isSucsses = true;
                setTimeout(() => {
                    this.isSucsses = false;
                }, 3000)
            }
            this.password = '';
            this.login = '';
        },
        async exitLogin() {
            this.isLogin = false;
            await axios.post('/exit', {
                password: this.password2
            });
        }
    }

}

</script>

<template>
    <div class="us-page card mt-4 p-3">
        <div v-if="!isLogin" class="login-box">
            <div class="row">
                <div class="col-12 m-2">
                    <input type="text" v-model="login" placeholder="Логин" class="input-login">
                </div>
            </div>
            <div class="row">
                <div class="col-12 m-2">
                    <input type="text" v-model="password" placeholder="Пароль" class="input-login">
                </div>
            </div>
            <div class="div-button mt-2">
                <button @click="clickLogin" class="login-button">
                    Войти
                </button>
            </div>
            <div v-if="isSucsses" class="success-text2">
                <span :class="{
                    'text5': !red,
                    'text6': red
                }">{{ spanLogin }}</span>
            </div>
        </div>

        <div v-if="isLogin" class="day-box">
            <div class="row">
                <div class="col-12 m-2 div-text">
                    <span class="text">Город: {{ this.list.name }}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 m-2 div-text">
                    <span class="text">Температура: +{{ this.list.main.temp }}℃</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 m-2 div-text">
                    <span class="text">Ощущается как: +{{ this.list.main.feels_like }}℃</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 m-2 div-text">
                    <span class="text">Минимальная температура: +{{ this.list.main.temp_min }}℃</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 m-2 div-text">
                    <span class="text">Максимальная температура: +{{ this.list.main.temp_max }}℃</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 m-2 div-text">
                    <span class="text">Влажность воздуха: {{ this.list.main.humidity }}%</span>
                </div>
            </div>
        </div>
        <div v-if="isLogin" class="exit">
            <button @click="exitLogin" class="navbar-but2">
                Выйти
            </button>
        </div>
    </div>
</template>


<style>
.us-page {
    display: flex;
    gap: 40px;
    height: 630px;
    align-items: center;
    justify-content: center;
    font-family: Arial;
    flex-wrap: wrap;
    background-color: rgba(5, 8, 54, 0);
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.3);
    position: relative;
}

.navbar-but2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    height: 80px;
    background: cornflowerblue;
    box-shadow: 0 -200px 100px -120px rgb(220, 20, 197) inset;
    border-radius: 30px;
    border: 10px solid white;
    animation: background 8s infinite alternate;
    border: 1px solid black;
    position: absolute;
    top: 35px;
    right: 40px;
    border-radius: 10px;
    font-size: 30px;
    cursor: pointer;
    font-weight: bold;
}

.exit {
    width: 50px;
}

.text5 {
    width: 100%;
    padding: 7px;
    text-align: center;
    background: linear-gradient(to bottom, #00cc66 0%, #ffff99 100%);
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
}

.text6 {
    width: 100%;
    padding: 7px;
    text-align: center;
    background: linear-gradient(to top, #ff3399 0%, #cc3300 100%);
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
}

.success-text2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    margin-top: 15px;
    margin-left: 90px;
}

.div-text {
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.div-text2 {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
}

.text {
    width: 80%;
    padding: 18px;
    margin: 40px;
    margin-right: 50px;
    text-align: center;
    background: linear-gradient(to bottom, #ffcc99 0%, #ffccff 100%);
    border-radius: 10px;
    font-weight: bold;
}

.div-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-button {
    background: linear-gradient(to bottom, #ff9966 0%, #cc9900 100%);
    border: none;
    width: 35%;
    height: 80px;
    margin: 10px 20px;
    border-radius: 10px;
    font-size: 30px;
    cursor: pointer;
    font-weight: bold;
}

.input-login {
    width: 600px;
    height: 70px;
    margin: 30px 34px 5px 34px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ced4da;
    outline: none;
    border-radius: 10px;
}

.input-login:focus {
    border-bottom: 4px solid #9f2e0b;
    border-bottom-left-radius: 0%;
    border-bottom-right-radius: 0%;
}

.input-login::placeholder {
    font-size: 20px;
}

.login-box {
    width: 700px;
    height: 450px;
    background: rgb(255, 111, 0);
    box-shadow: 0 -200px 100px -120px rgb(136, 4, 30) inset;
    border-radius: 30px;
    border: 8px solid white;
    animation: background 6s infinite alternate;
}

.day-box {
    width: 1200px;
    height: 560px;
    background: rgb(255, 111, 0);
    box-shadow: 0 -200px 100px -120px rgb(136, 4, 30) inset;
    border-radius: 30px;
    border: 8px solid white;
    animation: background 6s infinite alternate;
}

@keyframes background {
    50% {
        background: rgb(183, 235, 135);
        box-shadow: 0 -200px 100px -100px rgb(205, 153, 50) inset;
    }
}
</style>