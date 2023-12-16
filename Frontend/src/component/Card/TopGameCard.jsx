import { memo } from "react"
import { Link } from "react-router-dom"

const TopGameCard = ({
    src,
    title,
    rating,
    display,
    platforms,
    id,
    width = "w-[16rem]",
}) => {
    return (
        <div
            id="top-game-card"
            className={` ${display} h-fit min-h-[350px]  ${width}  overflow-hidden rounded shadow shadow-black `}
        >
            <Card
                src={src}
                title={title}
                rating={rating}
                id={id}
                platforms={platforms}
            />
        </div>
    )
}

const Card = memo(function Card({ title, rating, src, id, platforms }) {
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
