import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

const NewsDetail = () => {
    const {id} = useParams()
    const [news, setNews] = useState({})
    const [error, setError] = useState(null)

    /**
     * Hace una peticion cuando detecta que el id cambia
     * 
     * @return void
     */
    useEffect(() => {
        fetch(`http://localhost:2023/api/v0/news/${id}`)
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => {
                setError(error.msg)
                console.log(error.msg)
            })
    }, [id])
    return (
        <div className="flex flex-col items-center">
            <Link to='/news' className='text-xl text-left font-semibold mt-10 underline'>Volver a la lista de noticias</Link>
            <h1 className="text-4xl text-center mt-10 font-bold w-1/2">{news.title}</h1>
            {error && <p className="text-red-500 text-center mb-10">{error}</p>}
            <div className="w-2/3 card mt-10 mb-10">
                <p className="text-xl p-10">{news.content}</p>
            </div>
        </div>
    )
}

export default NewsDetail