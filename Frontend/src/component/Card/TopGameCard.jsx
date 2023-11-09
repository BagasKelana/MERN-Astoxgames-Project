import { memo } from "react"
import { Link } from "react-router-dom"

const TopGameCard = ({
    src,
    loading,
    title,
    rating,
    display,
    id,
    width = "w-[16rem]",
}) => {
    return (
        <div
            id="top-game-card"
            className={` ${display} h-fit min-h-[350px]  ${width}   overflow-hidden rounded shadow-sm shadow-black `}
        >
            {loading ? (
                <img
                    className="h-[350px] w-full animate-pulse object-cover blur "
                    src="images/loading.webp"
                />
            ) : (
                <Card src={src} title={title} rating={rating} id={id} />
            )}
        </div>
    )
}

const Card = memo(function Card({ title, rating, src, id }) {
    const titleParam = title?.split(" ").join("-").toLowerCase() || ""
    return (
        <Link to={`/game/${id}/${titleParam}`}>
            <div className="flex h-[280px] w-full overflow-hidden  ">
                <img
                    width={640}
                    height={360}
                    className="h-full w-full object-cover hover:scale-110  "
                    src={src}
                    alt="Deskripsi Gambar"
                    loading="lazy"
                />
            </div>
            <div className="flex h-fit min-h-[70px] w-full px-2 py-2">
                <div className="flex h-full w-full flex-col gap-2 ">
                    <div className="flex items-center gap-2">
                        <img
                            className="h-4 w-4"
                            src="images/logo-platform/pc.svg"
                            alt="icon-ps"
                            loading="lazy"
                        />
                        <img
                            className="h-4 w-4 "
                            src="images/logo-platform/playstation.svg"
                            alt="icon-ps"
                            loading="lazy"
                        />
                        <img
                            className="h-4 w-4"
                            src="images/logo-platform/xbox.svg"
                            alt="icon-ps"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex items-start justify-between font-bold ">
                        <div>{title}</div>
                        <div className="ml-2 flex items-center rounded-sm  bg-sky-700  px-2  py-0.5 text-xs  text-white max-xl:hidden">
                            {rating}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
})

export default TopGameCard
