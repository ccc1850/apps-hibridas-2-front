import { useState, useEffect } from "react";
import DashboardTable from "../components/DashboardTable";

function Dashboard() {

    const gamesTableHeaders = [
        { name: "Imagen", key: "image" },
        { name: "Nombre", key: "name" },
        { name: "Acciones", key: "actions" }
    ];

    const newsTableHeaders = [
        { name: "Titulo", key: "title" },
        { name: "Contenido", key: "content" },
        { name: "Acciones", key: "actions" }
    ];

    const [games, setGames] = useState([])
    const [news, setNews] = useState([])


    const fetchData = async () => {
        try {
            const [gamesResponse, newsResponse] = await Promise.all([
                fetch('http://localhost:2023/api/v0/games'),
                fetch('http://localhost:2023/api/v0/news')
            ]);

            if (gamesResponse.ok && newsResponse.ok) {

                const gamesData = await gamesResponse.json();
                const newsData = await newsResponse.json();

                setGames(gamesData);
                setNews(newsData);
            } else {
                throw "Algo salio mal"
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeletedGame = () => {
        fetchData();
    }

    return (
        <div>
            <h1 className="text-4xl mt-10 font-bold text-center">Panel de administracion</h1>
            <div className="flex justify-center">
                <div className="flex flex-col justify-around w-10/12 mt-10">

                    <h2 className="text-3xl font-semibold mb-5">Juegos</h2>
                    <div className="overflow-y-scroll mb-24 tableStyle">
                        <DashboardTable headers={gamesTableHeaders} data={games} links={"games"} onDelete={handleDeletedGame} />
                    </div>

                    <h2 className="text-3xl font-semibold mb-5">Noticias</h2>
                    <div className="overflow-y-scroll tableStyle mb-24">
                        <DashboardTable headers={newsTableHeaders} data={news} links={"news"} onDelete={handleDeletedGame} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
