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
        const response = await axios.get(`/api/product/`);
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
      {loading ? (
        <>
        <div style={{ width: '100%', height: 0, paddingBottom: '100%', position: 'relative' }}>
          <iframe
            src="https://giphy.com/embed/gu9XBXiz60HlO5p9Nz"
            width="100%"
            height="100%"
            style={{ position: 'absolute' }}
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
        <p>
          <a href="https://giphy.com/gifs/loading-johnlukecom-johnlukeloading-gu9XBXiz60HlO5p9Nz">via GIPHY</a>
        </p>
        </>
      ) : products.length === 0 ? (
        <div>No products available.</div>
      ) : (

      <div className="section1">
        <div className="part1" style={{width:'30vw'}}> 
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
        </div>
        <div className="part2" style={{width:'30vw'}}>
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
        </div>
        <div className="part1" style={{width:'30vw'}}>
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
        </div>
      </div>
      )}
    </div>
  )
}

export default ProductSection