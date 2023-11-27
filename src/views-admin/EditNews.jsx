import NewsForm from "../components/NewsForm"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const EditNews = () => {

    const navigate = useNavigate()

    const { id } = useParams()
    const [news, setNews] = useState({})

    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:2023/api/v0/news/${id}`)
            .then(response => response.json())
            .then(data => setNews(data))
        return () => {
        }
    }, [id])

    const handleSubmit = (form) => {
        fetch(`http://localhost:2023/api/v0/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(form)
        })
            .then(response => {
                if (response.ok) {
                    navigate('/admin', { replace: true })
                    alert('La noticia se editó con exito')
                }
                else {
                    console.log(response)
                }
            })
            .catch(error => {
                setError(error.msg)
                console.log(error.msg)
            })
    }

    return (
        <div>
            <h1 className="text-4xl mt-10 mb-10 font-bold text-center">Editar {news.title}</h1>
            {error && <p className="text-red-500 text-center mb-10">{error}</p>}
            <NewsForm handleSubmit={handleSubmit} data={news} />
        </div>
    )
}

export default EditNews