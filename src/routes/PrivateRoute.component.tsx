import { FunctionComponent } from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";

export const PrivateRoute : FunctionComponent<RouteProps> = () => {
  
  const isLoggedIn = localStorage.getItem('TOKEN')?.length
  
  return isLoggedIn ? <Outlet/> : <Navigate to='/login'/>
}