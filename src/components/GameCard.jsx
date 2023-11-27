import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <div className="flex flex-col items-center w-1/3 m-1 mb-5 p-5 card">
            <h5 className="text-3xl font-semibold ">{game.name}</h5>
            <img src={game.image} alt={game.name} className="w-3/4 rounded-xl mt-5" />
            <p className="text-xl mt-10">{game.description.substring(0, 150)}...</p>
            <Link to={`/games/${game._id}`} className="bg-slate-900 text-white w-fit text-xl p-2 rounded-xl mt-5">Ver detalle</Link>
        </div>
    )
}

export default GameCard