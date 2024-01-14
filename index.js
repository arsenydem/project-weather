let express = require(`express`);
let app = express();
let port = 3006;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/final-project');

let userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true
    },
    password: {
        type: Number,
        unique: true
    },
    isNow: Boolean
});
let User = mongoose.model('user', userSchema);

let locationSchema = new mongoose.Schema({
    passwordLocation: {
        type: Number,
        unique: true
    },
    location: String,
});

let Location = mongoose.model('location', locationSchema);

app.post('/logi', async function (req, res) {
    let login = req.body.login;
    let password = req.body.password;
    let users = await User.find();
    let k = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].password == password) {
            if (users[i].login == login) {
                users[i].isNow = true;
                await users[i].save()
                res.send(users[i])
                
            } else {
                users[i].isNow = false;
                await users[i].save();
                k+= 1;
            }
        } else {
            users[i].isNow = false;
            await users[i].save()
            k+= 1;
        }
    }
    if (k == users.length) {
        res.send(201)
    }
});

app.post('/location', async function (req, res) {
    let password = req.body.password;
    let locatio = await Location.findOne({ passwordLocation: password });
    res.send(locatio.location)
});

app.post('/exit', async function (req, res) {
    let password = req.body.password;
    let user = await User.findOne({password: password});
    user.isNow = false;
    await user.save()
    res.send(200)
});

app.post('/pass', async function (req, res) {
    let user = await User.findOne({ isNow: true });
    if (user) {
        res.send(user)
    } else {
        res.send(201)
    }
});

app.post('/loca', async function (req, res) {
    let password = req.body.password;
    let locat = req.body.location;
    let locatio = await Location.findOne({ passwordLocation: password });
    locatio.location = locat;
    await locatio.save()
    res.send(200)
});