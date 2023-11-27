import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-2xl font-medium">Página no encontrada</p>
            <Link className="text-blue-500 hover:underline" to="/">Volver al inicio</Link>
        </div>
    )
}

export default NotFound