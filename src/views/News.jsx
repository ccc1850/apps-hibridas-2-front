import { useState, useEffect } from "react"
import NewsCard from "../components/NewsCard"


const News = () => {
    const [news, setNews] = useState([])
    const [error, setError] = useState(null)

    /**
     * Carga las noticias al montar el componente
     * 
     * @returns void
     */
    useEffect(() => {
        console.log('news')
        fetch('http://localhost:2023/api/v0/news')
            .then(response => {
                if(response.ok){
                    return response.json()
                }
                else{
                    throw "Algo salio mal"
                }
            })
            .then(data => setNews(data))
            .catch(error => {
                setError(error.msg)
                console.log(error.msg)
            })
    }
    , [])

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl mt-10 font-bold">Ultimas noticias</h1>
            <div className="mt-24 w-3/6 flex flex-col">
                {error && <p className="text-red-500 text-center mb-10">{error}</p>}
                {news.map(noticia => (
                    <NewsCard key={noticia._id} news={noticia}/>
                ))}
            </div>
        </div>
    )
}

export default News