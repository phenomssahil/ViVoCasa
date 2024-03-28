import React from 'react'
import CustomProductCard from '../../../components/productCard/CustomProductCard';
import bedroomImg from '../../../assets/bedroom.png'
import livingRoomImg from '../../../assets/living room.jpg'
import diningRooImg from '../../../assets/dining room.jpg'
import outdoorImg from '../../../assets/outdoor.jpg'
import './RoomSection.css'

const RoomSection:React.FC = () => {
  
  return (
    <div id='room-section'>
        <div className="card living">
            <CustomProductCard 
                imgUrl={livingRoomImg}
                productId='/rooms/living room'
                size={{width:'50vw',height:'40vw'}}
            />

            <h1 className="heading">Living Room</h1>
        </div>
        <div className="card bedroom">
            <h1 className="heading">BedRoom</h1>

            <CustomProductCard 
                imgUrl={bedroomImg}
                productId='/rooms/bedroom'
                size={{width:'40vw',height:'40vw'}}
            />
        </div>
        <div className="card dining">
            <CustomProductCard 
                imgUrl={diningRooImg}
                productId='/rooms/dining room'
                size={{width:'50vw',height:'40vw'}}
            />

            <h1 className="heading">Dining Room</h1>

        </div>
        <div className="card outdoor">
            <h1 className="heading">Outdoor</h1>

            <CustomProductCard 
                imgUrl={outdoorImg}
                productId='/rooms/outdoor'
                size={{width:'40vw',height:'40vw'}}
            />
        </div>
    </div>
  )
}

export default RoomSection