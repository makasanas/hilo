import React, { Component, PureComponent, useState, useEffect } from 'react'
import { buttons, cards } from '../constants'
import { isEmpty } from 'ramda'
import Users from './uielements/svg/users'
import Button from './button'
import Card from './card'
import uuid from 'uuid/v4';

export default class Main extends Component {
  state = {
    totalMoney: 1000,
    betAmmount: 0,
    bet: {},
    card: {},
    disable: true,
    updateTimer: false,
    error: false,
    leave: false,
    cardReveal: false,
    flip: false,
    cardsArray: [
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
      }
    ],
    low: {
      lowRange: " ",
      lowProbability: "",
      lowMulti: " ",
      id: []
    },
    high: {
      highRange: " ",
      highProbability: "",
      highMulti: " ",
      id: []
    }

  }

  setBet = bet => {
    this.setState({ bet })
  }

  // clear all bet and all
  clearAll = () => { }

  componentDidMount = () => {
    this.changeCard()
  }

  desablePredection = () => {
    this.setState({ disable: true })
  }
  addBet(n) {
    let betAmmount = this.state.betAmmount + n;
    if (this.state.totalMoney >= betAmmount) {
      this.setState({ betAmmount: betAmmount })
      this.setState({ error: false })
    }
    else {
      this.setState({ error: true })
    }
  }
  multiBet(n) {
    let betAmmount = this.state.betAmmount * n;
    if (this.state.totalMoney >= betAmmount) {
      this.setState({ betAmmount: betAmmount })
      this.setState({ error: false })
    }
    else {
      this.setState({ error: true })
    }
  }

  inputChange(e) {
    if (this.state.totalMoney >= e.target.value) {
      this.setState({ betAmmount: e.target.value })
      this.setState({ error: false })
    }
    else {
      this.setState({ error: true })
    }
  }
  inputClear() {
    if (this.state.totalMoney >= 100) {
      this.setState({ betAmmount: 100 })
    } else {
      this.setState({ betAmmount: 0 })
    }
  }

  changeCard = () => {
    this.setState({ cardReveal: true })

    // Generating new card
    const cardId = generateNewCard();
    const card = cards.find(card => card.id === cardId)

    let cardsArray = this.state.cardsArray;

    cardsArray[0].leave = true;
    cardsArray[0].reveal = true;

    cardsArray[1].type = card.type;
    cardsArray[1].name = card.name;
    cardsArray[1].id = card.id;

    setTimeout(() => {
      cardsArray[1].reveal = true;
    }, 1);

    this.setState({
      cardsArray: cardsArray
    })

    // calculate the betting ammount
    let { betAmmount, bet, totalMoney } = { ...this.state }
    if (!isEmpty(bet) && betAmmount !== 0) {
      let score = null
      if (bet.id.includes(card.id)) {
        // win
        score = totalMoney + betAmmount * bet.score
      } else {
        //lose
        score = totalMoney - betAmmount
      }
      this.setState({ totalMoney: score })
    }

    this.inputClear();

    this.changeRange(card.name);
    // disable all buttons & clear prediction
    this.setState({ card, disable: false, bet: {} })


    setTimeout(() => {
      cardsArray.shift();
      cardsArray.push({
        type: 'red',
        name: '6',
        id: 5
      })
      this.setState({ cardsArray: cardsArray });
      cardsArray[0].reveal = false;
      console.log(cardsArray);
    }, 200);
  }



  changeRange(cardNumber) {
    const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    let low = true;
    const lowArray = [];
    const highArray = [];
    const lowID = [];
    const highID = [];

    for (let i = 0; i < 13; i++) {
      if (cardNumber != cards[i]) {
        if (low) {
          lowArray.push(cards[i])
          lowID.push(i + 1);
          lowID.push(i + 14);
        } else {
          highArray.push(cards[i])
          highID.push(i + 1);
          highID.push(i + 14);
        }
      } else {
        low = false;
      }
    }


    let lowRange = lowArray.length ? lowArray.length != 1 ? `${lowArray[0]}-${lowArray[lowArray.length - 1]}` : `${lowArray[0]}` : '';
    let highRange = highArray.length ? highArray.length != 1 ? ` ${highArray[0]}-${highArray[highArray.length - 1]}` : `${highArray[0]}` : '';
    let lowProbability = lowArray.length ? `${Math.round(lowArray.length * 7.40)}%` : '';
    let highProbability = highArray.length ? `${Math.round(highArray.length * 7.40)}%` : '';
    let lowMulti = lowArray.length ? `${Math.round(13 / lowArray.length * 100) / 100}x` : '';
    let highMulti = highArray.length ? `${Math.round(13 / highArray.length * 100) / 100}x` : '';

    buttons.low.id = lowID;
    buttons.low.score = lowArray.length ? Math.round(13 / lowArray.length * 100) / 100 : 0;
    buttons.high.id = highID;
    buttons.high.score = highArray.length ? Math.round(13 / highArray.length * 100) / 100 : 0;
    this.setState({ lowRange: lowRange, highRange: highRange, lowProbability: lowProbability, highProbability: highProbability, lowMulti: lowMulti, highMulti: highMulti });
  }

  render() {
    console.log(this.state.card)
    console.log(this.state.leave)
    const { disable, error, highRange, lowRange, lowProbability, highProbability, lowMulti, highMulti, cardsArray, leave, cardReveal } = this.state
    return (
      <section>
        <div className='container'>
          <div className='timer-hooks'>
            <div className='money-field'> Money: {this.state.totalMoney} </div>
            <TimerHooks
              changeCard={this.changeCard}
              desablePredection={this.desablePredection}
            />
          </div>
          <div className='card-wrapper'>
            <div className='card-content left-content'>
              <div
                className={
                  'higher-content' + (buttons.high.id === this.state.bet.id ? ' selected ' : ' ') +
                  (disable ? (buttons.high.id === this.state.bet.id ? '' : ' disableBtn ') : ' ')
                }
                onClick={() => (disable ? null : this.setBet(buttons.high))}>
                <h4 className='data-title'>HI</h4>
                <div className='range-data'>
                  <span>{highProbability}</span>
                  <span className='range'>{highRange}</span>
                  <span>{highMulti}</span>
                </div>
                <span className='top-shade' />
                {/* <div className='arrow'>
                  <svg
                    width='84px'
                    height='58px'
                    viewBox='0 0 84 58'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    xlink='http://www.w3.org/1999/xlink'>
                    <g
                      id='Page-1'
                      stroke='none'
                      strokeWidth='1'
                      fill='none'
                      fillRule='evenodd'>
                      <g
                        id='Artboard'
                        transform='translate(-148.000000, -532.000000)'
                        fill='#97A8AF'>
                        <path
                          d='M193.174425,534.140555 L231.067477,583.566274 C232.411586,585.319461 232.079964,587.830316 230.326777,589.174425 C229.62843,589.709825 228.773019,590 227.893051,590 L152.106949,590 C149.89781,590 148.106949,588.209139 148.106949,586 C148.106949,585.120033 148.397123,584.264622 148.932523,583.566274 L186.825575,534.140555 C188.169684,532.387368 190.680539,532.055746 192.433726,533.399856 C192.712027,533.61322 192.961062,533.862254 193.174425,534.140555 Z'
                          id='arrow'
                        />
                      </g>
                    </g>
                  </svg>
                </div> */}
                <div className='counting'>
                  <svg
                    width='16px'
                    height='15px'
                    viewBox='0 0 16 15'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    xlink='http://www.w3.org/1999/xlink'>
                    <g
                      id='Page-1'
                      stroke='none'
                      strokeWidth='1'
                      fill='none'
                      fillRule='evenodd'>
                      <g
                        id='Artboard'
                        transform='translate(-291.000000, -572.000000)'
                        fill='#607D8B'
                        fillRule='nonzero'>
                        <g
                          id='users'
                          transform='translate(291.000000, 572.000000)'>
                          <path
                            d='M8.42661749,0.698939402 C8.92715259,0.26249168 9.57069832,4.26325641e-14 10.2727713,4.26325641e-14 C11.867914,4.26325641e-14 13.1609273,1.35503348 13.1609273,3.0266881 C13.1609273,4.69830863 11.867914,6.0533762 10.2727713,6.0533762 C9.57069534,6.0533762 8.92714713,5.7908823 8.42661113,5.35443125 C9.06331878,4.79924371 9.46861959,3.96257837 9.46861959,3.0266881 C9.46861959,2.09078185 9.06332148,1.25412126 8.42661749,0.698939403 Z M8.70360974,14.1170703 C10.3069802,13.8869853 11.2166328,13.4176744 11.2900176,13.3788629 L11.4832815,13.2760616 L11.503649,13.2762662 L11.503649,10.1347066 C11.503649,8.21981192 10.1710432,6.62467231 8.42667556,6.31437418 C8.62855473,6.27846528 8.83594951,6.259763 9.04743291,6.259763 L11.4982724,6.259763 C13.537076,6.259763 15.1959567,7.99821288 15.1959567,10.1347066 L15.1959567,13.2762662 L15.1755891,13.2760616 L14.9823253,13.3788629 C14.8847824,13.4304511 13.309747,14.2426324 10.5919821,14.2426324 C10.0132405,14.2426324 9.38271162,14.2058558 8.70360974,14.1170703 Z'
                            id='Combined-Shape'
                          />
                          <path
                            d='M2.03506194,3.0266881 C2.03506194,1.35503348 3.32807525,4.26325641e-14 4.92321789,4.26325641e-14 C6.51836053,4.26325641e-14 7.81137384,1.35503348 7.81137384,3.0266881 C7.81137384,4.69830863 6.51836053,6.0533762 4.92321789,6.0533762 C3.32807525,6.0533762 2.03506194,4.69834272 2.03506194,3.0266881 Z M6.14871899,6.259763 L3.69787947,6.259763 C1.65891321,6.259763 0,7.99821288 0,10.1347066 L0,13.2764708 L0.0076784968,13.3254676 L0.214607478,13.3931494 C2.16013034,14.03004 3.85096136,14.2426324 5.24242862,14.2426324 C7.96019352,14.2426324 9.53522891,13.4304511 9.63277184,13.3788629 L9.8260357,13.2760616 L9.84640324,13.2762662 L9.84640324,10.1347066 C9.84640324,7.99821288 8.18752257,6.259763 6.14871899,6.259763 Z'
                            id='Shape'
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span>0</span>
                </div>
              </div>
              <div className='bet-content'>
                <span className='bet-title'>Your bet</span>
                <div className='input-field'>
                  <input
                    value={this.state.betAmmount}
                    onChange={e => this.inputChange(e)}

                  />
                  <div className='clear-btn' onClick={() => this.inputClear()}>CLEAR</div>
                </div>
                {error && <p className="error">You can't bet more then your blance</p>}

                <div className='btn-wrapper'>
                  <button className='bet-btn' onClick={() => this.addBet(1000)}>+1K</button>
                  <button className='bet-btn' onClick={() => this.addBet(10000)}>+10K</button>
                  <button className='bet-btn' onClick={() => this.multiBet(1 / 2)}>1/2</button>
                  <button className='bet-btn' onClick={() => this.multiBet(2)}>x2</button>
                </div>
              </div>
              <div
                className={
                  'higher-content lower-content' + (buttons.low.id === this.state.bet.id ? ' selected ' : ' ') +
                  (disable ? (buttons.low.id === this.state.bet.id ? '' : ' disableBtn ') : ' ')
                }
                onClick={() => (disable ? null : this.setBet(buttons.low))}>
                <p className='data-title'>LO</p>
                <div className='range-data'>
                  <span>{lowProbability}</span>
                  <span className='range'>{lowRange}</span>
                  <span>{lowMulti}</span>
                </div>
                <span className='top-shade' />
                <div className='counting'>
                  <svg
                    width='16px'
                    height='15px'
                    viewBox='0 0 16 15'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    xlink='http://www.w3.org/1999/xlink'>
                    <g
                      id='Page-1'
                      stroke='none'
                      strokeWidth='1'
                      fill='none'
                      fillRule='evenodd'>
                      <g
                        id='Artboard'
                        transform='translate(-291.000000, -572.000000)'
                        fill='#607D8B'
                        fillRule='nonzero'>
                        <g
                          id='users'
                          transform='translate(291.000000, 572.000000)'>
                          <path
                            d='M8.42661749,0.698939402 C8.92715259,0.26249168 9.57069832,4.26325641e-14 10.2727713,4.26325641e-14 C11.867914,4.26325641e-14 13.1609273,1.35503348 13.1609273,3.0266881 C13.1609273,4.69830863 11.867914,6.0533762 10.2727713,6.0533762 C9.57069534,6.0533762 8.92714713,5.7908823 8.42661113,5.35443125 C9.06331878,4.79924371 9.46861959,3.96257837 9.46861959,3.0266881 C9.46861959,2.09078185 9.06332148,1.25412126 8.42661749,0.698939403 Z M8.70360974,14.1170703 C10.3069802,13.8869853 11.2166328,13.4176744 11.2900176,13.3788629 L11.4832815,13.2760616 L11.503649,13.2762662 L11.503649,10.1347066 C11.503649,8.21981192 10.1710432,6.62467231 8.42667556,6.31437418 C8.62855473,6.27846528 8.83594951,6.259763 9.04743291,6.259763 L11.4982724,6.259763 C13.537076,6.259763 15.1959567,7.99821288 15.1959567,10.1347066 L15.1959567,13.2762662 L15.1755891,13.2760616 L14.9823253,13.3788629 C14.8847824,13.4304511 13.309747,14.2426324 10.5919821,14.2426324 C10.0132405,14.2426324 9.38271162,14.2058558 8.70360974,14.1170703 Z'
                            id='Combined-Shape'
                          />
                          <path
                            d='M2.03506194,3.0266881 C2.03506194,1.35503348 3.32807525,4.26325641e-14 4.92321789,4.26325641e-14 C6.51836053,4.26325641e-14 7.81137384,1.35503348 7.81137384,3.0266881 C7.81137384,4.69830863 6.51836053,6.0533762 4.92321789,6.0533762 C3.32807525,6.0533762 2.03506194,4.69834272 2.03506194,3.0266881 Z M6.14871899,6.259763 L3.69787947,6.259763 C1.65891321,6.259763 0,7.99821288 0,10.1347066 L0,13.2764708 L0.0076784968,13.3254676 L0.214607478,13.3931494 C2.16013034,14.03004 3.85096136,14.2426324 5.24242862,14.2426324 C7.96019352,14.2426324 9.53522891,13.4304511 9.63277184,13.3788629 L9.8260357,13.2760616 L9.84640324,13.2762662 L9.84640324,10.1347066 C9.84640324,7.99821288 8.18752257,6.259763 6.14871899,6.259763 Z'
                            id='Shape'
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span>0</span>
                </div>
                {/* <div className='arrow'>
                  <svg
                    width='84px'
                    height='58px'
                    viewBox='0 0 84 58'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    xlink='http://www.w3.org/1999/xlink'>
                    <g
                      id='Page-1'
                      stroke='none'
                      strokeWidth='1'
                      fill='none'
                      fillRule='evenodd'>
                      <g
                        id='Artboard'
                        transform='translate(-148.000000, -532.000000)'
                        fill='#97A8AF'>
                        <path
                          d='M193.174425,534.140555 L231.067477,583.566274 C232.411586,585.319461 232.079964,587.830316 230.326777,589.174425 C229.62843,589.709825 228.773019,590 227.893051,590 L152.106949,590 C149.89781,590 148.106949,588.209139 148.106949,586 C148.106949,585.120033 148.397123,584.264622 148.932523,583.566274 L186.825575,534.140555 C188.169684,532.387368 190.680539,532.055746 192.433726,533.399856 C192.712027,533.61322 192.961062,533.862254 193.174425,534.140555 Z'
                          id='arrow'
                        />
                      </g>
                    </g>
                  </svg>
                </div> */}
              </div>
            </div>
            <div className='card-content center-content' >
              {cardsArray.map((card, index) => (
                <Card key={uuid()} {...card} />
              ))}
              {/* <Card {...this.state.card} /> */}
              {/* <div className='backCard'></div>
              <div className='backCard n1'></div>
              <div className='backCard n2'></div>
              <div className='backCard n3'></div>
              <div className='backCard n4'></div> */}
            </div>

            {/* <div style={{ width: '80%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <TimerHooks
                    changeCard={this.changeCard}
                    desablePredection={this.desablePredection}
                  />
                </div>
                <div style={{ color: this.state.card.type }}>
                  card:{this.state.card.name}
                </div>
                <div> prediction: {this.state.bet.type} </div>
                <div> money: {this.state.totalMoney} </div>
                <div>
                  amount :
                  <input
                    style={{ width: '25px' }}
                    value={this.state.betAmmount}
                    onChange={e =>
                      this.setState({ betAmmount: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', paddingTop: '50px' }}>
                {options.map(option => (
                  <span key={option.type} style={{ padding: '10px' }}>
                    <button
                      onClick={() => this.setBet(option)}
                      disabled={this.state.disable}>
                      {option.type}
                    </button>
                    <div>x{option.score}</div>
                  </span>
                ))}
              </div>
            </div>
          
           */}
            <div className='card-content right-content'>
              <Button
                data={buttons.red}
                click={this.setBet}
                disabled={disable}
                id={this.state.bet.id}
              />
              <Button
                data={buttons.black}
                click={this.setBet}
                disabled={disable}
                id={this.state.bet.id}
              />
              <Button
                data={buttons.twoNine}
                click={this.setBet}
                id={this.state.bet.id}
                disabled={disable}
              />
              <Button
                data={buttons.jqka}
                id={this.state.bet.id}
                click={this.setBet}
                disabled={disable}
              />
              <div className='card-mask'>
                <Button
                  id={this.state.bet.id}
                  data={buttons.ka}
                  click={this.setBet}
                  disabled={disable}
                />
                <Button
                  id={this.state.bet.id}
                  data={buttons.a}
                  click={this.setBet}
                  disabled={disable}
                />
              </div>
              <Button
                data={buttons.joker}
                id={this.state.bet.id}
                click={this.setBet}
                disabled={disable}
              />
            </div>
          </div>
        </div>
      </section >
    )
  }
}

