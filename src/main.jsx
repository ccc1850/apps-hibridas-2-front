import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Outlet,
  Router,
  RouterProvider,
} from "react-router-dom"

import './index.css'

import App from './layouts/App.jsx'
import Admin from './layouts/Admin.jsx'

/* FRONT VIEWS IMPORTS */
import Home from './views/Home.jsx'
import Games from './views/Games.jsx'
import GameDetail from './views/GameDetail.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import News from './views/News.jsx'
import NewsDetail from './views/NewsDetail.jsx'
import RouterPrivate from './components/RouterPrivate.jsx'
import NotFound from './views/NotFound.jsx'

/* BACK VIEWS IMPORTS */
import Dashboard from './views-admin/Dashboard.jsx'
import AddGame from './views-admin/AddGame.jsx'
import EditGame from './views-admin/EditGame.jsx'
import AddNews from './views-admin/AddNews.jsx'
import EditNews from './views-admin/EditNews.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "games",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Games />,
          },
          {
            path: ":id",
            element: <GameDetail />,
          },
        ],
      },
      {
        path: "news",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <News />,
          },
          {
            path: ":id",
            element: <NewsDetail />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ],
  },
  {
    path: "admin",
    element: <RouterPrivate><Admin /></RouterPrivate>,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "new-game",
        element: <AddGame />,
      },
      {
        path: "edit-game/:id",
        element: <EditGame />,
      },
      {
        path: "new-article",
        element: <AddNews />,
      },
      {
        path: "edit-article/:id",
        element: <EditNews />,
      },
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
