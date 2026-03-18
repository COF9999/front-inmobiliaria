import { useState, useContext, createContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';// Asegúrate de ajustar la ruta de importación
import api from '../../apiAxios';
import "../../css/login.css"

export const LoginContext = createContext()

function BoxInformation({valueTitleCueThings}){
  if(valueTitleCueThings===false){
    return
  }
  return(
    <div className='box-information'>
        <div className='div-out-logo-cue'>
          <div className='div-logo-cue'>
             <img  alt="" />
          </div>
        </div>
        <div className='div-welcome'>
              <h2>Habitar inmobiliaria</h2>
        </div>
    </div>
  )
}

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  const {usernameContext} = useContext(AuthContext)
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [titleCueThings,setTitleCueThings] = useState(true)

  // useEffect(() => {
  //     const getUser = async () => {
  //       try {
  //         const response = await api.get("/user/1");
  //         console.log(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     getUser();
  //   }, []);  




  useEffect(() => {
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
        if (window.innerWidth <= 780) {
            setTitleCueThings(false)
        } else {
           setTitleCueThings(true)
        }
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // se comento esta linea para pasar el login-----------------------------------------------------------------------------
    try {
      // Envía los datos del formulario al servidor para iniciar sesión
      const response = await api.post("/login", {
        "email":username,
        password,
      });

      // Si el inicio de sesión es exitoso, guarda el token JWT y establece isAuth en true
      if (response.status === 200) {
        console.log("Ok");
        
        const nameUsername = response.data.username
        usernameContext(nameUsername)
        localStorage.setItem("username",nameUsername)
        login(true)
        navigate('/liquidation'); // Redirige al usuario a la página de publicaciones
      } else {
        // Si hay un error en el servidor, muestra un mensaje de error
        alert('Error al iniciar sesión');
      }
    } catch (error) {
      // Si hay un error de red o cualquier otro error, muestra un mensaje de error
      alert('Error al inicar sesion'+error);
      console.error(error);
    }
    
  };

  return (
    <div className='container-login'>
      <BoxInformation
        valueTitleCueThings={titleCueThings}
      ></BoxInformation>
      <div className='box-login'>
      <form onSubmit={handleSubmit} className='login-form'>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='div-btn-submit-login'>
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
      </div>
    </div>
  );
};


