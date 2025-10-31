import './signup.css'
import moradito from '../assets/moradito.png'
import naranjita from '../assets/naranjita.png'
import rosadito from '../assets/rosadito.png'
import transparente from '../assets/transparente.png'
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import signe from '../assets/signe.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'; 
import { supabase } from '../supabaseClient'


export default function Signup(e) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [message, setMessage] = useState('');
    

    const handleSignup = async (e) => {
        e.preventDefault(); 
    
        setError('');
        setMessage('');
    
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
    
          if (error) {
            setError(error.message);
            return;
          }
    
         
          if (!data.session) {
            setMessage("Revisa tu correo y confirma tu cuenta antes de continuar.");
          } else {
            navigate('/home'); 
          }
        } catch (err) {
          setError(err.message);
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
                <img src={moradito} className='moradito' />
                <img src={naranjita} className='naranjita' />
                <img src={rosadito} className='rosadito' />
                <img src={transparente} className='transparente' />
                <img src={signe} className='signe' />
                <div className='goo'>
                <button className='gu' onClick={signInWithGoogle}>
                  <FaGoogle />Log in</button>
                   
                </div>

                <div className='pri'>

                    <MdOutlineMailOutline className="icon" size={30} color='#fe5dd7' />
                    <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div className='seg'>
                    <RiLockPasswordLine className="icon" size={30} color='#fe5dd7' />
                    <input type="password" placeholder='contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className='botonee'>
                        <button className='iniciar' onClick={handleSignup}>Registrarse</button>
                    </div>

                </div>

            </div>
            <p className='iniciare'> O registrate ya usando </p>

        </div>
    )
}