import Brands from "./Pages/Brands"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Zoomol from "./Pages/Zoomol";
import NotFound from "./Pages/NotFound";


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Zoomol />
    },
    {
      path: "/brand/:name",
      element: <Brands />,
    }, 

    {
      path: "/brand/zoomol",
      element: <Zoomol />,
    }, 
    {
      path: "*",
      element: <NotFound />,
    },

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
