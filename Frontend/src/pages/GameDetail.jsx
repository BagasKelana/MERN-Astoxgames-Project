import useFetch from "@/hook/useFetch"
import { useEffect, useRef, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Layout from "@/Layout/Layout"

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
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 1,
        swipeToSlide: true,
        focusOnSelect: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
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
  

    return (
        <>
            <div
                className="absolute top-0 h-screen w-full"
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
                    <section className=" flex h-full   flex-col gap-4 ">
                        <div className="flex h-full w-full gap-4 ">
                            <div className="flex h-full w-4/6 flex-col gap-2 ">
                                <Slider
                                    nextArrow={<SampleNextArrow />}
                                    prevArrow={<SamplePrevArrow />}
                                    asNavFor={nav.nav2}
                                    ref={(slider) => (ref.slider1 = slider)}
                                >
                                    {data?.short_screenshots.map(
                                        (screenshot, index) => {
                                            return (
                                                index != 0 && (
                                                    <div
                                                        key={screenshot.id}
                                                        className=" aspect-video   overflow-hidden rounded-lg  shadow shadow-black "
                                                    >
                                                        <img
                                                            className="  object-cover "
                                                            src={
                                                                screenshot.image
                                                            }
                                                            alt="screenshot_game"
                                                        />
                                                    </div>
                                                )
                                            )
                                        },
                                    )}
                                </Slider>

                                <div className="  w-full px-36">
                                    <Slider
                                        asNavFor={nav.nav1}
                                        ref={(slider) => (ref.slider2 = slider)}
                                        {...settings}
                                    >
                                        {data?.short_screenshots.map(
                                            (screenshot, index) => {
                                                return (
                                                    index != 0 && (
                                                        <div
                                                            key={screenshot.id}
                                                            className=" aspect-video overflow-hidden  px-2 shadow shadow-black "
                                                        >
                                                            <img
                                                                className=" h-full w-full   cursor-pointer rounded-md object-cover   "
                                                                src={
                                                                    screenshot.image
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                    )
                                                )
                                            },
                                        )}
                                    </Slider>
                                </div>
                            </div>
                            <div className=" flex h-full w-2/6 flex-col gap-4 overflow-hidden rounded   bg-gradient-to-t from-[rgba(15,15,15)] to-transparent  p-4  ">
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
                                            {data?.released.substring(0, 10)}
                                        </span>
                                        <span>
                                            {data?.suggestions_count} Users
                                        </span>
                                        {data?.rating &&
                                            userRating(data?.rating)}
                                    </div>
                                </div>
                                <div className="grid h-full w-full auto-cols-auto  grid-flow-col-dense   grid-rows-3 gap-1">
                                    {data?.tags.map((tag, index) => {
                                        return (
                                            index <= 8 &&
                                            (index === 8 ? (
                                                <span
                                                    key={9}
                                                    className=" flex items-center justify-center  rounded bg-gray-800 bg-opacity-50 py-1  text-center text-xs text-sky-400"
                                                >
                                                    +
                                                </span>
                                            ) : (
                                                <span
                                                    key={tag._id}
                                                    className=" flex items-center justify-center rounded bg-gray-800 bg-opacity-50 py-1 text-center text-xs text-sky-400"
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
                    <section className=" main-section h-[500px]  gap-2  ">
                        <div className="flex h-full w-full gap-2">
                            <div className="flex w-4/6 flex-col gap-4 ">
                                <div>
                                    <div className="text-xl font-bold">
                                        About Game
                                    </div>
                                    <p>{`Hello I'm bagas here, I hope we share a lot about our games and don't forget to write comments about your favorite games, let's share together about our game experiences`}</p>
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

export default GameDetail
