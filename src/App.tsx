import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { Layout } from "./components/layout";
import { ProductDetail } from "./pages/product";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element:<Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/products/:id",
        element: <ProductDetail/>
      }

    ]
  }
])

export {router}