import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';
import { Navigate } from 'react-router-dom';

const NavigationBar = () => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const [user, setUser] = useState({});

    /**
     * Detecta si existe un token al montarse
     * el componente y lo guarda en el estado
     * 
     * @returns void
     */
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if(storedToken){
            fetch('http://localhost:2023/auth/verify', {
                method: 'POST',
                headers: {
                    'authorization': storedToken
                }
            })
                .then(response => {
                    if (response.ok) {
                        setUser(true)
                    }
                    else {
                        setUser(false)
                        setToken(null)
                        localStorage.removeItem('token')
                    }
                })
                .catch(error => {
                    setUser(false)
                    setToken(null)
                    localStorage.removeItem('token')
                    "Hubo un error con tu sesion"
                })

            setToken(storedToken)
            setUser(true)
        }
        else{
            setToken(null)
            setUser(false)
        }
  
    }, []);

    /**
     * Maneja el proceso de logout
     * Elimina el token del localstorage y del estado
     * 
     * @returns void
     */
    const handleLogout = () => {
        fetch('http://localhost:2023/login', {
            method: 'DELETE',
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('token')
                    setToken(null)
                    setUser(false)
                    return <Navigate to="/login" replace={true} />
                }
                else {
                    throw "Algo salio mal"
                }
            })
    }


    return (
        <nav className="bg-gray-800 p-4 w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-32" />
                </div>
                <ul className="flex justify-center items-center space-x-4">
                    <li>
                        <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                    </li>
                    <li>
                        <Link to="/games" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Juegos</Link>
                    </li>
                    <li>
                        <Link to="/news" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Noticias</Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/admin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Panel de administracion</Link>
                            </li>
                            <li>
                                <form className='flex' onSubmit={handleLogout}>
                                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                                </form>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Registrarme</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );

};

export default NavigationBar;