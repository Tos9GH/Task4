var menu = require('node-menu')
var Table = require('cli-table')
const { SHA3 } = require('sha3')
var secureRandom = require('secure-random')
const data = {
  1: 'rock',
  2: 'paper',
  3: 'scissor',
  4: 'spock',
  5: 'lizard',
  11: 'Draw!',
  12: 'You win!',
  13: 'You win!',
  14: 'You lose!',
  15: 'You lose!',
  22: 'Draw!',
  23: 'You win!',
  24: 'You win!',
  25: 'You lose!',
  21: 'You lose!',
  33: 'Draw!',
  34: 'You win!',
  35: 'You win!',
  31: 'You lose!',
  32: 'You lose!',
  44: 'Draw!',
  45: 'You win!',
  41: 'You win!',
  42: 'You lose!',
  43: 'You lose!',
  55: 'Draw!',
  51: 'You win!',
  52: 'You win!',
  53: 'You lose!',
  54: 'You lose!',
}
let c = 0
let n = 0
let Key = null
data['key'] = 'value'
const userInput = process.argv.slice(2)
let cChoise
const table = new Table({
  chars: {
    top: '═',
    'top-mid': '╤',
    'top-left': '╔',
    'top-right': '╗',
    bottom: '═',
    'bottom-mid': '╧',
    'bottom-left': '╚',
    'bottom-right': '╝',
    left: '║',
    'left-mid': '╟',
    mid: '─',
    'mid-mid': '┼',
    right: '║',
    'right-mid': '╢',
    middle: '│',
  },
})

table.push(
  [' ', 'rock', 'paper', 'scissor', 'spock', 'lizard'],
  ['rock', 'draw', 'win', 'win', 'lose', 'lose'],
  ['paper', 'lose', 'draw', 'win', 'win', 'lose'],
  ['scissor', 'lose', 'lose', 'draw', 'win', 'win'],
  ['spock', 'win', 'lose', 'lose', 'draw', 'win'],
  ['lizard', 'win', 'win', 'lose', 'lose', 'draw']
)

function inputValidation() {
  let unique = () => new Set(userInput).size !== userInput.length

  if (userInput.length < 1 || userInput.length % 2 === 0 || unique() === true) {
    console.log(
      'Your choice should not have repetitions and be even. Correct entry 1 2 3 or 1 2 3 4 5'
    )
  } else {
    getRandom(1, 5)
    menu.disableDefaultPrompt()
    menu.customHeader(function () {
      process.stdout.write('\nGame menu\n')
      const hash = new SHA3(256)
      hash.update(Key.concat(cChoise))
      hash.digest('hex')
      keyPC = hash.digest('hex')
      console.log(keyPC)
    })
    userInput.forEach(() => {
      c++
      menu.addItem(data[userInput[c - 1]], function () {
        const prompt = require('prompt-sync')()
        const input = prompt('Please confirm your choice ')
        if (input == '') {
          console.log('You have not repeated your choice, please try again')
          return
        } else game(userInput[input - 1], getRandom(1, 5))
      })
    })
    menu.addItem('HELP', function () {
      console.log(table.toString())
    })
    menu.start()
    return
  }
}

function getRandom(min, max) {
  cChoise = Math.floor(Math.random() * (max - min + 1)) + min
  let secureRandomKey = secureRandom.randomBuffer(256)
  const hash = new SHA3(256)
  hash.update(secureRandomKey)
  hash.digest('hex')
  Key = hash.digest('hex')
}

inputValidation()

function game(pChoise) {
  n++
  console.log('Your choice: ' + data[pChoise])
  console.log('Сomputer selection ' + data[cChoise])
  console.log(data[pChoise.toString() + cChoise.toString()])
  console.log(Key)
}
