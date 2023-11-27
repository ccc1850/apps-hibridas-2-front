import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const [error, setError] = useState({code: 0, msg : ''})

    /**
     * Valida los campos del formulario
     * 
     * @returns {Boolean} - Si los campos son validos o no
     */
    const validation = () => {
        if (email === "" || email.length < 3 || email.length > 50 || !email.includes('@')) {
            setError({code: 1, msg: "El email debe tener entre 3 y 50 caracteres" })
            return false
        }
        if (password === "" || password.length < 3 || password.length > 50) {
            setError({code: 2, msg: "La contraseña debe tener entre 3 y 50 caracteres" })
            return false
        }
        return true
    }

    /**
     * Maneja el cambio en el campo email
     * @param e - El evento del campo
     * 
     * @returns void
     */
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    /**
     * Maneja el cambio en el campo password
     * @param e - El evento del campo
     * 
     * @returns void
     */
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    /**
     * Maneja el envio del formulario
     * y el proceso de registro
     * 
     * @param e - La accion del formulario
     * @returns void
     */
    const handleRegister = (e) => {
        e.preventDefault()
        if (!validation()) {
            return
        }

        fetch('http://localhost:2023/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (response.ok) {
                    navigate('/login', { replace: true,})
                    alert('Ya puedes iniciar de sesion')
                }
                else {
                    setError({code: 3, msg: response.msg})
                }
            })
            .catch(error => {
                setError({code: 3, msg: error.msg})
                console.log(error.msg)
            })
    }


    return (
        <div>
            <div className='flex flex-col items-center'>
                <h1 className="text-4xl mt-10 font-bold">Registrarme</h1>


                <form className="flex flex-col mt-10 w-1/5" onSubmit={handleRegister}>
                    {error.code == 3 && <p className="text-red-500">{error.msg}</p>}
                    <label className='flex flex-col'>Email:
                        <input className='border-2 border-gray-400 rounded-lg p-2 bg-white' type="email" name="email" required onChange={handleEmail} value={email} />
                    </label>
                    {error.code == 1 && <p className="text-red-500">{error.msg}</p>}
                    <label className='flex mt-5 flex-col'>Password:
                        <input className='border-2 border-gray-400 rounded-lg p-2 bg-white' type="password" name="password" required onChange={handlePassword} value={password} />
                    </label>
                    {error.code == 2 && <p className="text-red-500">{error.msg}</p>}
                    <button className='bg-slate-900 text-white p-2 rounded-lg mt-5 ' type="submit">Crear cuenta</button>
                </form>
            </div>
        </div>
    )
}

export default Register