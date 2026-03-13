import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { Outlet, Navigate} from "react-router-dom";


export function RootHome(){
    return <Outlet></Outlet>
}