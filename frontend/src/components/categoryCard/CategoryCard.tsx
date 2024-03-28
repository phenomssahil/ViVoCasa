import React from 'react'
import dot from "../../assets/full-stop.png"
import { Link } from 'react-router-dom'
import nextArrow from "../../assets/next.png"
import "./CategoryCard.css"

interface categoryCardProps{
  link:string,
  category: string,
  imgUrl: string,
  bgcolor: string
}

const CategoryCard:React.FC<categoryCardProps> = ({link,category,imgUrl,bgcolor="#fff"}) => {
  return (
    <>
      <div id="card" >
        <img data-scroll data-scroll-speed="0.8" src={imgUrl} alt="category image"/>
        
        <Link to={link} className="shop-category" data-scroll data-scroll-speed="-2"  style={{backgroundColor:bgcolor}}>
          <img className="point" src={dot} alt="" />
          <h6>shop</h6>
          <h3>{category}</h3>
          <img src={nextArrow} alt=""/>
        </Link>
      </div>
    </>
  )
}

export default CategoryCard