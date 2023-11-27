import { useState, useEffect } from "react"

import GameCard from "../components/GameCard";

const Games = () => {
    const [games, setGames] = useState([])
    const [error, setError] = useState(null)

    /**
     * Carga los juegos al montar el componente
     * 
     * @returns void
     */
    useEffect(() => {
        fetch('http://localhost:2023/api/v0/games')
            .then(response => {
                if(response.ok){
                    return response.json()
                }
                else{
                    throw "Algo salio mal"
                }
            })
            .then(data => setGames(data))
            .catch(error => {
                setError(error.msg)
                console.log(error.msg)
            })

    }
    , [])


    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl mt-10 font-bold">Nuestros juegos</h1>
            <div className="mt-24 w-5/6 flex flex-wrap justify-around">
                {error && <p className="text-red-500 text-center mb-10">{error}</p>}
                {games.map(game => (
                    <GameCard key={game._id} game={game}/>
                ))}
            </div>
        </div>
    )
}

export default Games