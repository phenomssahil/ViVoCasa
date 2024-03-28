import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import livinRoomIcon from '../../assets/living room-icon.png'
import bedroomIcon from '../../assets/bedroom-icon.png'
import diningIcon from '../../assets/dining-icon.png'
import outdoorIcon from '../../assets/outdoor-icon.png'
import './RoomNavbar.css'

const RoomNavbar:React.FC = () => {
    const navigate = useNavigate();
    const handleClick = (room:string) => {
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/rooms/${room}`)
    }
  return (
    <div id='room-nav'>
        <div className="navbar">
            <div className="icon" onClick={()=>handleClick('living room')}>
                <Link to="/rooms/living room">
                    <img src={livinRoomIcon} alt="living room-icon" />
                </Link>
                <p>Living Room</p>
            </div>

            <div className="icon" onClick={()=>handleClick('bedroom')}>
                <Link to="/rooms/bedroom">
                    <img src={bedroomIcon} alt="bed-icon" />
                </Link>
                <p>Bedroom</p>
            </div>
            
            <div className="icon" onClick={()=>handleClick('dining room')}>
                <Link to="/rooms/dining room">
                    <img src={diningIcon} alt="dining table-icon" />
                </Link>
                <p>Dining Room</p>
            </div>

            <div className="icon" onClick={()=>handleClick('outdoor')}>
                <Link to="/rooms/outdoor">
                    <img src={outdoorIcon} alt="outdoor-icon" />
                </Link>
                <p>Outdoor</p>
            </div>
        </div>
    </div>
  )
}

export default RoomNavbar