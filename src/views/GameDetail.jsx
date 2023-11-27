import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const GameDetail = () =>{
    const {id} = useParams()
    const [game, setGame] = useState({})
    const [error, setError] = useState(null)

    /**
     * Hace una peticion cuando detecta que el id cambia
     *
     * @return void
     */
    useEffect(() => {
        fetch(`http://localhost:2023/api/v0/games/${id}`)
            .then(response => response.json())
            .then(data => setGame(data))
            .catch(error => {
                setError(error.msg)
                console.log(error.msg)
            })
    }, [id])

    return(
        <div className='flex flex-col items-center w-full mb-10'>
            <Link to='/games' className='text-xl text-left font-semibold mt-10 underline'>Volver a la lista de juegos</Link>
            <h1 className="text-4xl mt-10 font-bold">{game.name}</h1>
            {error && <p className="text-red-500 text-center mb-10">{error}</p>}
            <p className='mt-2 text-2xl font-semibold mb-5'>{game.publisher}</p>
            <div className='flex flex-col items-center w-2/3 text-center'>
                <img src={game.image} alt={game.name} className="w-1/2 rounded-xl mt-5" />
                <p className="text-xl mt-10 mb-10"><span className='font-semibold'>Descripcion:</span> <br />{game.description}</p>
                <p className='text-xl'><span className='font-semibold'>Fecha de Lanzamiento:</span> <br />{game.release_date}</p>

            </div>
        </div>
    )
}

export default GameDetail