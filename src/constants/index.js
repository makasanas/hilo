const buttons = {
  red: {
    type: 'red',
    className: 'red',
    score: 2.00,
    id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  },
  black: {
    type: 'black',
    className: 'black',
    score: 2.00,
    id: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
  },
  twoNine: {
    type: '2 to 9',
    className: '',
    score: 1.50,
    id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 17, 18, 19, 20, 21, 22]
  },
  jqka: {
    type: 'J Q K A',
    className: '',
    score: 3.00,
    id: [10, 11, 12, 13, 23, 24, 25, 26]
  },
  ka: {
    type: 'K A',
    className: '',
    score: 6.00,
    id: [12, 13, 25, 26]
  },
  a: {
    type: 'A',
    className: 'red',
    score: 12.00,
    id: [13, 26]
  },
  joker: {
    type: 'JOKER',
    className: 'joker',
    score: 24.00,
    id: [27]
  },
  low: {
    type: 'LOW',
    className: 'low',
  },
  high: {
    type: 'HIGH',
    className: 'high',
  }
}

const cards = [

  {
    type: 'red',
    name: '2',
    id: 1
  },
  {
    type: 'red',
    name: '3',
    id: 2
  },
  {
    type: 'red',
    name: '4',
    id: 3
  },
  {
    type: 'red',
    name: '5',
    id: 4
  },
  {
    type: 'red',
    name: '6',
    id: 5
  },
  {
    type: 'red',
    name: '7',
    id: 6
  },
  {
    type: 'red',
    name: '8',
    id: 7
  },
  {
    type: 'red',
    name: '9',
    id: 8
  },
  {
    type: 'red',
    name: '10',
    id: 9
  },
  {
    type: 'red',
    name: 'J',
    id: 10
  },
  {
    type: 'red',
    name: 'Q',
    id: 11
  },
  {
    type: 'red',
    name: 'K',
    id: 12
  },
  {
    type: 'red',
    name: 'A',
    id: 13
  },
  {
    type: 'black',
    name: '2',
    id: 14
  },
  {
    type: 'black',
    name: '3',
    id: 15
  },
  {
    type: 'black',
    name: '4',
    id: 16
  },
  {
    type: 'black',
    name: '5',
    id: 17
  },
  {
    type: 'black',
    name: '6',
    id: 18
  },
  {
    type: 'black',
    name: '7',
    id: 19
  },
  {
    type: 'black',
    name: '8',
    id: 20
  },
  {
    type: 'black',
    name: '9',
    id: 21
  },
  {
    type: 'black',
    name: '10',
    id: 22
  },
  {
    type: 'black',
    name: 'J',
    id: 23
  },
  {
    type: 'black',
    name: 'Q',
    id: 24
  },
  {
    type: 'black',
    name: 'K',
    id: 25
  },
  {
    type: 'black',
    name: 'A',
    id: 26
  },
  {
    type: 'joker',
    name: 'JOKER',
    id: 27
  },
]

export { buttons, cards }
