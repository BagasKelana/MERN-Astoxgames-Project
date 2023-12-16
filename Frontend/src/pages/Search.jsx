import Layout from "@/Layout/Layout"
import TopGameCard from "@/component/Card/TopGameCard"
import useFetch from "@/hook/useFetch"
import { useEffect, useState } from "react"
import { MdArrowForwardIos } from "react-icons/md"
import { useNavigate, useSearchParams } from "react-router-dom"
const Search = () => {
    const [queryParameters] = useSearchParams()
    const term = queryParameters.has("term") ? queryParameters.get("term") : ""
    const navigate = useNavigate()

    const [filter, setFilter] = useState({
        categories: "",
        genres: "",
        platforms: "",
    })

    const endPoint = `/search?term=${term}&categories=${filter.categories}&platform=${filter.platforms}&genre=${filter.genres}`

    useEffect(() => {
        navigate(endPoint)
    }, [endPoint])

    console.log("halo")

    const url = term && `/api/games${endPoint}`

    console.log(url)

    const { data, loading } = useFetch(url)

    return (
        <Layout>
            <div className="w-full pt-4">
                <div className="flex w-full pl-4  ">
                    <div className="flex w-full gap-4 py-4 text-sm ">
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
                    <FilterComponent searchFilter={[filter, setFilter]} />
                    <div className="grid h-full w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:w-5/6 xl:grid-cols-4">
                        {data?.map((game) => {
                            return (
                                <TopGameCard
                                    width="w-full"
                                    key={game._id}
                                    src={game.background_image}
                                    title={game.name}
                                    rating={game.rating}
                                    id={game._id}
                                    platforms={game.parent_platforms}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const FilterComponent = ({ searchFilter }) => {
    const [showFilter, setShowFilter] = useState({
        Categories: true,
        Platforms: true,
        Genres: false,
    })
    const [queryParameters] = useSearchParams()
    const [filter, setFilter] = searchFilter
    console.log(filter)

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

    const filterCategories = (event) => {
        if (filter.categories && filter.categories === event.target.id) {
            return setFilter((current) => {
                return { ...current, categories: "" }
            })
        }
        if (event.target.id === "relevance") {
            return setFilter((current) => {
                return { ...current, categories: "" }
            })
        }
        return setFilter((current) => {
            return { ...current, categories: event.target.id }
        })
    }

    const filterPlatforms = (event) => {
        if (filter.platforms && filter.platforms === event.target.id) {
            return setFilter((current) => {
                return { ...current, platforms: "" }
            })
        }
        return setFilter((current) => {
            return { ...current, platforms: event.target.id }
        })
    }

    const filterGenres = (event) => {
        if (filter.genres && filter.genres === event.target.id) {
            return setFilter((current) => {
                return { ...current, genres: "" }
            })
        }
        return setFilter((current) => {
            return { ...current, genres: event.target.id }
        })
    }
    return (
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
                            <li
                                id="relevance"
                                onClick={filterCategories}
                                className="cursor-pointer p-2"
                            >
                                Relevance
                            </li>
                            <li
                                id="name"
                                onClick={filterCategories}
                                className="cursor-pointer p-2"
                            >
                                Name
                            </li>
                            <li
                                id="released"
                                onClick={filterCategories}
                                className="cursor-pointer p-2"
                            >
                                Realease
                            </li>
                            <li
                                id="added"
                                onClick={filterCategories}
                                className="cursor-pointer p-2"
                            >
                                Popularity
                            </li>
                            <li
                                id="rating"
                                onClick={filterCategories}
                                className="cursor-pointer p-2"
                            >
                                Rating
                            </li>
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
                            <li
                                onClick={filterPlatforms}
                                id="playstation"
                                className="cursor-pointer p-2"
                            >
                                Playstation
                            </li>
                            <li
                                onClick={filterPlatforms}
                                id="pc"
                                className="cursor-pointer p-2"
                            >
                                PC
                            </li>
                            <li
                                onClick={filterPlatforms}
                                id="xbox"
                                className="cursor-pointer p-2"
                            >
                                Xbox
                            </li>
                            <li
                                onClick={filterPlatforms}
                                id="ios"
                                className="cursor-pointer p-2"
                            >
                                iOS
                            </li>
                            <li
                                onClick={filterPlatforms}
                                id="android"
                                className="cursor-pointer p-2"
                            >
                                Android
                            </li>
                            <li
                                onClick={filterPlatforms}
                                id="nintendo"
                                className="cursor-pointer p-2"
                            >
                                Nintendo
                            </li>
                            <li
                                onClick={filterPlatforms}
                                id="web"
                                className="cursor-pointer p-2"
                            >
                                Web
                            </li>
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
                            <li
                                onClick={filterGenres}
                                id="action"
                                className="cursor-pointer p-2"
                            >
                                Action
                            </li>
                            <li
                                onClick={filterGenres}
                                id="strategy"
                                className="cursor-pointer p-2"
                            >
                                Strategy
                            </li>
                            <li
                                onClick={filterGenres}
                                id="rpg"
                                className="cursor-pointer p-2"
                            >
                                RPG
                            </li>
                            <li
                                onClick={filterGenres}
                                id="shooter"
                                className="cursor-pointer p-2"
                            >
                                Shooter
                            </li>
                            <li
                                onClick={filterGenres}
                                id="adventure"
                                className="cursor-pointer p-2"
                            >
                                Adventure
                            </li>
                            <li
                                onClick={filterGenres}
                                id="puzzle"
                                className="cursor-pointer p-2"
                            >
                                Puzzle
                            </li>
                            <li
                                onClick={filterGenres}
                                id="racing"
                                className="cursor-pointer p-2"
                            >
                                Racing
                            </li>
                            <li
                                onClick={filterGenres}
                                id="sports"
                                className="cursor-pointer p-2"
                            >
                                Sports
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Search
