import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import ProfileNavbar from "../components/navbar/ProfileNavbar";
import OrderSection from "../components/orderSection/OrderSection";
import SettingSection from "../components/settingSection/SettingSection";
import Cookies from "js-cookie";
const Profile: React.FC = () => {
    const [isCartUpdated,setIsCartUpdated] = useState(false);
    const [sectionSelected,setSectionSelected] = useState<string>('');
    const [subSectionSelected,setSubSectionSelected] = useState<string>('');
    const [editSelected,setEditSelected] = useState<string>('');

    useEffect(() => {
        var token = Cookies.get('token')
        if(!token) {
            window.location.href = '/login'
        }
    },[])
    return(
        <div className=" min-h-[100vh]">
        <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
        
        <div className="relative top-[15vw] left-[13vw] w-[80vw] flex gap-[2vw]">
            <ProfileNavbar 
                sectionSelected={sectionSelected} 
                setSectionSelected={setSectionSelected}
                subSectionSelected={subSectionSelected}
                setSubSectionSelected={setSubSectionSelected}
            />

            {sectionSelected==='' &&(
                <div className="flex justify-center pt-[10vw] w-[56vw] min-h-[30vw] rounded-[15px] ring-1 ring-gray-200 border-black">
                    <h1 className="font-futura text-[3vw] ">Welcome to Urban Decor</h1>
                </div>
            )}

            {sectionSelected==='orders' &&(
                <OrderSection
                    sectionSelected={sectionSelected} 
                    setSectionSelected={setSectionSelected}
                    subSectionSelected={subSectionSelected}
                    setSubSectionSelected={setSubSectionSelected} 
                />
            )}

            {sectionSelected==='setting' &&(
                <SettingSection
                    sectionSelected={sectionSelected} 
                    setSectionSelected={setSectionSelected}
                    subSectionSelected={subSectionSelected}
                    setSubSectionSelected={setSubSectionSelected} 
                    editSelected={editSelected}
                    setEditSelected={setEditSelected}
                />
            )}

        </div>
        </div>
        
    )
}
export default Profile;