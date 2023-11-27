import { useState, useEffect } from "react"

const NewsForm = ({ handleSubmit, data }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [form, setForm] = useState({})

    const [error, setError] = useState({code: 0, msg: ""})

    /**
     * Valida los campos del formulario
     * 
     * @returns {Boolean} - Si los campos son validos o no
     */
    const validation = () => {
        if (title === "" || title.length < 3 || title.length > 100) {
            setError({code: 1, msg: "El titulo debe tener entre 3 y 50 caracteres" })
            return false 
        }
        if (content === "" || content.length < 100 || content.length > 3000) {
            setError({code: 2, msg: "El contenido debe tener entre 100 y 2000 caracteres" })
            return false 
        }
        return true
    }
  
    /**
     * Detecta si el componente recibio datos al montarse
     * En caso de que si, los coloca en los campos del formulario
     * 
     * @returns void
     */
    useEffect(() => {
      if (data) {
        setTitle(data.title || "")
        setContent(data.content || "")
      }
    }, [data])
  
    /**
     * Maneja el envio del formulario
     * Usa la funcion handleSubmit que recibe como prop
     * 
     * @param e - La accion del formulario
     * @returns void
     */
    const handleForm = (e) => {
        e.preventDefault()
        if (!validation()) {
            return
        }
        const formData = { title, content }
        setForm(formData) 
        handleSubmit(formData)
    }

    /**
     * Maneja el cambio en el campo de titulo
     * 
     * @param e - La accion del campo
     * @returns void
     */
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    /**
     * Maneja el cambio en el campo de contenido
     * 
     * @param e - La accion del campo
     * @returns void
     */
    const handleContent = (e) => {
        setContent(e.target.value)
    }

    return (
        <div className="w-full flex flex-col items-center">
            <form className="w-2/3" onSubmit={handleForm}>
                <div className="flex flex-col">
                    <label htmlFor="title">Titulo de la noticia:</label>
                    <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={handleTitle}
                    className="border-2 border-gray-400 rounded-lg p-2 bg-white"
                    />
                    {error.code == 1 && <p className="text-red-500">{error.msg}</p>}
                </div>
                <div className="flex flex-col mt-10">
                    <label htmlFor="content">Contenido de la noticia:</label>
                    <textarea
                    required
                    type="text"     
                    name="content"
                    id="content"
                    value={content}
                    onChange={handleContent}
                    className="border-2 border-gray-400 rounded-lg p-2 bg-white h-80"
                    />
                    {error.code == 2 && <p className="text-red-500">{error.msg}</p>}
                </div>
                <button type="submit" className="bg-slate-900 text-white p-2 rounded-lg mt-5">
                    {data ? "Actualizar" : "Crear"}
                </button>
            </form>
        </div>
    )
}

export default NewsForm