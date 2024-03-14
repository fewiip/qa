import { FunctionComponent } from "react"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { LoginPage } from "../modules/auth/pages/LoginPage"

// const privateRoutes = [
//   {
//     path: '/',
//     element: <HomePage/>
//   }
// ]

const publicRoutes = [
  {
    path: '/login',
    element: <LoginPage />
  }
]

const AllRoutes: FunctionComponent = () => {
  
  return useRoutes([
    ...publicRoutes
  ])
}

export const Router = () => {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  )
}

// const array1 = ["arroz", "feijao"];
// const array2 = [...array1];//spread 