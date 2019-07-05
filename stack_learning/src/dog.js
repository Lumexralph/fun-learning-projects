// @flow
// flow-disable-next-line

class Dog {
  name: string
  constructor(name: string) {
    this.name = name
  }

  talk() {
    return `We are going to make it, ${this.name}`
  }
}

export default Dog
