import { FunctionComponent } from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useAuthStore } from "../modules/auth/stores/useAuthStore.hook";
import { RouteEnum } from "./router";

export const PrivateRoute : FunctionComponent<RouteProps> = () => {
  const { isLoggedIn } = useAuthStore()
  
  return isLoggedIn() ? <Outlet/> : <Navigate to={RouteEnum.LOGIN}/>
}