import React from 'react'
// import { Link } from 'react-router-dom'
import './StoriesSetion.css'


const StoriesSection:React.FC = () => {
  return (
    <>
    <div className="support-heading">
            <h3>Love and support</h3>
        </div>
        <div className="separator-support"></div>

        <div id="story-heading">
            <div className="story-heading-container">

                <h3>Thank you so much for choosing Urban Decor</h3> 
                <h3 className="sub-heading">it means a lot to serve you.</h3>
                {/* <Link className="button" to="">See Stories</Link> */}
            </div>            
        </div>
    </>
  )
}

export default StoriesSection