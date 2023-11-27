import GameForm from "../components/GameForm"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const AddGame = () => {

    const navigate = useNavigate()

    const [error, setError] = useState(null)

    const handleSubmit = (form) => {
        fetch('http://localhost:2023/api/v0/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json())
        .then(data => {
            if(data._id){
                navigate('/admin', {replace: true})
                alert('El juego se agregó con exito')
            }
            else{
                setError(data.msg)
            }
        })
        .catch(error => {
            setError(error.msg)
            console.log(error.msg)
        })
    }

    return (
        <div>
            <h1 className="text-4xl mt-10 mb-10 font-bold text-center">Agregar juego</h1>
            {error && <p className="text-red-500 text-center mb-10">{error}</p>}
            <GameForm handleSubmit={handleSubmit} error={setError}/>
        </div>
    )
}

export default AddGame
