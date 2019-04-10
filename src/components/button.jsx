import React from 'react'
import Users from './uielements/svg/users'

const Button = props => {
  const { data, click, disabled, id } = props
  return (
    <div
      className={
        'card-detail ' + (data.id === id ? ' selected ' : ' ') +
        (disabled ? (data.id === id ? '' : ' disableBtn ') : ' ') +
        data.className
      }
      onClick={() => (disabled ? null : click(data))}>
      <h4 className='data-title'>{data.type}</h4>
      <div className='range-data'>
        <span>{data.score} x</span>
        <div className='counting'>
          <Users />
          <span>0</span>
        </div>
      </div>
    </div>
  )
}

export default Button
