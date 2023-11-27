import { Link } from "react-router-dom"

const AdminToolbar = () => {
    return (
        <div className="w-full flex justify-center bg-stone-500 p-2">
            <div className="w-2/3 flex justify-around text-white">
            <Link className="hover:bg-stone-400 rounded-md p-2 text-sm font-medium" to="/admin">Dashboard</Link>
            <Link className="hover:bg-stone-400 rounded-md p-2 text-sm font-medium" to="/admin/new-game">Agregar juegos</Link>
            <Link className="hover:bg-stone-400 rounded-md p-2 text-sm font-medium" to="/admin/new-article">Agregar noticias</Link>
            </div>
        </div>
    )
}

export default AdminToolbar