import "./profile.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Profile() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fotos, setFotos] = useState([null, null, null]); // Archivos reales
  const [previews, setPreviews] = useState([null, null, null]); // URLs temporales
  const [edad, setEdad] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        alert("No hay usuario autenticado");
        return;
      }


      const fotoUrls = await Promise.all(
        fotos.map(async (file, index) => {
          if (!file) return null;

          const fileName = `${user.id}_${index}_${Date.now()}.${file.name.split(".").pop()}`;

          const { error: uploadError } = await supabase.storage
            .from("fotos")
            .upload(fileName, file, { upsert: true });

          if (uploadError) throw uploadError;

        
          const { data } = supabase.storage
            .from("fotos")
            .getPublicUrl(fileName);

          return data.publicUrl;
        })
      );

      console.log(" URLs guardadas:", fotoUrls);

      const { error: insertError } = await supabase.from("user_info").insert([
        {
          user_id: user.id,
          nombre,
          descripcion,
          foto1: fotoUrls[0],
          foto2: fotoUrls[1],
          foto3: fotoUrls[2],
          age: Number(edad),
        },
      ]);

      if (insertError) throw insertError;

      alert("Perfil guardado correctamente");
      navigate("/principal");

    } catch (err) {
      console.error(" Error general:", err);
      alert("Ocurrió un error al guardar el perfil");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="titulo">Crea tu perfil</h2>
      <p className="subtitulo">
        Completa la información para que los demás puedan conocerte mejor
      </p>

      <form onSubmit={handleSubmit} className="profile-form">
        <label>Nombre</label>
        <input
          className="prie"
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label className="do">Descripción</label>
        <textarea
          className="des"
          placeholder="Cuéntanos algo sobre ti..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label className="su">Sube tus fotos</label>
        <div className="fotos-grid">
          {[0, 1, 2].map((index) => (
            <div key={index} className="foto-cuadro">
              {previews[index] ? (
                <img
                  src={previews[index]}
                  alt={`foto-${index}`}
                  className="preview"
                />
              ) : (
                <label className="subir-foto">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const newFiles = [...fotos];
                        const newPreviews = [...previews];
                        newFiles[index] = file;
                        newPreviews[index] = URL.createObjectURL(file);
                        setFotos(newFiles);
                        setPreviews(newPreviews);
                      }
                    }}
                  />
                </label>
              )}
            </div>
          ))}
        </div>

        <div className="input-age">
          <label>Edad:</label>
          <input
            type="number"
            placeholder="Tu edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="guardar-btn">
          Guardar perfil
        </button>
      </form>
    </div>
  );
}
