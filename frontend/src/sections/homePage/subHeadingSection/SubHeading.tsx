import React from 'react'
import arrow from '../../../assets/arrow1.png'
import { Link } from 'react-router-dom'
import './SubHeading.css'

const SubHeading: React.FC = () => {
  return (
    <div id="subHeading">
      <h1>Transforming Homes, Rediscover the Magic in Your Space.</h1>
      <div className="sub-heading">
        <p>At VIVO CASA, our mission is to elevate more than just your living space, To rebuild self-worth and independence. </p>
        <p>With every purchase from VIVO CASA, you're not just enhancing your home, but rewriting your own stories.</p>
        <Link className="shop-now" to="/shop">
          <p>SHOP NOW </p>
          <img src={arrow} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default SubHeading