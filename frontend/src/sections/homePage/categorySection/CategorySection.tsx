import React from 'react'
import CategoryCard from '../../../components/categoryCard/CategoryCard'
import livingRoomImg from '../../../assets/pexels-maksim-goncharenok-4352247.jpg'
import decorationImg from '../../../assets/pexels-karolina-grabowska-4207791.jpg'
import bedroomImg from '../../../assets/pexels-adrienne-andersen-2374959.jpg'

import "./CategorySection.css"

const CategorySection:React.FC = ()=> {
  return (
    <>
      <div className="category-heading">
          <h3>shop by category</h3>
      </div>
      <div className="separator-category"></div>

      <div id="category">
        <CategoryCard link="/rooms/living room" imgUrl={livingRoomImg} category="living room" bgcolor='#fdf2ed'/>
        <CategoryCard link="/category/decoration" imgUrl={decorationImg} category="decoration" bgcolor='#f1f2eb'/>
        <CategoryCard link="/rooms/bedroom" imgUrl={bedroomImg} category="bedroom" bgcolor='#DDF0C9'/>
      </div>
    </>
  )
}

export default CategorySection