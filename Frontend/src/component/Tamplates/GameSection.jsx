import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import TopGameCard from "../Card/TopGameCard"
import { Link } from "react-router-dom"
import useFetch from "@/hook/useFetch"
import { useState } from "react"

const GameSection = ({ getBy, title }) => {
    const [skipData, setSkipData] = useState(false)
    const [tampil, setTampil] = useState(false)

    const { data, loading } = useFetch(
        `${import.meta.env.VITE_REACT_APP_DEV_MODE}/games/${getBy}?limit=10`
    )

    const nextCard = () => {
        setSkipData((skip) => !skip)
        setTampil(true)
    }

    const previousCard = () => {
        setSkipData((skip) => !skip)
        setTampil(true)
    }

    return (
        <>
            <div className="flex h-full w-full">
                <div className="flex w-full justify-between ">
                    <div className="text-xl font-bold">{title}</div>
                    <Link className="z-[50] flex cursor-pointer items-center text-base font-normal">
                        More
                        <IoIosArrowForward />
                    </Link>
                </div>
            </div>
            <div className=" z-[50] flex h-full  w-full gap-4">
                {tampil &&
                    data?.map((game, index) => {
                        return (
                            index > 4 && (
                                <TopGameCard
                                    display={skipData ? "" : "hidden"}
                                    key={game._id}
                                    src={game.background_image}
                                    title={game.name}
                                    rating={game.rating}
                                    loading={loading}
                                    id={game._id}
                                />
                            )
                        )
                    })}
                {data?.map((game, index) => {
                    return (
                        index < 5 && (
                            <TopGameCard
                                display={skipData ? "hidden" : ""}
                                key={game._id}
                                src={game.background_image}
                                title={game.name}
                                rating={game.rating}
                                loading={loading}
                                id={game._id}
                            />
                        )
                    )
                })}
            </div>
            <div className="absolute -left-3 -right-3  flex h-full w-auto items-center justify-between text-5xl text-black">
                <button
                    onClick={previousCard}
                    className="z-[50] flex h-[4rem] w-[3rem] cursor-pointer items-center justify-center rounded border-[1px] bg-white  active:bg-opacity-50 disabled:bg-black"
                >
                    <IoIosArrowBack />
                </button>

                <button
                    onClick={nextCard}
                    className="z-[50] flex h-[4rem] w-[3rem] cursor-pointer items-center justify-center rounded border-[1px] bg-white  active:bg-opacity-50 disabled:bg-black"
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </>
    )
}

export default GameSection
