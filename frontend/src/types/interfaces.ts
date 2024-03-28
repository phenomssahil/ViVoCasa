export interface ProductData{
    title: string,
    _id:string,
    category: string,
    room: string,
    description: string,
    price: number,
    thumbnailImageUrl: string,
    imageUrls:[string],
    color: string,
    material: string,
    additionalDetails:{
      assemblyRequired: string,
      
    },
    size:{
      width: number,
      height: number,
      length: number
    }
}
export interface ProductData extends Array<ProductData>{}

// export interface ProductCardData{
//   productId: string,
//   imageUrl: string,
//   name: string,
//   price:number
// }