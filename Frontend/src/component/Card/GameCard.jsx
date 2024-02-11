import { forwardRef, memo } from "react"
import { Link } from "react-router-dom"
import { formatDate } from "@/utility/functionColection"

const GameCard = forwardRef(function GameCard(props, ref) {
    const {
        src,
        title,
        rating,
        display,
        platforms,
        genres,
        release_date,
        id,
        width = "w-[16rem]",
        height = "h-fit",
        popularity,
    } = props
    return (
        <>
            {ref ? (
                <div
                    ref={ref}
                    id="top-game-card"
                    className={`group relative ${display} ${height} min-h-[350px]  ${width}   rounded-md bg-neutral-800 shadow shadow-black `}
                >
                    <div className="static overflow-hidden rounded-md bg-neutral-800 shadow shadow-black hover:z-[30] group-hover:absolute  group-hover:scale-105 ">
                        <Card
                            src={src}
                            title={title}
                            rating={rating}
                            id={id}
                            platforms={platforms}
                            release_date={release_date}
                            genres={genres}
                            popularity={popularity}
                        />
                    </div>
                </div>
            ) : (
                <div
                    id="top-game-card"
                    className={`group relative ${display} ${height} min-h-[350px]  ${width}   rounded-md bg-neutral-800 shadow shadow-black `}
                >
                    <div className="static overflow-hidden rounded-md bg-neutral-800 shadow shadow-black hover:z-[30] group-hover:absolute  group-hover:scale-105 ">
                        <Card
                            src={src}
                            title={title}
                            rating={rating}
                            id={id}
                            platforms={platforms}
                            release_date={release_date}
                            genres={genres}
                            popularity={popularity}
                        />
                    </div>
                </div>
            )}
        </>
    )
})

const Card = memo(function Card({
    title,
    rating,
    src,
    id,
    platforms,
    release_date,
    genres,
    popularity,
}) {
    const titleParam = title?.split(" ").join("-").toLowerCase() || ""
    return (
        <>
            <div className="group/img-card relative flex h-[280px] w-full overflow-hidden  ">
                <img
                    width={640}
                    height={360}
                    className="h-full w-full object-cover group-hover/img-card:z-[19] group-hover/img-card:scale-110  "
                    src={src}
                    alt="Deskripsi Gambar"
                    loading="lazy"
                />
                <div
                    onClick={() => alert("halo")}
                    className="absolute top-0 z-[20] flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 transition-all duration-200 ease-in-out group-hover/img-card:scale-110 group-hover/img-card:opacity-100 "
                >
                    + Add to Favorite
                </div>
            </div>
            <div className="flex h-fit min-h-[70px] w-full p-4">
                <div className="flex h-full w-full flex-col gap-2 ">
                    <div className="flex items-center gap-2">
                        {platforms?.map((logo) => {
                            return (
                                <img
                                    width={512}
                                    height={512}
                                    key={logo.platform.slug}
                                    className={` h-[12px] w-[12px]`}
                                    src={`/images/logo-platform/${logo.platform.slug}.svg`}
                                    alt="logo"
                                />
                            )
                        })}
                    </div>
                    <div className="flex items-start justify-between font-bold ">
                        <div className="hover:text-sky-400">
                            <Link to={`/game/${id}/${titleParam}`}>
                                {title}{" "}
                            </Link>
                        </div>
                        <div className="ml-2 flex items-center rounded-sm  bg-sky-700  px-2  py-0.5 text-xs  text-white ">
                            {rating}
                        </div>
                    </div>
                    {(genres || release_date || popularity) && (
                        <div className="  hidden h-fit w-full group-hover:block ">
                            <table className=" w-full text-left text-xs text-neutral-400 ">
                                <tbody>
                                    <tr>
                                        <th className=" whitespace-nowrap pr-10 align-top font-light">
                                            {release_date && "Realist Date"}
                                        </th>
                                        <th className="text-end align-top font-light text-white">
                                            {release_date &&
                                                formatDate(release_date)}
                                        </th>
                                    </tr>

                                    <tr>
                                        <th className=" pr-10  align-top font-light">
                                            {genres && "Genres"}
                                        </th>
                                        <th className="text-end font-light text-white">
                                            {genres &&
                                                genres.map((genre, index) => {
                                                    return index ===
                                                        +genres.length - 1 ? (
                                                        <span key={index}>
                                                            <Link
                                                                to={`/search?term=&categories=&platform=&genre=${genre.slug}`}
                                                            >
                                                                {genre.name}
                                                            </Link>
                                                        </span>
                                                    ) : (
                                                        <span key={index}>
                                                            <Link
                                                                to={`/search?term=&categories=&platform=&genre=${genre.slug}`}
                                                            >
                                                                {`${genre.name}, `}
                                                            </Link>
                                                        </span>
                                                    )
                                                })}
                                        </th>
                                    </tr>

                                    <tr>
                                        <th className=" whitespace-nowrap  pr-10  align-top font-light">
                                            {popularity && "Added"}
                                        </th>
                                        <th className=" text-end align-top  font-light text-white">
                                            {popularity.toLocaleString()} Users
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
})

export default GameCard