class Timer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
    this.interval = null
  }

  componentDidUpdate = () => {
    // console.log(generateNewCard())
    if (this.state.time === 10) {
      this.clearInterval()
      this.startBreak(this.startInterval)
    }
  }

  clearInterval = () => {
    clearInterval(this.interval)
  }

  startBreak = callback => {
    this.props.changeCard()
    setTimeout(() => {
      callback()
    }, 5000)
  }

  startInterval = () => {
    this.setState({ time: 0 })
    this.interval = setInterval(() => {
      let time = ++this.state.time
      this.setState({ time })
      this.forceUpdate()
    }, 1000)
  }

  componentWillReceiveProps = props => {
    console.log(props)
  }

  componentDidMount = () => {
    this.startInterval()
  }

  componentWillUnmount = () => {
    this.clearInterval()
  }

  render() {
    return <div>{this.state.time}</div>
  }
}

const generateNewCard = () => Math.floor(Math.random() * 27) + 1

const TimerHooks = ({ changeCard, desablePredection }) => {
  const [time, setTime] = useState(1)
  const [init, setInit] = useState(true)
  let [interval, setIntervalHooks] = useState(null)
  const [msg, setMsg] = useState(false)
  const startInterval = () => {
    let interval = setInterval(() => {
      setTime(preTime => preTime + 1)
    }, 1000)
    setIntervalHooks(interval)
  }
  const clearIntervalFn = () => {
    setTime(1)
    clearInterval(interval)
  }

  const startBreak = callback => {
    changeCard()
    setMsg(true)
    setTimeout(() => {
      setMsg(false)
      desablePredection()
      callback()
    }, 5000)
  }
  useEffect(
    () => {
      if (init) {
        startInterval()
        setInit(false)
      }
      if (time === 11) {
        clearIntervalFn()
        startBreak(startInterval)
      }
    },
    [time]
  )

  return (
    <div className='timer-field' >
      <span>timer:</span>{msg ? 'GOOD LUCK!' : <div className='count'><div className='count-number'>{time}</div><div className='count-animation'></div></div>}
    </div>
  )
}
