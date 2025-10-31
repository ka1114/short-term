import './landing.css'
import logo from'../assets/logo.png'
import short from '../assets/short.png'
import morado from '../assets/morado.png'
import naranja from '../assets/naranja.png'
import rosado from '../assets/rosado.png'
import rayo from '../assets/rayo.png'
import ubicacion from '../assets/ubicacion.png'
import rompe from '../assets/rompe.png'
import parejaa from '../assets/parejaa.png'
import tea from '../assets/tea.png'
import consejoso from '../assets/consejoso.png'
import primerap from '../assets/primerap.png'
import segunda from '../assets/segunda.png'
import { useNavigate } from "react-router-dom";


export default function Landing(){

    const navigate = useNavigate();

    const handleLogin = () => {
      navigate("/login"); // redirige al login
    };

    const handleSignup = () => {
      navigate("/signup");
    }

 return(
    <div className='padre'>
        <div className='seccion1'>
        <img src={logo} className='logo'/>
        <div className="Barra">
            <h2>Inicio</h2>
            <h2>Historias</h2>
        </div>
        <button className='boton' onClick={handleLogin}>
            Log in
        </button>
        </div>
<div className='seccion2'>
<div className='contenedor'>
<img src={morado} className='morado'/>
<img src={naranja} className='naranja'/>
<img src={rosado} className='rosado'/>
</div>
<img src={short} className='short'/>
<p className="texto">Donde lo temporal se vuelve inolvidable</p>
<button className='boton2'  onClick={handleSignup}>Atrévete </button>
</div>
<div className='contenedor2'>
    <div>
    <img src={rayo} className='rayo'/>
    <p className='boni'>Conexiones<br/> inmediatas</p>
    </div>
    <div>
    <img src={ubicacion} className='ubicacion'/>
    <p className='boni'>Conoce personas<br /> cerca de ti</p>
    </div>
   <div>
   <img src={rompe} className='rompe'/>
   <p className='boni'>Encuentra a tu<br /> match perfecto</p>
   </div>
   
</div>
<div className='seccion3'>
<img src={parejaa} className='pareja'/>
<img src={tea} className='tea'/>
<p className='parrafo'>Con la nueva Short-Term Experience puedes hacer match con tu tipo ideal o<br /> arriesgarte a conocer a tu opuesto. Tú decides cómo empezar tu próxima conexión.</p>
<button  className='boton3'  onClick={handleSignup}>Descubrir</button>
</div>


<img src={consejoso} className='consejoso'
/>
<p className='citas'>Encuentra consejos reales para construir conexiones reales.<br /> Aprende a comunicarte y a conquistar con confianza </p>

<div className='seccione'>
<div className='cuadrito'>
    <img src={primerap} className='primerap'/>
    <div className='por'>

    <h2 className='siete'>7 consejos para la primera cita</h2>
    <p>Las primeras citas pueden ser emocionantes y a<br /> la vez estresantes. Es normal tener nervios y<br /> preocupaciones sobre cómo salir bien en esa primera<br /> cita. Sin embargo, con un poco de preparación y<br /> siguiendo algunos consejos, puedes asegurarte de que<br /> todo salga bien. En este artículo, te presentamos 7<br /> consejos para tener una primera cita exitosa.</p>

    </div>

</div>
<div className='cuadrito2'>

<img src={segunda} className='segunda'/>
<h2 className='siete'>
¿Qué pasa en nuestro cerebro<br /> cuando nos enamoramos?
</h2>
<p>El amor romántico se da en varias fases: primero,<br /> la atracción. Los intereses románticos y el vínculo<br /> entre madre-infante se conectan, con el último<br /> siendo el antecedente evolutivo de la formación de<br /> vínculos de pareja, de acuerdo con la investigación<br /> publicada en 2023 por parte de la Universidad de Atlanta.</p>
</div>
</div>
<div className='ultima'>
<div className='rectangulo'>
<div className='contenido'>

    <img src={logo} />
    <p className='he'>2025 - Short-Term- Hecho en Colombia</p>
</div>
</div>

</div>

    </div>
 )
}