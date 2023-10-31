import { ProdutosProps } from "../home"
import {useState, useEffect, useContext} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { api } from "../../services/api"
import {BsCartPlus} from 'react-icons/bs'
import { CartContext } from "../../contexts/CartContext"
import toast from 'react-hot-toast'
 
export function ProductDetail(){
   const {id} = useParams();
   const [produto, setProduto] = useState<ProdutosProps>();
   const {addItemCart} = useContext(CartContext);
   const navigate = useNavigate();

   useEffect(() => {
    async function getProduct() {
        const response = await api.get(`/products/${id}`)
        setProduto(response.data);
    }
    getProduct();
   }, [id])

   function handleAddItem(produto: ProdutosProps){
    toast.success("Produto adicionado no carrinho", {
        style:{
            borderRadius: 10,
            background: "#121212",
            color: "#FFF"
        }
    })
    addItemCart(produto)

    navigate("/cart")
   }


return(
    <div>
        <main className="w-full max-w-7xl px-4 mx-auto my-6">
            {produto && (
                <section className="w-full">
                    <div className="flex flex-col lg:flex-row">
                        <img 
                        className="flex-1 w-full max-h-72 object-contain"
                        src={produto?.cover}
                        alt={produto?.title}/>
                    <div className="flex-1">
                        <p className="font-bold text-2xl mt-4 mb-2">{produto?.title}</p>
                        <p className="my-4">{produto?.description}</p>
                        <strong className="text-zinc-700/90 text-xl">{produto?.price.toLocaleString("pt-BR",{
                            style:"currency",
                            currency: "BRL"
                        })}</strong>
                        <button className=" bg-zinc-900 p-1 rounded ml-3" onClick={() => handleAddItem(produto)}>
                            <BsCartPlus size={20} color="#FFF" /> 
                        </button>
                    </div>

                    </div>
                </section>
            )}
        </main>
    </div>
)
}