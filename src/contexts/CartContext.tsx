import  { createContext, ReactNode, useState} from 'react'
import { ProdutosProps } from '../pages/home';


interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProdutosProps) => void;
    deletItemCart: (produto: CartProps) => void;
    total: string;
}

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({children} : CartProviderProps){

    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("")

function addItemCart (newItem: ProdutosProps){
    //add carrinho 
    //if ja existe
    const indexItem = cart.findIndex(item => item.id === newItem.id)

    if(indexItem !== -1){
        let cartList = cart;
        cartList[indexItem].amount = cartList[indexItem].amount + 1;

        cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

        setCart(cartList)
        totalCart(cartList)
        return;
    }

    let data = {
        ...newItem, 
        amount: 1,
        total: newItem.price
    }

    setCart(produto => [...produto, data])
    totalCart([...cart, data])

}

function deletItemCart (produto: CartProps){
    const indexItem = cart.findIndex(item => item.id === produto.id)

    if(cart[indexItem]?.amount > 1){
        //Diminuir apenas 1 amount
        let cartList = cart;

        cartList[indexItem].amount = cartList[indexItem].amount -1;
        cartList [indexItem].total = cartList[indexItem].total - cartList[indexItem].price

        setCart(cartList);
        totalCart(cartList)
        return;
     }

     const removeItem = cart.filter(item => item.id !== produto.id)
     setCart(removeItem);
     totalCart(removeItem)

}

function totalCart(items: CartProps[]){
    let myCart = items;
    let result = myCart.reduce((acc, obj) => {return acc + obj.total}, 0)
    const resultFormated = result.toLocaleString("pt-BR", {style:'currency', currency:"BRL"})
    setTotal(resultFormated);
}
 
return(
        <CartContext.Provider value={{
            cart, 
            cartAmount: cart.length,
            addItemCart,
            deletItemCart,
            total
         }}>
           { children }
        </CartContext.Provider>
    )
}

export default CartProvider;