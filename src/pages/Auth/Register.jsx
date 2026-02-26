import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider'; // Asegúrate de ajustar la ruta de importación
import "../css/register.css"
import {baseUrl} from "../../../hostConfig";


export const Register = () => {
  const nameUser = useRef()
  const usernameUser = useRef()
  const emailUser = useRef()
  const identificationUser = useRef()
  const passwordUser = useRef()
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si las contraseñas coinciden
  
    const name = nameUser.current.value
    const username = usernameUser.current.value
    const email = emailUser.current.value
    const identification = identificationUser.current.value
    const password = passwordUser.current.value
    try {
      // Envía los datos del formulario al servidor para el registro del usuario
      const response = await axios.post(`${baseUrl}/user/register`, {
        name,
        username,
        email,
        "identification":identification,
        password,
      });

      const t = response.data.authenticationResponseDTO.token
      console.log(t);
      // Si el registro es exitoso, guarda el token JWT en el almacenamiento local y redirige al usuario
      if (response.status === 200 && response.data.authenticationResponseDTO) {
        login(response.data.authenticationResponseDTO.token); // Guarda el token JWT en el contexto de autenticación
        navigate('/'); 
      } else {
        // Si hay un error en el servidor, muestra un mensaje de error
        alert('Error al registrar el usuario');
      }
    } catch (error) {
      // Si hay un error de red o cualquier otro error, muestra un mensaje de error
      alert('Error del servidor');
      console.error(error);
    }
  };

  return (
    <div className='container-register'>
    <div className='box-register'>
    <form onSubmit={handleSubmit} className='register-form'>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          required
          ref={nameUser}
        />
      </div>
      <div>
        <label htmlFor="username">Nombre usuario</label>
        <input
          type="text"
          required
          ref={usernameUser}
        />
      </div>
      <div>
        <label htmlFor="email">Correo</label>
        <input
          type="text"
          required
          ref={emailUser}
        />
      </div>
      <div>
        <label htmlFor="identification">Identidicación</label>
        <input
          type="text"
          required
          ref={identificationUser}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          required
          ref={passwordUser}
        />
      </div>
      <div className='div-btn-submit-register'>
        <button type="submit">Registrar</button>
      </div>
    </form>
    </div>
  </div>
  );
};


