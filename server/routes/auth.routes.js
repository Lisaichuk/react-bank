let Router = require('express').Router
let router = new Router();
let jwt = require("jsonwebtoken")
let config = require("config")
let bcrypt = require('bcrypt')
let {check, validationResult} = require('express-validator')
const authMiddleware = require("../middleware/auth.middleware")
const moment = require('moment')

const users = [];
let id = 0;
let transactionId = 0;
router.post('/signup', [check("email", "uncorrect email").isEmail(), check("password", "uncorrect password").isLength({
    min: 3, max: 12
})], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "validation error", errors})
        }
        const {email, password} = req.body;
        const candidate = users.find(user => user.email === email)

        if (candidate) {
            return res.status(400).json({message: "user already exists"})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const confirmationCode = Math.floor(Math.random() * (1000000 - 100000) + 100000)

        const newUser = {
            email,
            password: hashPassword,
            isConfirmed: false,
            confirmationCode,
            id: id += 1,
            userData: {
                balance: 0, notifications: [], transactions: [],
            }
        }
        const token = jwt.sign({id: newUser.id}, config.get("secretKey"))
        newUser.token = token;
        users.push(newUser)
        return res.status(200).json({
            user: newUser
        })
    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})

router.post('/confirm', async (req, res) => {
    try {
        const {email, code} = req.body;
        const user = users.find(user => user.email === email);
        if (user.confirmationCode !== Number(code)) {
            return res.status(400).json({message: "Invalid Code"})
        } else {
            // const token = jwt.sign({id: user.id}, config.get("secretKey"))
            // user.token = token;
            user.isConfirmed = true;
        }
        return res.status(200).json({
            user
        })

    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(404).json({message: "user not found"})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({message: "incorrect password"})
        }
        let time = moment().format();
        user.userData.notifications.unshift({type: 'Login', time})
        return res.status(200).json({
            user
        })
    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})
router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = users.find(user => user.id === req.user.id);
        return res.status(200).json({
            user
        })
    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})
router.post('/receive', authMiddleware, async (req, res) => {
    try {
        const {sum, paymentSystem} = req.body;
        const user = users.find(user => user.id === req.user.id);
        if (sum < 1) {
            return res.status(400).json({message: "sum can't be less than 1$"})
        }
        user.userData.balance += +sum;
        let time = moment().format();
        const id = transactionId += 1;
        user.userData.notifications.unshift({type: "Refill", time})
        user.userData.transactions.unshift({type: "Refill", time, sum: `+$${sum}`, paymentSystem,transactionId})
        return res.status(200).json({
            user
        })

    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})
let emailToRecover = ''
router.post('/recovery', async (req, res) => {
    try {
        const {email} = req.body;
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(404).json({message: "user not found"})
        }
        const recoveryCode = Math.floor(Math.random() * (1000000 - 100000) + 100000);
        user.recoveryCode = recoveryCode;
        emailToRecover = user.email;
        let time = moment().format();
        user.userData.notifications.unshift({type: "Recovery", time})
        return res.status(200).json({
            recoveryCode
        })


    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})
router.post('/recovery-confirm', async (req, res) => {
    try {
        const {password, code} = req.body;
        const user = users.find(user => user.email === emailToRecover);
        if (!user) {
            return res.status(404).json({message: "user not found"})
        }

        if (user.recoveryCode !== Number(code)) {
            return res.status(404).json({message: "Invalid code"})
        }
        const hashPassword = await bcrypt.hash(password, 8);
        user.password = hashPassword;
        return res.status(200).json({
            user
        })


    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})
router.post('/send', authMiddleware, async (req, res) => {
    try {
        const {sum, email} = req.body;
        const user = users.find(user => user.id === req.user.id);
        const receiver = users.find(user => user.email === email);
        if (receiver === user) {
            return res.status(400).json({message: "cant send to yourself"})
        }
        if (!receiver) {
            return res.status(400).json({message: "no such user found"})
        }
        if (user.userData.balance < sum) {
            return res.status(400).json({message: "not enough funds"})
        }


        user.userData.balance = user.userData.balance - sum;
        receiver.userData.balance = receiver.userData.balance + +sum;
        let time = moment().format();
        user.userData.notifications.unshift({type: "Send", time})
        receiver.userData.notifications.unshift({type: "Refill", time})
        const id = transactionId += 1;
        user.userData.transactions.unshift({type: "Send", sum: `-$${sum}`, email, time,transactionId})
        receiver.userData.transactions.unshift({type: "Receive", sum: `+$${sum}`, email: user.email, time,transactionId})
        return res.status(200).json({
            user
        })

    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})
router.post('/changeEmail', authMiddleware, async (req, res) => {
    try {
        const {password, email} = req.body;
        const user = users.find(user => user.id === req.user.id);
        const emailIsBusy = users.find(user => user.email === email);
        if (!user) {
            return res.status(404).json({message: "user not found"})
        }
        if (emailIsBusy) {
            return res.status(400).json({message: "email is busy"})
        }
        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            return res.status(400).json({message: "incorrect password"})
        }

        user.email = email;
        let time = moment().format();
        user.userData.notifications.unshift({type: "EmailChange", time})
        return res.status(200).json({
            user
        })

    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})
router.post('/changePassword', authMiddleware, async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;
        const user = users.find(user => user.id === req.user.id);
        if (!user) {
            return res.status(404).json({message: "user not found"})
        }
        const isPassValid = bcrypt.compareSync(oldPassword, user.password);
        if (!isPassValid) {
            return res.status(400).json({message: "incorrect password"})
        }
        const hashPassword = await bcrypt.hash(newPassword, 8)
        user.password = hashPassword;
        let time = moment().format();
        user.userData.notifications.unshift({type: "PasswordChange", time})
        return res.status(200).json({
            user
        })

    } catch (e) {
        return res.status(400).json({message: `${e}`})
    }
})



module.exports = router;