import Brands from "./Pages/Brands"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Zoomol from "./Pages/Zoomol";


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

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
