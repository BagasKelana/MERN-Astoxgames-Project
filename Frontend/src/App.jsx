import { useLocation, Routes, Route } from "react-router-dom"

import SignIn from "./pages/SignIn"
import Login from "./pages/Login"
import Main from "./pages/Home"
import Navbar from "./component/Navbar/Navbar"
import Sidebar from "./component/Sidebar/Sidebar"
import { createContext, useState } from "react"

import GameDetail from "./pages/GameDetail"
import EditGame from "./pages/EditGame"
import UserProfile from "./pages/UserProfile"
import PrivateRoute from "./component/PrivateRoute/PrivateRoute"
import UserSetting from "./pages/UserSetting"
import Search from "./pages/Search"

export const MyContext = createContext(false)

const App = () => {
    const [showSideBar, setShowSideBar] = useState(false)
    const location = useLocation()
    console.log()

    return (
        <MyContext.Provider value={{ showSideBar, setShowSideBar }}>
            {!(
                location.pathname === "/login" ||
                location.pathname === "/signin"
            ) && (
                <>
                    <Navbar />
                    <Sidebar />
                </>
            )}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="*" element={<>tidak ada bos</>} />
                <Route element={<PrivateRoute />}>
                    <Route path="/user" element={<UserProfile />} />
                    <Route path="/user/setting" element={<UserSetting />} />
                </Route>
                <Route path="/signin" element={<SignIn />} />

                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
                <Route path="/game/:id/:title" element={<GameDetail />} />
                <Route path="/game/:id/:title/edit" element={<EditGame />} />
            </Routes>
        </MyContext.Provider>
    )
}

export default App
