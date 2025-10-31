import './login.css'
import moradito from '../assets/moradito.png'
import naranjita from '../assets/naranjita.png'
import rosadito from '../assets/rosadito.png'
import transparente from '../assets/transparente.png'
import logine from '../assets/logine.png'
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();


  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Por favor ingresa correo y contraseña");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }


    const session = await supabase.auth.getSession();
    if (session.data.session) {
      console.log("Usuario logueado:", data.user);
      navigate("/principal"); 
    } else {
      setErrorMsg("No se pudo iniciar sesión. Intenta de nuevo.");
    }
  };

   const signInWithGoogle = async () => {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirect_to: "/home"
            },
          });
        
          if (error) {
            console.error("Error iniciando sesión con Google:", error.message);
          } else {
            console.log("Redirigiendo a Google para login...", data);
          }
        };



  return (
    <div>
      <div className='seccione'>
        <img src={moradito} className='moradito'/>
        <img src={naranjita} className='naranjita' />
        <img src={rosadito} className='rosadito' />
        <img src={transparente} className='transparente'/>
        <img src={logine} className='logine' />

        <div className='goo'>
          <button className='gu' onClick={signInWithGoogle}><FaGoogle />Log in</button>
         
        </div>

        <div className='pri'>
          <MdOutlineMailOutline className="icon" size={30} color='#fe5dd7'  />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='seg'>
          <RiLockPasswordLine className="icon" size={30} color='#fe5dd7'/>
          <input 
            type="password" 
            placeholder='Contraseña' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <div className='botonee'>
            <button className='iniciar' onClick={handleLogin}>Iniciar sesión</button>
          </div>
        </div>

        {/* Mensaje de error */}
        {errorMsg && <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>}

      </div>

      <p className='iniciare'>O inicia sesión usando</p>
    </div>
  )
}
