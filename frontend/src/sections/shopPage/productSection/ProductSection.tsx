import React, { useEffect, useState } from 'react' 
import './ProductSection.css'
import CustomProductCard from '../../../components/productCard/CustomProductCard'
import axios from 'axios'
import { ProductData } from '../../../types/interfaces'

const ProductSection:React.FC = () => {
  const [products,setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchData = async() => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/product/`);
        const fetchProducts = response.data;
        setProducts(fetchProducts);
        setLoading(false);
      } 
      catch (error) {
        console.log("error fetching products",error);  
      }
    }
    fetchData();
  },[])
  return (
    <div id='shop-products'>
            <div className="section1">
        {products.length>0 && (<div className="part1" style={{width:'30vw'}}> 
          {products.slice(0,5).map((product,index) => (
            <div className='productCard' key={index}>
              <CustomProductCard 
                imgUrl={product.thumbnailImageUrl} 
                productId={"/shop/" + product._id} 
                size={{height:'40vw',width:'30vw'}}
              />
              <div className="details">
                <p>{product.title}</p>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </div>)}
        {products.length>0 && (<div className="part2" style={{width:'30vw'}}>
          {products.slice(5,12).map((product,index) => (
            <div className="productCard" key={index}>
              <CustomProductCard 
                imgUrl={product.thumbnailImageUrl} 
                productId={"/shop/"+product._id} 
                size={{height:'30vw',width:'30vw'}}
                />
              <div className="details">
                <p>{product.title}</p>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </div>)}
        {products.length>0 && (<div className="part1" style={{width:'30vw'}}>
          {products.slice(12,17).map((product,index) => (
            <div className="productCard" key={index}>
              <CustomProductCard 
              
              imgUrl={product.thumbnailImageUrl} 
              productId={"/shop/" + product._id} 
              size={{height:'40vw',width:'30vw'}}
              />
              <div className="details">
                <p>{product.title}</p>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </div>)}
      </div>
    </div>
  )
}

export default ProductSection