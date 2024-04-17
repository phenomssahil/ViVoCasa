import { ProductData } from "../types/interfaces";

export interface CartItems{
  product:ProductData
  quantity:number
}

export class ShoppingCart{
  private static items:CartItems[] = [];

  public static addItem(product:ProductData,quantity:number=1):CartItems[]{
    const existingItem = this.items.find(item => item.product._id === product._id);

    if(existingItem){
      existingItem.quantity += quantity;
      return this.items
    }
    else{
      this.items.push({product, quantity})
      return this.items
    }
  }

  public static removeItem(product:ProductData):void{
    this.items = this.items.filter(item => item.product._id !== product._id)
  }

  public static updateItemQuantity(product:ProductData, quantity:number):void{
    const item = this.items.find(item => item.product._id === product._id);
    if(item){
      item.quantity = quantity;
    }
  }

  public static saveCartToLocalStorage(cart:CartItems[]):void{
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  public static getCartFromLocalStorage():CartItems[] | null{
    const cartJSON = localStorage.getItem('shoppingCart');
    if (cartJSON) {
      return JSON.parse(cartJSON);
    }
    return null;
  }

  public static getItems():CartItems[]{
    return this.items;
  }

  public static getTotal():number{
    const cartItems = this.getCartFromLocalStorage();
    if(!cartItems){
      return 0;
    }
    return cartItems.reduce((total,items) => total + items.product.price*items.quantity,0)
  }
}