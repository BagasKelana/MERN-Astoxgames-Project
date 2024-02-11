import { memo, useState } from "react"
import useFetch from "@/hook/useFetch"
import SmallGameCard from "../Card/SmallGameCard"

const HomeCardsContent = memo(function HomeCardsContent({ urlBy }) {
    const [cardActive, setCardActive] = useState([
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ])

    const { data, loading } = useFetch(`/api/games/${urlBy}?limit=10`)

    const handleOnMouseEnter = (index) => {
        setCardActive(
            cardActive.map((v, i) => (i === index ? (v = true) : (v = false))),
        )
    }
    return (
        <>
            <div className={` flex h-full w-full flex-col gap-2  xl:w-3/4 `}>
                {data?.map((game, index) => {
                    return (
                        <SmallGameCard
                            onClick={() => handleOnMouseEnter(index)}
                            cardActive={cardActive[index]}
                            key={game._id}
                            src={`/api${game.card_image}`}
                            genres={game.genres}
                            title={game.name}
                            platforms={game.parent_platforms}
                            loading={loading}
                        />
                    )
                })}
            </div>
            {!loading &&
                cardActive.map((v, i) => {
                    return (
                        v && (
                            <div
                                key={data[i]._id}
                                className={` hidden h-[832px] w-1/4 flex-col gap-2 bg-gradient-to-r from-gray-700 to-gray-800  px-2 py-4 xl:flex `}
                            >
                                <div className="flex h-[160px] w-full flex-col gap-2">
                                    <div className="mb-2 flex w-full text-xl font-bold">
                                        {data[i].name}
                                    </div>
                                    <div className="flex w-full flex-col justify-between rounded-sm bg-gray-800 px-2 py-1 text-sm">
                                        <div>
                                            Ratings count :{" "}
                                            {data[i].ratings_count}
                                        </div>
                                        <div
                                            className={`${
                                                +data[i].rating > 4
                                                    ? "text-blue-400"
                                                    : "text-orange-400"
                                            }`}
                                        >
                                            {data[i].rating}
                                        </div>
                                    </div>
                                    <div className=" grid w-full grid-cols-3 gap-1 text-xs ">
                                        {data[i].genres.map((genre) => {
                                            return (
                                                <div
                                                    className="flex items-center justify-center rounded-sm bg-gray-800 px-2 py-1  "
                                                    key={genre.id}
                                                >
                                                    {genre.name.length > 10
                                                        ? genre.name.substring(
                                                              0,
                                                              10,
                                                          ) + "..."
                                                        : genre.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {data[i].short_screenshots.map((src, index) => {
                                    return (
                                        src.id > 0 &&
                                        index < 5 && (
                                            <div
                                                key={src.id}
                                                className="flex h-[160px] w-full overflow-hidden rounded shadow-sm shadow-black "
                                            >
                                                <img
                                                    width={1280}
                                                    height={720}
                                                    className=" object-cover "
                                                    src={src.image}
                                                    alt=""
                                                />
                                            </div>
                                        )
                                    )
                                })}
                            </div>
                        )
                    )
                })}
        </>
    )
})
export default HomeCardsContent
