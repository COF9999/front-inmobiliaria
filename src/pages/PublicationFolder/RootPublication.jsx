import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Outlet, Navigate} from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

export function ContainerPublication(){
   
    const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: verifySessionAPI, // Tu función de axios.get("/api/auth/verify")
    retry: false,
    staleTime: 600000 // 10 min de sesión "fresca"
    });

    if (isLoading) return <p>Verificando sesión...</p>;

    // Si hubo error o no hay datos de usuario, mandamos a login
    if (isError || !user) {
    return <Navigate to="/login" />;
    }

  return <Outlet />;
}

