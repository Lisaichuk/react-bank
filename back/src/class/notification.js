class Notification {
	static #list = []
	static #count = 1
  
	constructor(token, type) {
	  this.id = Notification.#count++
	  this.token = token
	  this.date = new Date().getTime()
	  this.type = type
	}
  
	static create = (token, type) => {
	  const userAction = new Notification(token, type)
	  this.#list.push(userAction)
  
	  return userAction
	}
  
	static getList = () => {
	  return this.#list
	}
  
	static getByToken = (token) => {
	  return this.#list.filter((elem) => elem.token === token)
	}
  }
  
  module.exports = { Notification }