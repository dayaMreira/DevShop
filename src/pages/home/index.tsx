import {BsCartPlus} from 'react-icons/bs'
import { useEffect, useState, useContext } from 'react'

import { api } from '../../services/api'
import { CartContext } from '../../contexts/CartContext';
import {Link} from 'react-router-dom'

import toast from 'react-hot-toast';

export interface ProdutosProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}


export function Home(){
    const {addItemCart} = useContext(CartContext)
    const [produto, setProduto] = useState<ProdutosProps[]>([])
    useEffect(() => {
        async function getProducts() {
            const response = await api.get("/products")

            setProduto(response.data)
        }

        getProducts();
    }, [])

function handleAddCartItem(produto: ProdutosProps){
    toast.success("Produto adicionado ao carrinho",{
        style:{
            borderRadius:10,
            background: "#121212",
            color: "#FFF"
        }
    })
    addItemCart(produto);
}

    return(
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto">
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
                {produto.map((produto) => (
                    <section key={produto.id} className="w-full">

                    <Link to={`/products/${produto.id}`}>
                    <img className='w-full rounded-lg max-h-70 mb-2'
                    src={produto.cover}
                    alt={produto.title}
                    />
                    <p className='font-medium mt-1 mb-2'>{produto.title}</p>
                    </Link>

                    <div className='flex gap-3 items-center'>
                        <strong className='text-zinc-700/90'>
                            {produto.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </strong>
                        <button className='bg-zinc-900 p-1 rounded' onClick={ () => handleAddCartItem(produto)}>
                            <BsCartPlus size={20} color="#FFF"/>
                        </button>
                    </div>
                </section>

                ))}               
            </div>
            </main>
        </div>
    )
}