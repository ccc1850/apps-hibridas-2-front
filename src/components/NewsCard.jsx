import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
    return (
        <div className="w-full m-1 mb-5 p-5 card flex flex-col">
            <h5 className="text-2xl font-semibold ">{news.title}</h5>
            <p className="text-xl mt-2">{news.content.substring(0, 250)}...</p>
            <Link to={`/news/${news._id}`} className="bg-slate-900 text-white w-fit text-xl p-2 rounded-xl mt-2">Ver detalle</Link>
        </div>
    )
}

export default NewsCard