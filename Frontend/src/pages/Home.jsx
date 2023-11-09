import { useState } from "react"
import Hero from "@/component/Tamplates/Hero"

import GameSection from "../component/Tamplates/GameSection"
import HomeCardsContent from "@/component/Tamplates/HomeCardsContent"

import Layout from "@/Layout/Layout"

const Home = () => {
    return (
        <>
            <Layout>
                <article
                    role="banner"
                    className="flex h-screen w-full flex-col gap-2 md:h-[550px] md:flex-row  "
                >
                    <Hero />
                </article>
                <section className="main-section">
                    <GameSection getBy="rating" title="Top Rating Games" />
                </section>
                <section className="main-section  ">
                    <div className="flex h-full w-full">
                        <div className="flex w-full justify-between ">
                            <div className="text-xl font-bold">
                                Most Recommended
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="h-fit min-h-[500px] w-[800px] overflow-hidden rounded shadow-sm shadow-black ">
                            <div
                                style={{
                                    backgroundImage: `url(${"images/16427-3840x2160-desktop-4k-god-of-war-ragnarok-wallpaper-image.avif"})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    loading: "lazy",
                                }}
                                className="z-[50] flex h-full max-h-fit w-full flex-col "
                            >
                                <div className="flex h-[350px] " />
                                <div className="flex h-[150px] w-full flex-col justify-between gap-2 p-4">
                                    <div className="text-xl font-bold tracking-tight ">
                                        Game Of The Year 2018
                                    </div>
                                    <div className="w-5/6 text-xs leading-5 tracking-wide  opacity-70">
                                        Kratos battle begins, journey beyond the
                                        realm, Six of the nine realms of Norse
                                        mythology can be explored!
                                    </div>
                                    <button className=" flex h-[2.5rem] w-[6rem] items-center justify-center rounded bg-sky-700 px-2 py-2   ">
                                        Start Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="grid h-[500px] w-full grid-cols-2 grid-rows-2 gap-2">
                            <div className=" col-span-2 flex h-full w-full overflow-hidden rounded bg-blue-400 shadow-sm shadow-black ">
                                <img
                                    height={720}
                                    width={1280}
                                    className=" w-full object-cover object-top "
                                    src="images/assasin4.webp"
                                    alt="Recommended games"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex h-full w-full overflow-hidden rounded bg-blue-400 shadow-sm shadow-black ">
                                <img
                                    height={720}
                                    width={1280}
                                    className=" object-cover "
                                    src="images/pubg_2023_open_club_4k_5k_hd_pubg-1280x720.webp"
                                    alt="Recommended games"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex h-full w-full overflow-hidden rounded bg-blue-400 shadow-sm shadow-black ">
                                <img
                                    height={720}
                                    width={1280}
                                    className="object-cover "
                                    src="images/spider_man_miles_morales_hd_marvels_spider_man_2-1280x720.webp"
                                    alt="Recommended games"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="main-section">
                    <GameSection getBy="released" title="New Games" />
                </section>
                <section className="main-section">
                    <HomePageContent />
                </section>
                <section className="main-section">
                    <div className="flex h-[400px] w-full items-center overflow-hidden">
                        <div className="flex h-3/4 w-full gap-2">
                            <div className="h-full w-1/4 bg-images-alow bg-cover bg-center  ">
                                <div className="relative h-full shadow shadow-black">
                                    <div className="h-full overflow-hidden  ">
                                        <img
                                            src="images/genres-home/kratos__render__by_yessing_dfmag4u-375w-2x.png"
                                            alt="img-genre"
                                        />
                                    </div>
                                    <div className="absolute top-0 flex h-full w-full  text-xl font-bold">
                                        ...
                                    </div>
                                    <svg />
                                </div>
                            </div>
                            <div
                                className="h-full w-1/4 bg-cover bg-center  "
                                style={{
                                    backgroundImage:
                                        "url(images/genres-home/widen_1840x0.jpg)",
                                }}
                            >
                                <div className="relative h-full shadow shadow-black">
                                    <div className="h-full overflow-hidden hover:scale-125 ">
                                        <img
                                            width={500}
                                            height={1000}
                                            src="images/genres-home/alow.png"
                                            alt="img-genre"
                                        />
                                    </div>
                                    <div className="absolute top-0 flex h-full w-full  text-xl font-bold">
                                        ...
                                    </div>
                                    <svg />
                                </div>
                            </div>
                            <div className="h-full w-1/4 bg-images-alow bg-cover bg-center  ">
                                <div className="relative h-full shadow shadow-black">
                                    <div className="h-full overflow-hidden  ">
                                        <img
                                            src="images/genres-home/kratos__render__by_yessing_dfmag4u-375w-2x.png"
                                            alt="img-genre"
                                        />
                                    </div>
                                    <div className="absolute top-0 flex h-full w-full  text-xl font-bold">
                                        ...
                                    </div>
                                    <svg />
                                </div>
                            </div>
                            <div
                                className="h-full w-1/4 bg-cover bg-center  "
                                style={{
                                    backgroundImage:
                                        "url(images/genres-home/widen_1840x0.jpg)",
                                }}
                            >
                                <div className="relative h-full shadow shadow-black">
                                    <div className="h-full overflow-hidden hover:scale-125 ">
                                        <img
                                            width={500}
                                            height={1000}
                                            src="images/genres-home/alow.png"
                                            alt="img-genre"
                                        />
                                    </div>
                                    <div className="absolute top-0 flex h-full w-full  text-xl font-bold">
                                        ...
                                    </div>
                                    <svg />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

const HomePageContent = () => {
    const [showHomeCards, setShowHomeCards] = useState([
        true,
        false,
        false,
        false,
    ])

    const changeHomeCards = (e) => {
        setShowHomeCards(showHomeCards.map((v, i) => (i === e ? true : false)))
    }

    return (
        <div className="px flex w-full flex-col items-center ">
            <div className="bg-blue relative flex w-full justify-between px-4 md:w-4/5 md:px-0">
                <ul className="flex h-full w-full text-xs md:text-base">
                    <li
                        key={1}
                        onClick={() => {
                            changeHomeCards(0)
                        }}
                        className={` ${
                            showHomeCards[0] ? "main_list_games" : ""
                        }  flex cursor-pointer items-center px-4 py-2 `}
                    >
                        New Release
                    </li>
                    <li
                        key={2}
                        onClick={() => {
                            changeHomeCards(1)
                        }}
                        className={` ${
                            showHomeCards[1] ? "main_list_games" : ""
                        }  flex cursor-pointer items-center px-4 py-2 `}
                    >
                        Most Played
                    </li>
                    <li
                        key={3}
                        onClick={() => {
                            changeHomeCards(2)
                        }}
                        className={` ${
                            showHomeCards[2] ? "main_list_games" : ""
                        }  flex cursor-pointer items-center px-4 py-2 `}
                    >
                        Most Recommended
                    </li>
                    <li
                        key={4}
                        onClick={() => {
                            changeHomeCards(3)
                        }}
                        className={` ${
                            showHomeCards[3] ? "main_list_games" : ""
                        }  flex cursor-pointer items-center px-4 py-2 `}
                    >
                        Coming Soon
                    </li>
                </ul>
            </div>
            <div className="flex h-full w-full p-4">
                <div
                    className={`${
                        showHomeCards[0] ? "flex" : "hidden"
                    }  h-full w-full  `}
                >
                    <HomeCardsContent urlBy="released" />
                </div>
                <div
                    className={`${
                        showHomeCards[1] ? "flex" : "hidden"
                    }  h-full w-full `}
                >
                    <HomeCardsContent urlBy="added" />
                </div>
                <div
                    className={`${
                        showHomeCards[2] ? "flex" : "hidden"
                    }  h-full w-full `}
                >
                    <HomeCardsContent urlBy="rating" />
                </div>
                <div
                    className={`${
                        showHomeCards[3] ? "flex" : "hidden"
                    }  h-full w-full  `}
                >
                    <HomeCardsContent urlBy="name" />
                </div>
            </div>
        </div>
    )
}

export default Home
