import { memo } from "react"
import { Link } from "react-router-dom"

const SmallGameCard = (props) => {
    const { src, title, platforms, genres, cardActive, onClick } = props

    return (
        <div onClick={onClick} className="flex w-full   ">
            <ImageSmallCard src={src} />
            <div
                className={`${
                    cardActive && "bg-gray-700 "
                } flex w-full justify-between py-2 pl-4 pr-6  `}
            >
                <div className="flex h-full flex-col gap-1">
                    <div className="font-medium tracking-tight">{title}</div>
                    <div className="flex gap-2">
                        {platforms?.map((logo) => {
                            return (
                                <img
                                    width={512}
                                    height={512}
                                    key={logo.platform.slug}
                                    className={` h-[12px] w-[12px]`}
                                    src={`images/logo-platform/${logo.platform.slug}.svg`}
                                    alt="logo"
                                />
                            )
                        })}
                    </div>
                    <div className="text-xs font-extralight tracking-wider ">
                        {genres?.map((genre, index) => {
                            return index === genres.length - 1 ? (
                                <span key={index}>{genre.name} </span>
                            ) : (
                                <span key={index}>{genre.name}, </span>
                            )
                        })}
                    </div>
                </div>
                <div className=" mr-2 flex h-full items-center">
                    <button className="rounded bg-sky-600 px-2 py-1 text-white">
                        <Link>Get Ready</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

const ImageSmallCard = memo(function ImageSmallCard({ src }) {
    return (
        <div className="h-[76px] w-[200px] ">
            <img
                width={640}
                height={360}
                className=" h-full object-cover"
                src={src}
                alt="img-small-card"
                loading="lazy"
            />
        </div>
    )
})

export default SmallGameCard
