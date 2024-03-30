import React from 'react'
import logo from '../../../assets/letter logo (1).png'
import './HeaderSection.css'

const HeaderSection:React.FC = () => {
  return (
    <div id='checkout-header'>
        <div className="nav">
          <a href='/'>
            <img className='cursor-pointer' src={logo} alt="logo" />
          </a>
          <a href='/shop'>
            <p className='cursor-pointer'>continue shopping</p>
          </a>
        </div>
          <h1 className="heading">checkout</h1>

    </div>
  )
}

export default HeaderSection