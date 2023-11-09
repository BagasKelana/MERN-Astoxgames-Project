import Layout from "@/Layout/Layout"
import TopGameCard from "@/component/Card/TopGameCard"
import useFetch from "@/hook/useFetch"
import { useState } from "react"
import { MdArrowForwardIos } from "react-icons/md"
const Search = () => {
    const [showFilter, setShowFilter] = useState({
        Categories: true,
        Platforms: true,
        Genres: false,
    })
    const { data, loading } = useFetch(
        `${import.meta.env.VITE_REACT_APP_DEV_MODE}/games/${"rating"}?limit=10`
    )
    const handleShowCategoris = () => {
        setShowFilter((value) => {
            return { ...value, Categories: !value.Categories }
        })
    }
    const handleShowPlatforms = () => {
        setShowFilter((value) => {
            return { ...value, Platforms: !value.Platforms }
        })
    }
    const handleShowGenres = () => {
        setShowFilter((value) => {
            return { ...value, Genres: !value.Genres }
        })
    }
    return (
        <Layout>
            <div className="w-full pt-4">
                <div className="flex w-full pl-4  ">
                    <div className="flex w-full gap-4  py-4 text-sm ">
                        <button className="  rounded border border-solid border-white bg-sky-800 px-2 py-0.5">
                            Filter
                        </button>
                        <button className="rounded border border-solid border-white bg-sky-800 px-2 py-0.5 ">
                            Relevance
                        </button>
                        <button className="rounded border border-solid border-white bg-sky-800 px-2 py-0.5 ">
                            Name
                        </button>
                        <button className="rounded border border-solid border-white bg-sky-800 px-2 py-0.5 ">
                            Realease
                        </button>
                        <button className="rounded border border-solid border-white bg-sky-800 px-2 py-0.5 ">
                            Popularity
                        </button>
                        <button className="rounded border border-solid border-white bg-sky-800 px-2 py-0.5 ">
                            Rating
                        </button>
                    </div>
                </div>
                <div className="flex h-full w-full  ">
                    <div className=" hidden h-full w-1/6 flex-col gap-4 p-4  xl:flex ">
                        <div>Filter</div>
                        <div className="h-full w-full">
                            <div className="flex w-full flex-col ">
                                <div>
                                    <div
                                        onClick={handleShowCategoris}
                                        className="flex items-center justify-between p-2  "
                                    >
                                        <div>Categories</div>
                                        <span
                                            className={`${
                                                !showFilter.Categories
                                                    ? "rotate-90"
                                                    : "-rotate-90"
                                            } transition-all duration-150 ease-in-out`}
                                        >
                                            <MdArrowForwardIos />
                                        </span>
                                    </div>
                                    <ul
                                        className={`${
                                            showFilter.Categories
                                                ? "h-[180px]  scale-y-100"
                                                : " h-[0px] scale-y-0"
                                        } ml-5 flex origin-top flex-col overflow-hidden text-sm transition-all duration-200 ease-in-out`}
                                    >
                                        <li className="p-2">Relevance</li>
                                        <li className="p-2">Name</li>
                                        <li className="p-2">Realease</li>
                                        <li className="p-2">Popularity</li>
                                        <li className="p-2">Rating</li>
                                    </ul>
                                </div>
                                <div>
                                    <div
                                        onClick={handleShowPlatforms}
                                        className="flex items-center justify-between p-2  "
                                    >
                                        <div>Plateforms</div>
                                        <span
                                            className={`${
                                                !showFilter?.Platforms
                                                    ? "rotate-90"
                                                    : "-rotate-90"
                                            } transition-all duration-150 ease-in-out`}
                                        >
                                            <MdArrowForwardIos />
                                        </span>
                                    </div>
                                    <ul
                                        className={`${
                                            showFilter?.Platforms
                                                ? "h-[252px] scale-y-100"
                                                : " h-0 scale-y-0"
                                        } ml-5 flex origin-top flex-col overflow-hidden text-sm transition-all duration-200 ease-in-out`}
                                    >
                                        <li className="p-2">PC</li>
                                        <li className="p-2">Playstation</li>
                                        <li className="p-2">Xbox</li>
                                        <li className="p-2">iOS</li>
                                        <li className="p-2">Android</li>
                                        <li className="p-2">Nintendo</li>
                                        <li className="p-2">Web</li>
                                    </ul>
                                </div>
                                <div>
                                    <div
                                        onClick={handleShowGenres}
                                        className="flex items-center justify-between p-2  "
                                    >
                                        <div>Genres</div>
                                        <span
                                            className={`${
                                                !showFilter?.Genres
                                                    ? "rotate-90"
                                                    : "-rotate-90"
                                            } transition-all duration-150 ease-in-out`}
                                        >
                                            <MdArrowForwardIos />
                                        </span>
                                    </div>
                                    <ul
                                        className={`${
                                            showFilter?.Genres
                                                ? "h-[288px] scale-y-100"
                                                : " h-0 scale-y-0"
                                        } ml-5 flex origin-top flex-col overflow-hidden text-sm transition-all duration-200 ease-in-out`}
                                    >
                                        <li className="p-2">Action</li>
                                        <li className="p-2">Strategy</li>
                                        <li className="p-2">RPG</li>
                                        <li className="p-2">Shooter</li>
                                        <li className="p-2">Adventure</li>
                                        <li className="p-2">Puzzle</li>
                                        <li className="p-2">Racing</li>
                                        <li className="p-2">Sports</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid h-full w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:w-5/6 xl:grid-cols-4">
                        {data?.map((game) => {
                            return (
                                <TopGameCard
                                    width="w-full"
                                    key={game._id}
                                    src={game.background_image}
                                    title={game.name}
                                    rating={game.rating}
                                    loading={loading}
                                    id={game._id}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
