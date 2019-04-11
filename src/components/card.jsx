import React from 'react'



const Card = props => (
  <div className={props.leave && props.reveal ? 'flip-box-inner leave' :
    props.reveal ? 'flip-box-inner revealed' : props.leave ? 'flip-box-inner leave' : 'flip-box-inner'}>
    <div className={'card ' + props.type}>
      <div className='card-number top-number '>
        <span> {props.name} </span>
      </div>
      <div className='card-img'>
        <svg
          className='gd-icon'
          xmlns='http://www.w3.org/2000/svg'
          xlink='http://www.w3.org/1999/xlink'
          viewBox='0 0 590 590'>
          <defs>
            <rect id='SVGID_1_' x='.3' width='90' height='90' />
          </defs>
          <path
            className='st0'
            d='M548.2,295c0,97-54.7,181.2-134.9,223.6v-87.1V315.2l50.6-50.6v-67.4v-33.7h-50.6h-8.4v33.7h-67.4v-33.7h-84.3 v33.7h-67.4v-33.7h-8.4h-50.6v33.7v67.4l50.6,50.6v116.3v87.1C97.1,476.3,42.4,392,42.4,295c0-139.7,113.2-252.9,252.9-252.9 C434.9,42.1,548.2,155.4,548.2,295 M253.1,338.8c0-23.3,18.9-42.1,42.1-42.1c23.3,0,42.1,18.9,42.1,42.1v84.3h-84.3V338.8 L253.1,338.8z M590.3,295c0-162.9-132.1-295-295-295C132.4,0,0.3,132.1,0.3,295s132.1,295,295,295C458.2,590,590.3,457.9,590.3,295'
          />
        </svg>
      </div>
      <div className='card-number bottom-number'>
        <span> {props.name} </span>
      </div>
    </div>
    <div className='cardbackside'>
    </div>
  </div>
)

export default Card
