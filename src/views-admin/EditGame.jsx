import GameForm from "../components/GameForm"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const EditGame = () => {

    const navigate = useNavigate()

    const {id} = useParams()
    const [game, setGame] = useState({})

    useEffect(() => {
        fetch(`http://localhost:2023/api/v0/games/${id}`)
            .then(response => response.json())
            .then(data => setGame(data))
            return () => {
            }
    }, [id])

    const handleSubmit = (form) => {
        fetch(`http://localhost:2023/api/v0/games/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(form)
        })
        .then(response => {
            if(response.ok){
                navigate('/admin', {replace: true})
                alert('El juego se editó con exito')
            }
            else{
                console.log(response)
        }
        })
    }

    return (
        <div>
            <h1 className="text-4xl mt-10 mb-10 font-bold text-center">Editar {game.name}</h1>
            <GameForm handleSubmit={handleSubmit} data={game} />
        </div>
    )
}

export default EditGame
