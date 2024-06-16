// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Home from './Home.jsx'
import BHome from './BHome.jsx'
import LogReg from './log_reg.jsx'
import CompProfile from './compProfile.jsx'
import SavePrblm from './saveCode/save_prblm'
import ShowProfile from './showProfile.jsx'
import EditQues from './saveCode/editQues'
import ChatRoom from './ChatRoom/chatRoom'
import EmailVerify from './EmailVerify.jsx'
import ShowQues from './showPQues'
import ShowComment from './showComment'
import CodeEditor from './CodeEditor/components/CodeEditor'
import Navbar from './Navbar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState } from 'react'

function App() {
    const [login, setLogin] = useState(false);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <><BHome login={login} /></>
        },
        {
            path: "/Home/:email/:name",
            element: <><Home login={login} /></>
        },
        {
            path: "/login",
            element: <><LogReg login={login} /></>
        },
        {
            path: "/compProfile",
            element: <><CompProfile login={login} /></>
        },
        {
            path: "/savedProblems/:email/:name",
            element: <><SavePrblm login={login} /></>
        },
        {
            path: "/chatRoom/:email/:name",
            element: <><ChatRoom login={login} /></>
        },
        {
            path: "/CodeEditor/:email/:name",
            element: <><CodeEditor login={login} /></>
        },
        {
            path: "/edit/:email/:name/:id/:Q/:sol",
            element: <><EditQues login={login} /></>
        },
        {
            path: "/showProfile/:email/:name/:age/:score/:psaved/:psolved",
            element: <><ShowProfile login={login} /></>
        },
        {
            path: "/users/:id/verify/:token",
            element: <><EmailVerify login={login} /></>
        },
        ])
    return (<>
                <RouterProvider router={router} />
            </>)
}

export default App
