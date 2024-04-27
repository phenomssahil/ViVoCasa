import axios from 'axios'
import React from 'react'
import orderIcon from '../../assets/package.png'
import settingsIcon from '../../assets/settings.png'
import signOutIcon from '../../assets/log-out.png'


export interface ProfileNavbarProps{
    sectionSelected:string,
    setSectionSelected:React.Dispatch<React.SetStateAction<string>>
    subSectionSelected:string,
    setSubSectionSelected:React.Dispatch<React.SetStateAction<string>>
}

const ProfileNavbar:React.FC<ProfileNavbarProps> = ({sectionSelected,setSectionSelected,setSubSectionSelected}) => {
    function handleSectionClick(section:string){
        setSectionSelected(section)
        setSubSectionSelected('details')
    }
    function handleSubSectionClick(subSection:string){
        setSubSectionSelected(subSection);
    }
    function handleSignOut(){
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/logout`)
        .then((response)=>{
            if(response.status === 200){
                localStorage.clear();
                window.location.href = '/login'
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div id='profile-nav' className='flex flex-col gap-[1.5vw] justify-center items-start pl-[2vw] 
     w-[17vw] h-[30vw] ring-1 ring-gray-200 rounded-[15px]'>

        <div className="flex items-center gap-[1vw]">
            <img src={orderIcon} className='w-[2vw] h-[2vw]' alt="" />
            <button className='text-[1vw] font-helvetica uppercase' onClick={()=>handleSectionClick('orders')}>Orders</button>
        </div>
        <div className="">
            <div className="flex items-center gap-[1vw]">
                <img src={settingsIcon} className='w-[2vw] h-[2vw]' alt="" />
                <button className='text-[1vw] font-helvetica uppercase' onClick={()=>handleSectionClick('setting')}>Account Setting</button>
            </div>

            {sectionSelected==='setting' && (
                <div className="ml-[3vw] ">
                    <p className='font-helvetica text-[0.8vw] cursor-pointer my-[5px]' onClick={()=>handleSubSectionClick('details')}>My Details</p>
                    <p className='font-helvetica text-[0.8vw] cursor-pointer my-[5px]' onClick={()=>handleSubSectionClick('address')}>My Address</p>
                    <p className='font-helvetica text-[0.8vw] cursor-pointer my-[5px]' onClick={()=>handleSubSectionClick('payment')}>Payment Methods</p>
                    <p className='font-helvetica text-[0.8vw] cursor-pointer my-[5px]' onClick={()=>handleSubSectionClick('password')}>Change Password</p>
                </div>
            )}
        </div>
        <div className="flex items-center gap-[1vw]">
            <img src={signOutIcon} className='w-[2vw] h-[2vw]' alt="" />
            <button className='text-[1vw] font-helvetica uppercase' onClick={handleSignOut}>Sign Out</button>
        </div>
    </div>
  )
}

export default ProfileNavbar