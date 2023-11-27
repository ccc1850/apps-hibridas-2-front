import { Link } from "react-router-dom";
import { useState } from "react";

const DashboardTable = ({ headers, data, links, onDelete }) => {
    
    if (!data || data.length === 0) {
        return <div>No data available.</div>;
    }

    const [popup, setPopup] = useState({code: 0, content: ""})
    /**
     * Define el formulario que aparecera en el popup window
     *
     * @param {Object} data - Los datos del elemento a eliminar
     * @returns  El formulario para eliminar el elemento
     */
    const deleteForm = (data) => {
        let item = data.name || data.title
        return (
            <div className="flex flex-col items-center p-5">
                <form className="flex flex-col items-center" onSubmit={(e) => handleDelete(e, data._id)}>
                    <p className="text-xl text-black">¿Estás seguro de que quieres eliminar {item}?</p>  
                    <button type="submit" className="text-white mt-2 bg-slate-500 hover:bg-slate-400 p-2 rounded-xl">Eliminar</button>
                </form>
                <button onClick={hidePopup} className="mt-2 bg-slate-500 hover:bg-slate-400 p-2 rounded-xl">Aun lo quiero</button>
            </div>
        );
    };

    /**
     * Muestra el popup window y crea el formulario de eliminaacion
     * 
     * @param {Number} code - El codigo del popup window
     * @param {Object} data - Los datos del elemento a eliminar
     * @returns void
     */
    const handlePopup = (code, data) => {
        setPopup({code: code, content: deleteForm(data)})
    }

    /**
     * Oculta el popup window
     * 
     * @returns void
     */
    const hidePopup = () => {
        setPopup({code: 0, content: ""})
    }

    /**
     * Elimina un elemento de la base de datos
     * 
     * @param e - El evento del boton
     * @param {String} id - El id del elemento a eliminar
     * @returns void
     * @throws {String} - Si hubo un error borrando el contenido
     */
    const handleDelete = (e, id) => {
        e.preventDefault();
        fetch(`http://localhost:2023/api/v0/${links}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert("Eliminacion exitosa")
                    onDelete()
                } else {
                    throw "Hubo un error borrando el contenido"
                }
            })
            .catch((error) => {
                alert(error)
            });
        hidePopup()
    };

    /**
     * Define los links de accion para cada elemento de la tabla
     * 
     * @param {String} links - El tipo de contenido que se esta mostrando
     * @param {Object} row - Los datos del elemento
     * @returns Los links de accion para cada elemento
     */
    const actionLinks = (links, row) => {
        if(links == "news"){
            return (
                <div className="flex flex-col justify-center items-center">
                    <Link to={`/news/${row._id}`} className="bg-slate-500 hover:bg-slate-400 p-2 rounded-xl">Ver detalle</Link>
                    <Link to={`/admin/edit-article/${row._id}`} className="mt-2 bg-slate-500 hover:bg-slate-400 p-2 rounded-xl">Editar</Link>
                    <button onClick={() => handlePopup(1, row)} className="mt-2 bg-slate-500 hover:bg-slate-400 p-2 rounded-xl">Eliminar</button>
                </div>
            )
        }
        if(links == "games"){
            return (
                <div className="flex flex-col justify-center items-center">
                    <Link to={`/games/${row._id}`} className="bg-slate-500 hover:bg-slate-400 p-2 rounded-xl">Ver detalle</Link>
                    <Link to={`/admin/edit-game/${row._id}`} className="mt-2 bg-slate-500 hover:bg-slate-400 p-2 rounded-xl">Editar</Link>
                    <button onClick={() => handlePopup(1, row)} className="mt-2 bg-slate-500 hover:bg-slate-400 p-2 rounded-xl">Eliminar</button>
                </div>
            )
        }
    }

    return (
        <div className="w-full">

            {popup.code === 1 && (
                <div className="z-10 h-full w-full bg-slate-300 bg-opacity-50 fixed top-0 left-0">
                    <div className="bg-white text-white p-2 rounded-xl z-20 fixed popup">
                        {popup.content}
                    </div>
                </div>
            )}

            <table className="table-auto">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header.key}>{header.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {headers.map((header) => {
                                if (header.key !== "actions" && header.key !== "image" && header.key !== "content") {
                                    return <td className="w-1/3" key={header.key}>{row[header.key]}</td>;
                                } else if (header.key === "actions") {
                                    return (
                                        <td key={header.key} className="w-1/3 text-center text-white">
                                            {actionLinks(links, row)}
                                        </td>
                                    );
                                } else if (header.key === "image") {
                                    return (
                                        <td className="w-1/3"  key={header.key}>
                                            <div className="flex justify-center w-fit">
                                                <img src={row[header.key]} alt={row.name} className="w-1/3 rounded-xl mt-5" />
                                            </div>
                                        </td>
                                    );
                                } else if (header.key === "content") {
                                    return (
                                        <td className="w-1/3" key={header.key}>
                                            <p className="">{row[header.key].substring(0, 70)}...</p>
                                        </td>
                                    );
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable