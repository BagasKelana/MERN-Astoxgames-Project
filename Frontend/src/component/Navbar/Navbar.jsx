import { Link } from "react-router-dom"
import { BsSearch } from "react-icons/bs"
import { BiMenu } from "react-icons/bi"
import { FaUserAstronaut } from "react-icons/fa"

import { MyContext } from "@/App"
import { useContext } from "react"
import { useSelector } from "react-redux"

const Navbar = () => {
    const { showSideBar, setShowSideBar } = useContext(MyContext)
    const { currentUser } = useSelector((state) => state.user)
    console.log(currentUser)

    const handleSideBar = () => {
        setShowSideBar(!showSideBar)
    }

    return (
        <>
            <header className=" navbar t-0 fixed z-[100] flex h-[60px] w-full bg-main-color shadow shadow-[rgb(25,25,25)] ">
                <nav className=" flex  w-full items-center  ">
                    <div className=" flex h-full items-center border-r border-gray-900 bg-slate-950  px-[10px]   ">
                        <span
                            onClick={handleSideBar}
                            className="cursor-pointer text-3xl"
                        >
                            <BiMenu />
                        </span>
                    </div>
                    <div className={` flex h-full w-full   pl-0  pr-6  `}>
                        <div className=" flex h-full w-fit justify-start  px-4 md:w-2/4 md:px-0 ">
                            <img
                                className=" aspect-video h-full object-cover invert"
                                src="/images/logo1.png"
                                alt="logo"
                            />
                        </div>
                        <div className="flex h-full w-full items-center">
                            <div className="flex h-fit w-full items-center  ">
                                <form
                                    autoComplete="off"
                                    className={`flex h-full w-full items-center justify-between gap-2 rounded-2xl border-[1px] border-neutral-600 bg-gradient-to-r from-[rgb(15,15,15)] to-[rgb(25,25,25)] px-4 py-2    focus-within:border-[1px] focus-within:border-white `}
                                >
                                    <input
                                        className="flex h-full w-full items-center bg-transparent placeholder-neutral-400 outline-none"
                                        type="text"
                                        name="search"
                                        id="search"
                                        placeholder="Find your games"
                                    />
                                    <span className="cursor-pointer text-lg text-neutral-400">
                                        <BsSearch />
                                    </span>
                                </form>
                            </div>
                        </div>
                        <div className="hidden h-full w-2/4 items-center justify-end gap-4 md:flex">
                            <span className=" cursor-pointer text-lg">
                                {currentUser ? (
                                    <Link to="/user">
                                        {currentUser.firstName +
                                            " " +
                                            currentUser.lastName}
                                    </Link>
                                ) : (
                                    <Link to={"/login"}>Login here!</Link>
                                )}
                            </span>
                            {currentUser?.photo ? (
                                <span className="rounded border-[1px] border-solid bg-gradient-to-r from-[#0c2135] to-[#09092b]  text-2xl">
                                    <img
                                        className="h-6 w-6"
                                        src={currentUser.photo}
                                        alt="photo"
                                    />
                                </span>
                            ) : (
                                <span className="rounded border-[1px] border-solid bg-gradient-to-r from-[#0c2135] to-[#09092b] px-1 pt-1 text-2xl">
                                    <FaUserAstronaut />
                                </span>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar
