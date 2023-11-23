import { useState } from "react"
import useFetch from "@/hook/useFetch"
import SideImg from "./SideImg"

const Hero = () => {
    const { data } = useFetch(`/api/games/added?limit=6`)

    const [showMainImg, setShowMainImg] = useState([
        true,
        false,
        false,
        false,
        false,
        false,
        false,
    ])

    const [srcMainImg, setSrcMainIMg] = useState(0)

    const handleSideImg = (index) => {
        setShowMainImg(
            showMainImg.map((data, i) => {
                return +i === +index ? (data = true) : (data = false)
            }),
        )
        setSrcMainIMg(index)
    }

    return (
        <>
            <div className="h-full w-full select-none md:w-4/5">
                <img
                    width={1280}
                    height={720}
                    className=" h-full w-full rounded object-cover shadow shadow-black"
                    src={data?.[srcMainImg].background_image}
                    alt="IMG"
                />
            </div>
            <div className="flex h-full w-full gap-1 px-1 md:w-1/5 md:flex-col md:gap-4">
                {data?.map((game, index) => {
                    return (
                        <SideImg
                            src={game.background_image}
                            title={game.name}
                            key={game._id}
                            id={index}
                            show={showMainImg}
                            onClick={() => {
                                handleSideImg(index)
                            }}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Hero
