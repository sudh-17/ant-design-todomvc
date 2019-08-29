function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function createUUID() {
  let arr = []
  for (let i = 0; i < 8; i++) {
    arr.push(S4())
  }
  arr.splice(2, 0, '-')
  arr.splice(4, 0, '-')
  arr.splice(6, 0, '-')
  arr.splice(8, 0, '-')
  return arr.join('')
}

export { createUUID }
