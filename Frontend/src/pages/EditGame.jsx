import Layout from "@/Layout/Layout"
import DetailForm from "@/component/EditForms/DetailForm"
import GeneralInformationForm from "@/component/EditForms/GeneralInformationForm"
import ScreenshotForm from "@/component/EditForms/ScreenshotForm"
import useFetch from "@/hook/useFetch"
import { createContext, useEffect, useRef, useState } from "react"

import { useParams } from "react-router-dom"

export const EditGameContext = createContext(null)

const EditGame = () => {
    const { id } = useParams()

    const ref = useRef({
        general: null,
        detail: null,
        screenshot: null,
        save: null,
    })

    const { data } = useFetch(`/api/games/game/${id}`)

    const [descriptionGame, setDescriptionGame] = useState({
        _id: null,
        name: null,
        about_game: null,
        background_image: null,
        parent_platforms: null,
        genres: null,
        tags: null,
        short_screenshots: null,
    })
    useEffect(() => {
        setDescriptionGame((current) => {
            return {
                ...current,
                _id: data?._id,
                about_game: data?.about_game,
                name: data?.name,
                background_image: data?.background_image,
                parent_platforms: data?.parent_platforms,
                genres: data?.genres,
                tags: data?.tags,
                short_screenshots: data?.short_screenshots,
            }
        })
    }, [
        data?.about_game,
        data?._id,
        data?.name,
        data?.background_image,
        data?.parent_platforms,
        data?.genres,
        data?.tags,
        data?.short_screenshots,
    ])

    return (
        <EditGameContext.Provider
            value={{ descriptionGame, setDescriptionGame }}
        >
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
                        "linear-gradient(180deg, rgba(15,15,15,0.8) 0%, rgb(15, 15, 15) 50%)",
                }}
            />
            <Layout>
                <div className="relative flex h-full w-full flex-col justify-center  px-32">
                    <div className="text-3xl font-bold">Description Game</div>
                    <div className="mt-10 flex h-full w-4/6 flex-col gap-10">
                        <GeneralInformationForm ref={ref} />
                        <DetailForm
                            game={{
                                title: data?.name,
                                genres: data?.genres,
                                platforms: data?.parent_platforms,
                                tags: data?.tags,
                            }}
                            ref={ref}
                        />
                        <ScreenshotForm ref={ref} />
                        <div
                            ref={(element) => (ref.current.save = element)}
                            className="w flex h-full flex-col gap-4 rounded-md bg-neutral-800 px-8 py-6 text-neutral-300 shadow shadow-black focus-within:text-white"
                        >
                            <div className="flex w-full gap-2">
                                <button className="rounded-md bg-sky-500  px-4 py-2 text-lg">
                                    Save Change
                                </button>
                                <button className="rounded-md bg-neutral-700 px-4 py-2 text-lg">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="fixed right-10 top-40 flex h-full w-2/6 flex-col  ">
                        <ul className="flex h-full w-full flex-col gap-4 px-8">
                            <li
                                onClick={() => {
                                    ref.current.general.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                        inline: "center",
                                    })
                                }}
                                className="cursor-pointer"
                            >
                                General information
                            </li>
                            <li
                                onClick={() => {
                                    ref.current.detail.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                        inline: "center",
                                    })
                                }}
                                className="cursor-pointer"
                            >
                                Details
                            </li>
                            <li
                                onClick={() => {
                                    ref.current.screenshot.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }}
                                className="cursor-pointer"
                            >
                                Screenshots
                            </li>
                            <li
                                className="cursor-pointer"
                                onClick={() => {
                                    ref.current.save.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }}
                            >
                                Save Change
                            </li>
                        </ul>
                    </div>
                </div>
            </Layout>
        </EditGameContext.Provider>
    )
}

export default EditGame
