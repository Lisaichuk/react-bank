// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

// ================================================================

router.get('/', (req, res) => {
  const users = User.getList()
  res.json(users)
})

// ================================================================

// Підключіть файли роутів
const user = require('./user')
// Підключіть інші файли роутів, якщо є
// const user = require('./user')

// Об'єднайте файли роутів за потреби
router.use('/', user)
// Використовуйте інші файли роутів, якщо є

// Експортуємо глобальний роутер
module.exports = router
