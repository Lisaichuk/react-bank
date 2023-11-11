class Confirm {
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode()
    this.email = data
  }

  static generateCode = () => {
    return Math.floor(Math.random() * 9000) + 100000
  }

  static create = (data) => {
    const confirmation = new Confirm(data)
    this.#list.push(confirmation)

    // setTimeout(() => {
    //   this.delete(confirmation.code)
    // }, 24 * 60 * 60 * 1000) // видалити через 24 години у мілісекундах

    console.log(this.#list)
  }

  static delete = (code) => {
    const length = this.#list.length

    this.#list = this.#list.filter(
      (item) => item.code !== code,
    )

    return length > this.#list.length
  }

  static getData = (code) => {
    const codeNumber = Number(code)
    const obj = this.#list.find(
      (item) => item.code === codeNumber,
    )

    return obj ? obj.email : null
  }

  static getList = () => {
    return this.#list
  }
}

module.exports = { Confirm }
