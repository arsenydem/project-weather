<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isClick: false,
            loc: '',
            nowloc: '',
            isLogin: false,
            password2: '',
            isChange: false,
            timeoutId: null,
            red: false,
            change: 'Местоположение обновлено!'
        }
    },
    mounted() {
        /*setInterval(() => {
            this.nowLocation()
        }, 1000)*/
    },
    methods: {
        async nowLocation() {
            let response = await axios.post('/pass');
            if (response.status == 200) {
                this.isLogin = true;
                this.password2 = response.data.password;
                let response2 = await axios.post('/location', {
                    password: this.password2
                });
                this.nowloc = response2.data;
            } else {
                this.nowloc = 'Войдите в систему!';
            }
        },
        async newLocation() {
            try {
                await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.loc}&units=metric&APPID=b680bf750e78a3ec5b662c0c044e5658`);
                await axios.post('/loca', {
                    password: this.password2,
                    location: this.loc
                });
                this.loc = '';
                this.red = false;
                this.change = 'Местоположение обновлено!';
                this.isChange = true;
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId)
                }
                this.timeoutId = setTimeout(() => {
                    this.isChange = false;
                }, 5000)

            } catch (err) {
                this.change = 'Введите корректное название города!';
                this.red = true;
                this.isChange = true;
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId)
                }
                this.timeoutId = setTimeout(() => {
                    this.isChange = false;
                }, 5000)
                this.loc = ''
            }
        },
        noDigits(loc) {
            if ("1234567890.,?/|-=+".indexOf(loc) != -1)
                this.loc = '';
        }
    }
}
</script>

<template>
    <div class="us-page card mt-4 p-3">
        <div class="day-box">
            <div class="row">
                <div class="col-12 m-2 div-text">
                    <span class="text2">Текущее местоположение: {{ this.nowloc }}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-3 m-2 div-text2">
                    <span class="text3">Изменить местоположение: </span>
                </div>
                <div class="col-9">
                    <input v-if="isLogin" v-model="loc" type="text" @input="noDigits(loc)" placeholder="Латиницей"
                        class="input-login2">
                    <div v-if="!isLogin" class="w-text">
                        <p class="pt-3">Войдите в систему!</p>
                    </div>
                </div>
            </div>
            <div class="div-button2">
                <button @click="newLocation" :class="{
                    'd-none': !isLogin
                }" class="login-button2">
                    Сохранить
                </button>
            </div>
            <div v-if="isChange" class="success-text">
                <span :class="{
                    'text4': !red,
                    'text8': red
                }">{{ change }}</span>
            </div>
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
}

.text8 {
    width: 100%;
    padding: 7px;
    text-align: center;
    background: linear-gradient(to top, #ff3399 0%, #cc3300 100%);
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
}

.input-login2::placeholder {
    font-size: 20px;
}

.w-text {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #cc9900 0%, #ccff33 100%);
    border: none;
    width: 35%;
    height: 90px;
    margin-left: 450px;
    border-radius: 10px;
    font-size: 30px;
    font-weight: bold;
}

.success-text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin-top: 15px;
    margin-left: 293px;
}

.div-button2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
}

.login-button2 {
    background: linear-gradient(to bottom, #cc9900 0%, #ccff33 100%);
    border: none;
    width: 35%;
    height: 100px;
    margin: 10px 20px;
    border-radius: 10px;
    font-size: 30px;
    cursor: pointer;
    font-weight: bold;

}

.input-login2 {
    width: 674px;
    height: 90px;
    margin-left: 401px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ced4da;
    outline: none;
    border-radius: 0px 10px 10px 0px;
}

.input-login2:focus {
    border-bottom: 4px solid #9f2e0b;
    border-bottom-right-radius: 0%;
}

p {
    color: black;
    font-weight: 500;
}

.text-warning {
    padding-left: 20px;
    width: 350px;
    font-size: 25px;
    background: linear-gradient(to bottom, #ff6600 0%, #ff9933 100%);
    border-radius: 10px;
    margin-left: 18px;
    margin-top: 90px;
}

.div-text2 {
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.div-text {
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.text2 {
    width: 80%;
    padding: 35px;
    margin: 40px;
    padding-left: 50px;
    margin-top: 100px;
    text-align: start;
    background: linear-gradient(to bottom, #ffcc99 0%, #ffccff 100%);
    border-radius: 10px;
    font-weight: bold;
    font-size: 25px;
}

.text3 {
    width: 100%;
    padding: 7px;
    margin-left: 235px;
    padding-left: 50px;
    margin-top: 180px;
    text-align: start;
    background: linear-gradient(to bottom, #ffcc99 0%, #ffccff 100%);
    border-radius: 10px 0px 0px 10px;
    font-weight: bold;
    font-size: 25px;
}

.text4 {
    width: 100%;
    padding: 7px;
    text-align: center;
    background: linear-gradient(to bottom, #00cc66 0%, #ffff99 100%);
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
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

.login-box2 {
    width: 400px;
    height: 250px;
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
        background: skyblue;
        box-shadow: 0 -200px 100px -100px yellowgreen inset;
    }
}


@keyframes p {
    from {
        --p: 0
    }
}
</style>