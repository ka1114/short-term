import { useState } from 'react';
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'; 
import "./home.css"

export default function Home() {
    const [selected, setSelected] = useState(null);
    const [busca, setBusca] = useState(null);
    const [objetivo, setObjetivo] = useState(null);
    const [minEdad, setMinEdad] = useState(18);
    const [maxEdad, setMaxEdad] = useState(35);
    const [hobbies, setHobbies] = useState([]);
    const navigate = useNavigate();

    const handleContinue = () => {
     
      if (!selected || !busca || !objetivo) {
        alert("Por favor completa todas las secciones antes de continuar.");
        return;
      }
  
     
      const preferencias = {
        genero: selected,
        busca,
        objetivo,
        rangoEdad: { min: minEdad, max: maxEdad },
        hobbies,
      };
  
      localStorage.setItem("preferenciasUsuario", JSON.stringify(preferencias));
  
    
      navigate("/profile");
    };
  


  
    return (
        <div className="padre">
            <div className="contenido">
                <img src={logo} className="logoe" />
            </div>

            <div className="contenido2">
                <h3>
                    ¡Felicitaciones! Estás a punto de entrar al juego de las conexiones fugaces.<br />
                    Cuéntanos qué te gusta y déjanos mostrarte con quién podrías tener chispa.
                </h3>

                <h2 className="como">¿Cómo te identificas?</h2>
                <button className={`opcion ${selected === 'hombre' ? 'activo' : ''}`} onClick={() => setSelected('hombre')}>Hombre</button>
                <button className={`opcion ${selected === 'mujer' ? 'activo' : ''}`} onClick={() => setSelected('mujer')}>Mujer</button>
                <button className={`opcion ${selected === 'no-binario' ? 'activo' : ''}`} onClick={() => setSelected('no-binario')}>No binario</button>

                <h2 className="pregunta">¿Con quién te gustaría conectar?</h2>
                <button className={`opcion ${busca === 'hombres' ? 'activo' : ''}`} onClick={() => setBusca('hombres')}>Hombres</button>
                <button className={`opcion ${busca === 'mujeres' ? 'activo' : ''}`} onClick={() => setBusca('mujeres')}>Mujeres</button>
                <button className={`opcion ${busca === 'ambos' ? 'activo' : ''}`} onClick={() => setBusca('ambos')}>Ambos</button>

                <h2 className="pregunta">¿Qué buscas en la app?</h2>
                <button className={`opcion ${objetivo === 'charlas' ? 'activo' : ''}`} onClick={() => setObjetivo('charlas')}>Charlas sin compromiso</button>
                <button className={`opcion ${objetivo === 'diversion' ? 'activo' : ''}`} onClick={() => setObjetivo('diversion')}>Diversión</button>
                <button className={`opcion ${objetivo === 'conexion' ? 'activo' : ''}`} onClick={() => setObjetivo('conexion')}>Conexión rápida</button>
                <button className={`opcion ${objetivo === 'cita' ? 'activo' : ''}`} onClick={() => setObjetivo('cita')}>Cita casual</button>

                <h2 className="pregunta">¿Qué rango de edad te interesa?</h2>
                <div className="rango-edad">
                    <label>{minEdad} - {maxEdad} años</label>
                    <div className="sliders">
                        <input
                            type="range"
                            min="18"
                            max="60"
                            value={minEdad}
                            onChange={(e) => setMinEdad(parseInt(e.target.value))}
                            className="slider"
                        />
                        <input
                            type="range"
                            min="18"
                            max="60"
                            value={maxEdad}
                            onChange={(e) => setMaxEdad(parseInt(e.target.value))}
                            className="slider"
                        />
                    </div>
                </div>
                <h2 className="pregunta" style={{ marginTop: '54px' }}>¿Cuáles son tus hobbies o intereses?</h2>
<div className="hobbies">
  {[
    'Viajar',
    'Música',
    'Cine y series',
    'Deportes',
    'Leer',
    'Bailar',
    'Cocinar',
    'Fiestas',
    'Juegos',
    'Arte',
    'Mascotas'
  ].map((hobby) => (
    <button
      key={hobby}
      className={`opcion ${hobbies.includes(hobby) ? 'activo' : ''}`}
      onClick={() =>
        setHobbies((prev) =>
          prev.includes(hobby)
            ? prev.filter((h) => h !== hobby)
            : [...prev, hobby]
        )
      }
    >
      {hobby}
    </button>
  ))}
</div>
<button 
  className="continuar-btn"
  onClick={handleContinue}
>
  Continuar
</button>
            </div>
        </div>
    );
}