import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

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
     * y el proceso de login
     * 
     * @param e - El evento del formulario
     * @returns void
     */
    const handleSubmit = (e) =>{
        e.preventDefault()

        fetch('http://localhost:2023/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        })
        .then(response => response.json())
        .then(data => {
            if(data.token){
                localStorage.setItem('token', data.token)
                navigate('/', {replace: true})
                navigate(0)
            }
            else{
                alert('Something went wrong')
            }
        }
            )
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className="text-4xl mt-10 font-bold">Login</h1>
            <form className="flex flex-col mt-10 w-1/5" onSubmit={handleSubmit}>
                <label className='flex flex-col'>Email:
                    <input className='border-2 border-gray-400 rounded-lg p-2 bg-white' type="email" name="email" required onChange={handleEmail} value={email} />
                </label>
                <label className='flex mt-5 flex-col'>Password:
                    <input className='border-2 border-gray-400 rounded-lg p-2 bg-white' type="password" name="password" required onChange={handlePassword} value={password} />
                </label>

                <button className='bg-slate-900 text-white p-2 rounded-lg mt-5 ' type="submit">Login</button>
            </form>
        </div>
    )
}



export default Login