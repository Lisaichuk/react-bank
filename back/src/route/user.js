const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { Notification } = require('../class/notification')

// ================================================================

router.get('/signup', function (req, res) {
  const users = Session.getList()
  res.json(users)
})

// ================================================================

router.post('/signup', function (req, res) {
  try {
    const { email, password } = req.body
    // console.log(email, password)

    if (!email || !password) {
      return res.status(400).json({
        message: 'You must fill in all empty fields',
      })
    }

    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: `User with this email already exists.`,
      })
    }

    const newUser = User.create({ email, password })
    const session = Session.create(newUser)
    Confirm.create(newUser.email)

    return res.status(200).json({
      token: session.token,
      user: session.user,
      isLogged: true,
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Error registering user',
    })
  }
})

// ================================================================

router.get('/signup-confirm', function (req, res) {
  const users = Confirm.getList()
  res.json(users)
})

// ================================================================

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

  if (!code || !token) {
    return res.status(400).json({
      message: 'You must fill in all empty fields',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'Error. You cannot log in to your account',
      })
    }

    const email = Confirm.getData(code)

    if (!email) {
      return res.status(400).json({
        message: 'Code is not valid',
      })
    }

    if (email !== session.user.email) {
      return res
        .status(400)
        .json({ message: 'Error. Code is wrong' })
    }

    session.isLogged = true
    session.user.isConfirm = true

    Notification.create(session.token, 'LOGIN')

    return res.status(200).json({
      message: 'You have confirmed your account',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.post('/recovery', function (req, res) {
  const { email } = req.body

  console.log(email)

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    Confirm.create(email)

    return res.status(200).json({
      message: 'Код для відновлення паролю відправлено',
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.get('/recovery', function (req, res) {
  return res.render('recovery', {
    name: 'recovery',
    component: ['backButton', 'heading', 'field', 'button'],
    title: 'Recovery page',
    data: {},
  })
})

// ================================================================

module.exports = router
