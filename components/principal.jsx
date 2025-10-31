'use client';
import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import fonde from "../assets/fonde.png";
import rectangulo from "../assets/rectangulo.png";
import "./principal.css";

export default function Principal() {
  const [perfiles, setPerfiles] = useState([]);
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [userId, setUserId] = useState(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    async function obtenerUsuario() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error obteniendo usuario:", error);
      } else if (data?.user) {
        console.log("Usuario logueado:", data.user.id);
        setUserId(data.user.id);
      } else {
        console.log(" No hay usuario logueado");
      }
    }
    obtenerUsuario();
  }, []);


  useEffect(() => {
    async function cargarPerfiles() {
      if (!userId) return;
  
      try {
        
        const { data: prefData, error: prefError } = await supabase
          .from("profiles")
          .select("busca,min_age,max_age")
          .eq("user_id", userId)
          .maybeSinglesingle();
  
        if (prefError) {
          console.error("Error obteniendo preferencias:", prefError);
        }
  
        const misPreferencias = prefData;
  
       
        const { data: perfilesData, error: perfilesError } = await supabase
          .from("user_info")
          .select("user_id,nombre,descripcion,foto1,age")
          .neq("user_id", userId);
        if (perfilesError) {
          console.error("Error obteniendo user_info:", perfilesError);
          return;
        }
  
      
        const { data: perfilesGen, error: genError } = await supabase
          .from("profiles")
          .select("user_id,genero");
  
        if (genError) {
          console.error("Error obteniendo profiles:", genError);
          return;
        }
  
     
        const perfilesCompletos = perfilesData.map(u => {
          const perfilGen = perfilesGen.find(p => p.user_id === u.user_id);
          return {
            ...u,
            genero: perfilGen?.genero || null
          };
        });
  
        
        const otrosUsuarios = perfilesCompletos.filter(p => {
          if (!misPreferencias) return true;
          const cumpleGenero = p.genero === misPreferencias.busca;
          const cumpleEdad = p.age >= misPreferencias.min_age && p.age <= misPreferencias.max_age;
          return cumpleGenero && cumpleEdad;
        }).map(p => ({
          ...p,
          foto1: p.foto1 || "https://via.placeholder.com/300x400?text=Sin+Foto",
          descripcion: p.descripcion || "Sin descripción",
        }));
  
        console.log("Perfiles listos:", otrosUsuarios);
        setPerfiles(otrosUsuarios);
  
      } catch (err) {
        console.error("Error inesperado:", err);
      }
    }
  
    cargarPerfiles();
  }, [userId]);
  
  

  const guardarAccion = async (targetId, tipoAccion) => {
    if (!userId || !targetId) {
      console.warn("Faltan userId o targetId");
      return;
    }

    const registro = {
      from_user: userId,
      to_user: targetId,
      user_id: userId,
      action: tipoAccion,
    };

    console.log(" Guardando acción:", registro);

    try {
      const { data, error } = await supabase.from("likes").insert([registro]);
      if (error) {
        console.error("Error guardando acción:", error);
        return;
      }
      console.log("Acción guardada correctamente:", data);

   
      setPerfiles((prev) => prev.filter((p) => p.user_id !== targetId));
      setIndex(0);
    } catch (err) {
      console.error("Error inesperado:", err);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    setPos({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (pos.x > 150) {
      guardarAccion(perfil.user_id, "si");
    } else if (pos.x < -150) {
      guardarAccion(perfil.user_id, "no");
    }
    setPos({ x: 0, y: 0 });
  };

  const perfil = perfiles[index];

  console.log("Perfiles en el render:", perfiles);

  return (
    <div className="fondo">
      <div className="parte">
        <img src={fonde} alt="fonde" className="fonde" />
        <img src={rectangulo} alt="rectangulo" className="rectangule" />
      </div>

      <div className="card-container">
        {perfil ? (
          <>
            <div
              className="card"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.x / 10}deg)`,
                transition: isDragging ? "none" : "transform 0.3s ease",
              }}
            >
              <img
                src={perfil.foto1}
                alt={perfil.nombre || "Foto de perfil"}
                className="foto-perfil"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x400?text=Sin+Foto";
                }}
              />
              <div className="info">
                <h3>{perfil.nombre}</h3>
                <p className="desc">{perfil.descripcion}</p>
              </div>
            </div>

            <div className="botones">
              <button
                className="btn no"
                onClick={() => guardarAccion(perfil.user_id, "no")}
              >
                ❌ No me gusta
              </button>
              <button
                className="btn yes"
                onClick={() => guardarAccion(perfil.user_id, "si")}
              >
                💖 Me gusta
              </button>
            </div>
          </>
        ) : (
          <p style={{ color: "white", textAlign: "center" }}>
            No hay más usuarios disponibles 
          </p>
        )}
      </div>
    </div>
  );
}
