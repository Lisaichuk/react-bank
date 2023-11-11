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
      message:
        'The user has been created successfully. A code has been sent to your email to confirm your account.',
      token: session.token,
      user: session.user,
      isLogged: true,
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating user',
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
    console.log(session)

    if (!session) {
      return res.status(400).json({
        message: 'Error. You cannot log in to your account',
      })
    }

    const email = Confirm.getData(code)
    console.log(email)

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

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'The user with this email is not registered.',
      })
    }

    user.isConfirm = true
    session.user.isConfirm = true

    // Notification.create(session.token, 'LOGIN')

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

router.get('/signin', function (req, res) {
  const users = Confirm.getList()
  res.json(users)
})

// ================================================================

router.post('/signin', function (req, res) {
  try {
    const { email, password } = req.body

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'No such user found',
      })
    }

    if (!email || !password) {
      return res.status(400).json({
        message: 'You must fill in all empty fields',
      })
    }

    if (password !== user.password) {
      return res.status(400).json({
        message: 'Incorrect password',
      })
    }

    const session = Session.create(user)
    Confirm.create(user.email)

    session.isLogged = true
    session.user.isConfirm = true

    console.log(session)

    return res.status(200).json({
      message: 'Login successful',
      token: session.token,
      user: session.user,
    })

    // Notification.create(session.token, 'LOGIN')
  } catch (error) {
    return res.status(400).json({
      message: 'Account login error.',
    })
  }
})

// ================================================================

router.post('/recovery', function (req, res) {
  try {
    const { email, token } = req.body

    if (!email || !token) {
      return res.status(400).json({
        message: 'You must fill in all empty fields',
      })
    }

    const session = Session.get(token)
    // console.log(session)

    if (!session) {
      return res.status(400).json({
        message: 'Invalid session',
      })
    }

    const elem = Confirm.getData(code)
    console.log(elem)

    if (!elem) {
      return res.status(400).json({
        message: 'Email is not valid',
      })
    }

    if (elem !== session.user.email) {
      return res
        .status(400)
        .json({ message: 'Error. Email is wrong' })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'The user with this email is not found.',
      })
    }

    Confirm.create(user.email)

    return res.status(200).json({
      message:
        'The password recovery code was successfully sent tu your email.',
      token: session.token,
      user: user,
      isLogged: true,
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Error sending code.',
    })
  }
})

// ================================================================

router.get('/recovery-confirm', function (req, res) {
  const users = Confirm.getList()
  res.json(users)
})

// ================================================================

router.post('/recovery-confirm', function (req, res) {
  const { code, password, token } = req.body

  if (!code || !password || !token) {
    return res.status(400).json({
      message: 'You must fill in all empty fields',
    })
  }

  try {
    const session = Session.get(token)
    // console.log(session)

    if (!session) {
      return res.status(400).json({
        message: 'Invalid session',
      })
    }

    const elemByCode = Confirm.getData(Number(code))

    if (!elemByCode) {
      return res
        .status(400)
        .json({ message: 'There is no such code.' })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'The user with this email is not registered.',
      })
    }

    // if (user.password === password) {
    //   return res.status(400).json({
    //     message: 'Error. Create a new password',
    //   })
    // }

    user.password = password

    return res.status(200).json({
      message: 'Password successfully changed',
      token: session.token,
      user: session.user,
      isLogged: true,
      isConfirm: true,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// ================================================================

router.post('/logout', function (req, res) {
  const { token } = req.body

  console.log(token)

  if (!token) {
    return res.status(400).json({
      message: 'You must fill in all empty fields',
    })
  }

  try {
    //   Notification.create(token, 'LOG_OUT')

    return res.status(200).json({
      message:
        'You have successfully logged out of your account',
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Error logged out from your account',
    })
  }
})
module.exports = router
