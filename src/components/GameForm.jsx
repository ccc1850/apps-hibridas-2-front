import { useState, useEffect } from "react";

const GameForm = ({ handleSubmit, data, }) => {


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [publisher, setPublisher] = useState("");
    const [image, setImage] = useState("");
    const [release_date, setRelease_date] = useState("");
    const [form, setForm] = useState({});

    const [error, setError] = useState({code: 0, msg: ""})
  
    /**
     * Detecta si el componente recibio datos al montarse
     * En caso de que si, los coloca en los campos del formulario
     * 
     * @returns void
     */
    useEffect(() => {
      if (data) {
        setName(data.name || "");
        setDescription(data.description || "");
        setPublisher(data.publisher || "");
        setImage(data.image || "");
        setRelease_date(data.release_date || "");
      }
    }, [data]);

    /**
     * Valida los campos del formulario
     * 
     * @returns {Boolean} - Si los campos son validos o no
     */
    const validation = () => {
        if (name === "" || name.length < 3 || name.length > 50) {
            setError({code: 1, msg: "El nombre debe tener entre 3 y 50 caracteres" });
            return false 
        }
        if (description === "" || description.length < 3 || description.length > 2000) {
            setError({code: 2, msg: "La descripcion debe tener entre 3 y 2000 caracteres" })
            return false 
        }
        if (publisher === "" || publisher.length < 3 || publisher.length > 50) {
            setError({code: 3, msg: "El publisher debe tener entre 3 y 50 caracteres" })
            return false 
        }
        if (image === "") {
            setError({code: 4, msg: "La imagen es requerida"})
            return false 
        }
        if (release_date === "") {
            setError({code: 5, msg: "La fecha de lanzamiento es requerida"})
            return false 
        }
        return true
    }
  
    /**
     * Maneja el envio del formulario
     * Usa la funcion handleSubmit que recibe como prop
     * 
     * @param e - La accion del formulario
     * @returns void
     */
    const handleForm = (e) => {
        e.preventDefault();
        if (!validation()) {
            return
        }
        const formData = { name, description, publisher, image, release_date };
        setForm(formData); 
        handleSubmit(formData);
    };

    /**
     * Maneja el cambio en el campo name
     * 
     * @param e - El evento del campo
     * @returns void
     */
    const handleName = (e) => {
        setName(e.target.value)
    }

    /**
     * Maneja el cambio en el campo description
     * 
     * @param e - El evento del campo
     * @returns void
     */
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    /**
     * Maneja el cambio en el campo publisher
     * 
     * @param e - El evento del campo
     * @returns void
     */
    const handlePublisher = (e) => {
        setPublisher(e.target.value)
    }

    /**
     * Maneja el cambio en el campo image
     * 
     * @param e - El evento del campo
     * @returns void
     */
    const handleImage = (e) => {
        setImage(e.target.value)
    }

    /**
     * Maneja el cambio en el campo release_date
     * 
     * @param e - El evento del campo
     * @returns void
     */
    const handleRelease_date = (e) => {
        setRelease_date(e.target.value)
    }

    return (
        <div className="w-full flex flex-col items-center mb-10">
            <form className="w-2/3" onSubmit={handleForm}>
                <div className="flex flex-col mt-10">
                    <label htmlFor="name">Nombre del juego:</label>
                    <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleName}
                    className="border-2 border-gray-400 rounded-lg p-2 bg-white"
                    />
                    {error.code == 1 && <p className="text-red-500">{error.msg}</p>}
                </div>
                <div className="flex flex-col mt-10">
                    <label htmlFor="description">Descripcion del juego:</label>
                    <textarea
                    required
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    value={description}
                    onChange={handleDescription}
                    className="border-2 border-gray-400 rounded-lg p-2 bg-white"
                    ></textarea>
                    {error.code == 2 && <p className="text-red-500">{error.msg}</p>}
                </div>
                <div className="flex flex-col mt-10">
                    <label htmlFor="image">Imagen del juego:</label>
                    <input
                    required
                    type="text"
                    name="image"
                    id="image"
                    value={image}
                    onChange={handleImage}
                    className="border-2 border-gray-400 rounded-lg p-2 bg-white"
                    />
                    {error.code == 4 && <p className="text-red-500">{error.msg}</p>}
                </div>
                <div className="flex flex-col mt-10">
                    <label htmlFor="publisher">Publisher del juego:</label>
                    <input
                    required
                    type="text"
                    name="publisher"
                    id="publisher"
                    value={publisher}
                    onChange={handlePublisher}
                    className="border-2 border-gray-400 rounded-lg p-2 bg-white"
                    />
                    {error.code == 3 && <p className="text-red-500">{error.msg}</p>}
                </div>
                <div className="flex flex-col mt-10">
                    <label htmlFor="release_date">Fecha de lanzamiento:</label>
                    <input
                    required
                    type="date"
                    name="release_date"
                    id="release_date"
                    value={release_date}
                    onChange={handleRelease_date}
                    className="border-2 border-gray-400 rounded-lg p-2 bg-white"
                    />
                    {error.code == 5 && <p className="text-red-500">{error.msg}</p>}
                </div>

                <button type="submit" className="bg-slate-900 text-white p-2 rounded-lg mt-5">
                    {data ? "Actualizar" : "Crear"}
                </button>

            </form>
        </div>
    )
};

export default GameForm;