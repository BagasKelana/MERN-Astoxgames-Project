import Sidebar from "@/productComponent/Sidebar"
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { useState, useRef, useEffect } from "react"
import Card from "@/component/Molecule/Card"
import axios from "axios"

const Product = () => {
    const [minimalisbar, setMinimalisBar] = useState(false)
    const [dataCards, setDataCard] = useState(null)
    const [searchKeyWord, setSearchKeyWord] = useState(null)
    const [searchData, setSearchData] = useState(null)

    useEffect(() => {
        axios
            .get("http://localhost:3000/games/")
            .then(function (response) {
                const data = response.data
                console.log(data)
                setDataCard([...data])
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        const getData = setTimeout(async () => {
            if (searchKeyWord?.length > 0) {
                const data = await dataCards.filter((data) => {
                    return data.name
                        .toLowerCase()
                        .includes(searchKeyWord.toLowerCase())
                })
                console.log(data)
                if (data) {
                    setSearchData([...data])
                }
            }
        }, 2500)

        return () => clearTimeout(getData)
    }, [searchKeyWord, dataCards])

    const hiddenSidebar = () => {
        setMinimalisBar(!minimalisbar)
    }

    const searchGames = (event) => {
        setSearchKeyWord(event.target.value)
    }

    return (
        <div
            style={{
                background:
                    "linear-gradient(34deg, rgba(37,37,37,1) 0%, rgba(18,18,18,1) 48%) fixed",
            }}
            className=" relative flex  min-h-screen  w-screen overflow-hidden  text-center duration-200 ease-in-out "
        >
            {!minimalisbar && (
                <div
                    onClick={hiddenSidebar}
                    className="fixed z-30 flex h-full w-screen bg-black opacity-50 duration-200 ease-in-out md:hidden md:opacity-0"
                ></div>
            )}
            <div className="group fixed left-0 top-0 z-50 flex h-full w-auto ">
                <div
                    id="side-bar"
                    className={`${
                        !minimalisbar ? "w-[300px]" : "w-[55px]"
                    } z-[40] flex h-full overflow-auto overflow-x-hidden  bg-slate-800 duration-200 ease-in-out  `}
                >
                    <ul className="flex h-fit w-full flex-col text-slate-300">
                        <>
                            <li className="my-10 flex h-10 w-full items-center justify-center  gap-4 bg-slate-800   ">
                                <div className=" h-fit rounded-full  bg-white p-2 text-black">
                                    {Sidebar[1].icon}
                                </div>
                                {!minimalisbar && (
                                    <div>
                                        <h2>Login</h2>
                                        <p className="mt-2 text-xs">Join now</p>
                                    </div>
                                )}
                            </li>
                            {Sidebar.map((item, index) => {
                                return (
                                    index !== 1 && (
                                        <li
                                            className={` flex h-10 w-full items-center gap-4 bg-slate-900 p-4 transition-all  duration-200 ease-in-out  hover:bg-slate-800 hover:text-white `}
                                            key={index}
                                        >
                                            <div className=" flex h-8 items-center text-center text-xl">
                                                {item.icon}
                                            </div>
                                            <div
                                                className={`${
                                                    !minimalisbar
                                                        ? "opacity-100"
                                                        : "  opacity-0"
                                                } flex h-fit  w-28 items-center overflow-hidden text-clip  text-xl duration-200 ease-in-out`}
                                            >
                                                {item.name}
                                            </div>
                                        </li>
                                    )
                                )
                            })}
                        </>
                    </ul>
                </div>
                <button
                    onClick={hiddenSidebar}
                    className=" absolute -right-3 top-9 z-50 flex h-7 w-7 items-center justify-center rounded-lg bg-white p-1 text-justify text-3xl text-black opacity-0 duration-200 ease-in-out   group-hover:opacity-100"
                >
                    {!minimalisbar ? <AiOutlineLeft /> : <AiOutlineRight />}
                </button>
            </div>
            <div
                className={`${
                    !minimalisbar ? "ml-[250px]" : "ml-[50px]"
                } relative mx-auto flex  h-full max-w-full flex-1 flex-col items-center overflow-hidden p-2 duration-300 ease-in-out`}
            >
                <div className=" mx-auto flex h-full w-auto flex-col  ">
                    <InputSearch onChange={searchGames} />
                    <div className="flex h-full w-full flex-col gap-4">
                        <div className="flex h-full w-full items-center gap-2 rounded-xl ">
                            <select
                                className=" flex rounded-lg border-[1px] bg-black p-2 text-slate-50 outline-none"
                                id="cars"
                                name="cars"
                            >
                                <option
                                    className="p-2 outline-none "
                                    value="relevance"
                                >
                                    Relevance
                                </option>
                                <option
                                    className="p-2 outline-none "
                                    value="name"
                                >
                                    Name
                                </option>
                                <option
                                    className="p-2 outline-none "
                                    value="popularity"
                                >
                                    Popularity
                                </option>
                                <option
                                    className="p-2 outline-none "
                                    value="releasedate"
                                >
                                    Release Date
                                </option>
                                <option
                                    className="p-2 outline-none "
                                    value="rating"
                                >
                                    Rating
                                </option>
                            </select>
                            <select
                                className="rounded-lg border-[1px] bg-black p-2 text-slate-50 outline-none"
                                id="platform"
                                name="platform"
                            >
                                <option
                                    className="p-2 outline-none "
                                    value=""
                                    disabled
                                >
                                    Platform
                                </option>
                                <option
                                    className="p-2 outline-none "
                                    value="pc"
                                >
                                    PC
                                </option>
                                <option
                                    className="p-2 outline-none "
                                    value="playstation"
                                >
                                    PlayStation
                                </option>
                                <option
                                    className="p-2 outline-none "
                                    value="xbox"
                                >
                                    Xbox
                                </option>
                                <option
                                    className="p-2 outline-none "
                                    value="Nitendo"
                                >
                                    Nitendo
                                </option>
                            </select>
                        </div>
                    </div>
                    <div
                        className={`${
                            minimalisbar
                                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 "
                                : "sm:grid-cols-` grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 "
                        } mt-8 grid h-full w-full justify-center justify-items-center  gap-4 text-start  `}
                    >
                        {searchData?.length > 0
                            ? searchData.map((data, index) => {
                                  return (
                                      <Card
                                          key={index}
                                          img={data.background_image}
                                          title={data.name}
                                          rating={data.rating}
                                          date={data.released}
                                          plateform={data.parent_platforms}
                                      />
                                  )
                              })
                            : dataCards?.map((data, index) => {
                                  return (
                                      <Card
                                          key={index}
                                          img={data.background_image}
                                          title={data.name}
                                          rating={data.rating}
                                          date={data.released}
                                          plateform={data.parent_platforms}
                                      />
                                  )
                              })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const InputSearch = ({ onChange }) => {
    const [changeColor, setChangeColor] = useState(false)

    const ref = useRef()

    const changeColorInput = () => {
        setChangeColor(!changeColor)
    }

    const handleOnClick = () => {
        ref.current.focus()
    }

    return (
        <div
            onClick={handleOnClick}
            onChange={onChange}
            className={`${
                !changeColor
                    ? "bg-black p-4 text-slate-500 "
                    : "bg-slate-50 p-4 text-black "
            } group flex h-full w-full items-center gap-2 rounded-xl border-[1px] hover:bg-slate-50 hover:text-black`}
        >
            <span className=" flex items-center text-xl">
                <BiSearch />
            </span>
            <input
                ref={ref}
                onFocus={changeColorInput}
                onBlur={changeColorInput}
                className={`${
                    !changeColor ? " text-slate-500 " : " text-black "
                } h-full w-full border-none bg-transparent  outline-none group-hover:text-black `}
                type="text"
                placeholder="Search Games"
            />
        </div>
    )
}

export default Product
