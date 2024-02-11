import Layout from "@/Layout/Layout"
import useFetch from "@/hook/useFetch"
import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { MdArrowForwardIos } from "react-icons/md"
import { useNavigate, useSearchParams } from "react-router-dom"
import { filterList } from "@/assets/filterList"
import GameCard from "@/component/Card/GameCard"
import useInfiniteSearch from "@/hook/useInfiniteSearch"

const Search = () => {
    const [queryParameters] = useSearchParams()

    const [filter, setFilter] = useState({
        term: queryParameters.get("term"),
        genres: queryParameters.get("genre"),
        categories: queryParameters.get("categories"),
        platforms: queryParameters.get("platform"),
    })
    const [pageNum, setPageNum] = useState({
        skip: 0,
        limit: 12,
        page: 1,
    })
    console.log(filter)

    useEffect(() => {
        let initialFilterState = {
            term: queryParameters.get("term"),
            genres: queryParameters.get("genre"),
            categories: queryParameters.get("categories"),
            platforms: queryParameters.get("platform"),
        }
        {
            setFilter((current) => ({
                ...current,
                ...initialFilterState,
            }))
        }
        return () =>
            setPageNum((current) => ({
                ...current,
                skip: 0,
                limit: 12,
                page: 1,
            }))
    }, [queryParameters])

    const querySearch = useMemo(() => {
        return `/search?term=${filter.term || ""}&categories=${
            filter.categories || ""
        }&platform=${filter.platforms || ""}&genre=${filter.genres || ""}`
    }, [filter])

    const url = `/api/games`

    const { data, loading, error, hasNextData } = useInfiniteSearch(
        url,
        pageNum.skip,
        querySearch,
    )

    const intObserver = useRef()
    const lastPostRef = useCallback(
        (post) => {
            if (loading) return

            if (intObserver.current) intObserver.current.disconnect()

            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && hasNextData) {
                    console.log("We are near the last post!")
                    setPageNum((prev) => ({
                        ...prev,
                        skip: prev.limit * prev.page,
                        page: prev.page + 1,
                    }))
                }
            })

            if (post) intObserver.current.observe(post)
        },
        [loading, hasNextData],
    )

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
                    <div className="grid h-full w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:w-5/6 xl:grid-cols-3">
                        {data?.map((game, index) => {
                            return index === data?.length - 1 ? (
                                <GameCard
                                    ref={lastPostRef}
                                    width="w-full"
                                    key={game._id}
                                    src={
                                        game.card_image
                                            ? `/api${game.card_image}`
                                            : game.background_image
                                    }
                                    title={game.name}
                                    rating={game.rating}
                                    id={game._id}
                                    platforms={game.parent_platforms}
                                    genres={game.genres}
                                    release_date={game.released}
                                    popularity={game.added}
                                />
                            ) : (
                                <GameCard
                                    width="w-full"
                                    key={game._id}
                                    src={
                                        game.card_image
                                            ? `/api${game.card_image}`
                                            : game.background_image
                                    }
                                    title={game.name}
                                    rating={game.rating}
                                    id={game._id}
                                    platforms={game.parent_platforms}
                                    genres={game.genres}
                                    release_date={game.released}
                                    popularity={game.added}
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
    const [queryParameters, setQueryParameters] = useSearchParams()
    const [showFilter, setShowFilter] = useState({
        Categories: true,
        Platforms: true,
        Genres: false,
    })

    const [filter, setFilter] = searchFilter

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
            queryParameters.set("categories", "")
            return setQueryParameters(queryParameters)
        }
        if (event.target.id === "relevance") {
            queryParameters.set("categories", "")
            return setQueryParameters(queryParameters)
        }

        queryParameters.set("categories", event.target.id)
        return setQueryParameters(queryParameters)
    }

    const filterPlatforms = (event) => {
        if (filter.platforms && filter.platforms === event.target.id) {
            queryParameters.set("platform", "")
            return setQueryParameters(queryParameters)
        }
        queryParameters.set("platform", event.target.id)
        return setQueryParameters(queryParameters)
    }

    const filterGenres = (event) => {
        if (filter.genres && filter.genres === event.target.id) {
            queryParameters.set("genre", "")
            return setQueryParameters(queryParameters)
        }
        queryParameters.set("genre", event.target.id)
        return setQueryParameters(queryParameters)
    }
    const handleShowAllGames = () => {
        queryParameters.set("term", "")
        queryParameters.set("genre", "")
        queryParameters.set("platform", "")
        queryParameters.set("categories", "")
        return setQueryParameters(queryParameters)
    }

    return (
        <div className=" hidden h-full w-1/6 flex-col gap-4 p-4  xl:flex ">
            <div>Filter</div>
            <div className="h-full w-full shadow shadow-black">
                <div className="flex w-full flex-col ">
                    <div>
                        <div
                            onClick={handleShowAllGames}
                            className="flex cursor-pointer items-center justify-between p-2 shadow shadow-black "
                        >
                            <div>All Games</div>
                        </div>
                        <div
                            onClick={handleShowCategoris}
                            className="flex cursor-pointer items-center justify-between p-2 shadow shadow-black "
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
                            {filterList.Categories.map((list, index) => {
                                return list.id === filter.categories ||
                                    (filter.categories === "" &&
                                        list.id === "relevance") ? (
                                    <List
                                        className={"bg-blue-600"}
                                        key={index}
                                        onClick={filterCategories}
                                        id={list.id}
                                    >
                                        {list.value}
                                    </List>
                                ) : (
                                    <List
                                        key={index}
                                        onClick={filterCategories}
                                        id={list.id}
                                    >
                                        {list.value}
                                    </List>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <div
                            onClick={handleShowPlatforms}
                            className="flex items-center justify-between p-2 shadow shadow-black  "
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
                            {filterList.Platforms.map((list, index) => {
                                return list.id === filter.platforms ? (
                                    <List
                                        className={"bg-blue-600"}
                                        key={index}
                                        onClick={filterPlatforms}
                                        id={list.id}
                                    >
                                        {list.value}
                                    </List>
                                ) : (
                                    <List
                                        key={index}
                                        onClick={filterPlatforms}
                                        id={list.id}
                                    >
                                        {list.value}
                                    </List>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <div
                            onClick={handleShowGenres}
                            className="flex items-center justify-between p-2 shadow shadow-black "
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
                            {filterList.Genres.map((list, index) => {
                                return list.id === filter.genres ? (
                                    <List
                                        className={"bg-blue-600"}
                                        key={index}
                                        onClick={filterGenres}
                                        id={list.id}
                                    >
                                        {list.value}
                                    </List>
                                ) : (
                                    <List
                                        key={index}
                                        onClick={filterGenres}
                                        id={list.id}
                                    >
                                        {list.value}
                                    </List>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const List = ({ onClick, id, children, className }) => {
    return (
        <li
            onClick={onClick}
            id={id}
            className={`${className} cursor-pointer p-2`}
        >
            {children}
        </li>
    )
}

export default Search
