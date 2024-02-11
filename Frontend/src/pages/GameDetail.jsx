import useFetch from "@/hook/useFetch"
import { useEffect, useRef, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Layout from "@/Layout/Layout"
import TopGameCard from "@/component/Card/GameCard"

const GameDetail = () => {
    const { id, title } = useParams()

    const { data } = useFetch(`/api/games/game/${id}`)
    const [nav, setNav] = useState({
        nav1: null,
        nav2: null,
    })
    const ref = useRef({
        slider1: null,
        slider2: null,
    })
    useEffect(() => {
        setNav({ nav1: ref.slider1, nav2: ref.slider2 })
    }, [nav.nav1, nav.nav2])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        swipeToSlide: true,
        useTransform: true,
        easing: "easeIn",

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    const userRating = (data) => {
        const rating = +data
        let review = ""
        if (rating >= 4.5) {
            review = <span className="text-sky-400">Very Positive</span>
        } else if (rating >= 4 && rating < 4.5) {
            review = <span className="text-blue-400">Positive</span>
        } else {
            review = <span className="text-orange-400">Not Bad</span>
        }
        return review
    }

    function formatDate(inputDate) {
        const options = { month: "short", day: "numeric", year: "numeric" }
        const date = new Date(inputDate)
        console.log(date)
        const formattedDate = date.toLocaleDateString("en-US", options)
        return formattedDate
    }

    return (
        <>
            <div
                className="absolute top-0 h-screen w-full "
                style={{
                    backgroundImage: `url(${data?.background_image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            />
            <div
                className="absolute top-0 h-screen w-full "
                style={{
                    background:
                        "linear-gradient(180deg, rgba(15,15,15,0.8) 30%, rgb(15, 15, 15) 100%)",
                }}
            />
            <Layout>
                <div className="flex flex-col gap-4 px-10">
                    <h1 className="flex text-3xl font-bold tracking-wide">
                        {data?.name}
                    </h1>
                    <section className=" flex h-full flex-col gap-4 ">
                        <div className="flex  h-fit w-full flex-col gap-4  lg:flex-row ">
                            <div className="flex h-full w-full  flex-col gap-2  lg:w-4/6 ">
                                <div className="h-full w-full">
                                    <Slider
                                        nextArrow={<SampleNextArrow />}
                                        prevArrow={<SamplePrevArrow />}
                                        asNavFor={nav.nav2}
                                        ref={(slider) => (ref.slider1 = slider)}
                                    >
                                        {data?.short_screenshots.map(
                                            (screenshot) => {
                                                return (
                                                    <div
                                                        key={screenshot.id}
                                                        className=" aspect-video overflow-hidden  rounded-md  shadow shadow-black "
                                                    >
                                                        <img
                                                            className="object-cover "
                                                            src={
                                                                screenshot.image
                                                            }
                                                            alt="screenshot_game"
                                                        />
                                                    </div>
                                                )
                                            },
                                        )}
                                    </Slider>
                                </div>
                                <div className="hidden h-full w-full px-20 md:block lg:px-5 ">
                                    <Slider
                                        asNavFor={nav.nav1}
                                        ref={(slider) => (ref.slider2 = slider)}
                                        {...settings}
                                    >
                                        {data?.short_screenshots.map(
                                            (screenshot) => {
                                                return (
                                                    <div
                                                        key={screenshot.id}
                                                        className=" aspect-video overflow-hidden  px-2 shadow shadow-black "
                                                    >
                                                        <img
                                                            className=" h-full w-full  cursor-pointer  object-cover"
                                                            src={
                                                                screenshot.image
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                )
                                            },
                                        )}
                                    </Slider>
                                </div>
                            </div>
                            <div className="flex h-full w-full flex-col gap-4 overflow-hidden rounded bg-gradient-to-t from-[rgba(15,15,15)] to-transparent p-4  xl:w-2/6  ">
                                <img
                                    className="aspect-video rounded-md object-cover"
                                    src={data?.background_image}
                                    alt=""
                                />

                                <div className=" flex gap-4 text-sm">
                                    <div className="flex flex-col gap-2">
                                        <span>Title</span>
                                        <span>Realist Date</span>
                                        <span>Recommended</span>
                                        <span>Rating</span>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <span>{data?.name}</span>
                                        <span>
                                            {formatDate(data?.released)}
                                        </span>
                                        <span>
                                            {data?.suggestions_count.toLocaleString()}{" "}
                                            Users
                                        </span>
                                        {data?.rating &&
                                            userRating(data?.rating)}
                                    </div>
                                </div>
                                <div className="grid h-full w-full auto-cols-auto  grid-flow-col-dense grid-rows-3 gap-1">
                                    {data?.tags.map((tag, index) => {
                                        return (
                                            index <= 8 &&
                                            (index === 8 ? (
                                                <span
                                                    key={9}
                                                    className=" flex items-center justify-center  rounded bg-gray-800 bg-opacity-50 p-2  text-center text-xs text-sky-400"
                                                >
                                                    +
                                                </span>
                                            ) : (
                                                <span
                                                    key={tag._id}
                                                    className=" flex items-center justify-center rounded bg-gray-800 bg-opacity-50 p-2 text-center text-xs text-sky-400"
                                                >
                                                    {tag.name}
                                                </span>
                                            ))
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className=" main-section gap-2  ">
                        <div className="flex h-full w-full gap-2">
                            <div className="flex w-4/6 flex-col gap-4 ">
                                <div>
                                    <div className="text-xl font-bold">
                                        About Game
                                    </div>
                                    <p>{`Hello I'm bagas here, I hope we share a lot about our games and don't forget to write comments about your favorite games, let's share together about our game experiences`}</p>
                                </div>
                                <div className="flex h-full w-full flex-col gap-4">
                                    {data?.platforms.map((game) => {
                                        return (
                                            game.platform.slug === "pc" &&
                                            game.requirements_en !== null && (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: game
                                                            .requirements_en
                                                            .minimum,
                                                    }}
                                                />
                                            )
                                        )
                                    })}

                                    {data?.platforms.map((game) => {
                                        return (
                                            game.platform.slug === "pc" &&
                                            game.requirements_en !== null && (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: game
                                                            .requirements_en
                                                            .recommended,
                                                    }}
                                                />
                                            )
                                        )
                                    })}
                                </div>

                                <div>
                                    <div className="text-xl font-bold">
                                        About Me
                                    </div>
                                    <p>{`Hello I'm bagas here, I hope we share a lot about our games and don't forget to write comments about your favorite games, let's share together about our game experiences`}</p>
                                </div>
                            </div>
                            <div className="w-2/6 ">
                                <Link to={`/game/${id}/${title}/edit`}>
                                    <button className="flex w-full items-center justify-center gap-2 rounded-md bg-sky-600 p-4  ">
                                        <span>
                                            <FaEdit />
                                        </span>
                                        Edit The Game Info
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section className="main-section h-full gap-2">
                        <div>Game like {data?.name}</div>
                        <GameLike id={id} />
                    </section>
                </div>
            </Layout>
        </>
    )
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: "none", background: "red" }}
            onClick={onClick}
        />
    )
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: "none", background: "green" }}
            onClick={onClick}
        />
    )
}

const GameLike = ({ id }) => {
    const { data } = useFetch(`/api/games/games-like?id=${id}`)

    return (
        <div className="gird grid h-full w-full grid-cols-5 gap-3">
            {data?.map((value) => {
                return (
                    <TopGameCard
                        key={value._id}
                        width="w-full"
                        src={`/api${value.card_image}`}
                        title={value.name}
                        rating={value.rating}
                        platforms={value.parent_platforms}
                        id={value._id}
                    />
                )
            })}
        </div>
    )
}

export default GameDetail
