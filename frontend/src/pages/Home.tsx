import HeaderSection from "../sections/homePage/headerSection/HeaderSection";
import CategorySection from "../sections/homePage/categorySection/CategorySection";
import SubHeading from "../sections/homePage/subHeadingSection/SubHeading";
import ProductSection from "../sections/homePage/productSection/ProductSection";
import StoriesSection from "../sections/homePage/storiesSection/StoriesSection";
import Footer from "../components/footer/Footer";
import { useState } from "react";
import Navbar from "../components/navbar/Navbar";

const Home: React.FC = () => {
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  
    return(
        <>
        <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
        <HeaderSection/>
        <CategorySection/>
        <SubHeading/>
        <ProductSection/>
        <StoriesSection/>
        <Footer/>
        </>
    )
}
export default Home;