import Layout from "@/Layout/Layout"
import DetailForm from "@/component/EditForms/DetailForm"
import useFetch from "@/hook/useFetch"
import {
    createContext,
    forwardRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"

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

    const { data } = useFetch(
        `${import.meta.env.VITE_REACT_APP_DEV_MODE}/games/game/${id}`,
    )

    const [descriptionGame, setDescriptionGame] = useState({
        name: null,
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
                name: data?.name,
                background_image: data?.background_image,
                parent_platforms: data?.parent_platforms,
                genres: data?.genres,
                tags: data?.tags,
                short_screenshots: data?.short_screenshots,
            }
        })
    }, [
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
                        <GeneralInformationForm
                            game={{
                                title: data?.name,
                                cover: data?.background_image,
                                about: data?.about_game,
                            }}
                            ref={ref}
                        />
                        <DetailForm
                            game={{
                                title: data?.name,
                                genres: data?.genres,
                                platforms: data?.parent_platforms,
                                tags: data?.tags,
                            }}
                            ref={ref}
                        />
                        <ScreenshotForm
                            game={{
                                title: data?.name,
                                screenshoot: data?.short_screenshots,
                            }}
                            ref={ref}
                        />
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

const GeneralInformationForm = forwardRef(
    function GeneralInformationForm(props, ref) {
        const { game } = props
        return (
            <div
                ref={(element) => (ref.current.general = element)}
                className="flex h-full flex-col gap-4  rounded-md bg-neutral-800 p-8 text-neutral-300 shadow shadow-black focus-within:text-white  "
            >
                <div className="text-2xl font-semibold text-white">
                    General information
                </div>

                <div className="flex w-full flex-col gap-2 ">
                    <label htmlFor="title">Title*</label>
                    <div className="w-full bg-neutral-900 px-4 py-2">
                        <input
                            id="title"
                            name="title"
                            className="w-full bg-transparent placeholder-neutral-300 outline-none"
                            type="text"
                            placeholder={game?.title}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 ">
                    <label htmlFor="cover">Cover*</label>
                    <div className="relative flex h-[150px] w-full rounded-md  ">
                        <img
                            className="h-full w-full  object-cover"
                            src={game?.cover}
                            alt=""
                        />
                        <label
                            className=" absolute z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-md border-[2px] border-white bg-zinc-900 bg-opacity-30 px-4 py-2 hover:border-[2px] hover:bg-opacity-70"
                            htmlFor="cover"
                        >
                            <div>{"+ Change Images"}</div>

                            <input
                                id="cover"
                                name="cover"
                                className="hidden w-full"
                                type="file"
                                autoComplete="false"
                            />
                        </label>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="about">About*</label>
                    <textarea
                        name="about"
                        id="about"
                        className="min-h-[150px] w-full bg-neutral-900 px-4 py-2"
                        value={game?.about}
                    ></textarea>
                </div>
            </div>
        )
    },
)

const ScreenshotForm = forwardRef(function ScreenshotForm(props, ref) {
    const { descriptionGame, setDescriptionGame } = useContext(EditGameContext)
    const { game } = props
    const [file, setFile] = useState(null)
    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }
    const handleOnClick = () => {
        console.log(file)
    }
    return (
        <div
            ref={(element) => (ref.current.screenshot = element)}
            className="flex h-full flex-col gap-4 rounded-md bg-neutral-800 px-8 py-6 text-neutral-300 shadow shadow-black focus-within:text-white"
        >
            <div className="text-2xl font-semibold text-white">Screenshots</div>
            <div className="flex w-full flex-col gap-4">
                <label
                    className=" flex w-fit cursor-pointer items-center justify-center rounded-3xl bg-neutral-700 px-4 py-2"
                    htmlFor="screenshots"
                >
                    + Add Screenshots
                    <input
                        onChange={handleFileChange}
                        accept="image/png, image/gif, image/jpeg, image/webp"
                        name="screenshots"
                        id="screenshots"
                        type="file"
                        className="hidden"
                        multiple
                    />
                </label>
                <button onClick={handleOnClick}>click here</button>
                <div className="grid grid-cols-3 gap-4">
                    {game?.screenshoot?.map((screenshot, index) => {
                        return (
                            index !== 0 && (
                                <div
                                    key={index}
                                    className=" overflow-hidden rounded-md shadow shadow-black "
                                >
                                    <img
                                        className="h-full object-cover"
                                        src={screenshot.image}
                                        alt=""
                                    />
                                </div>
                            )
                        )
                    })}
                </div>
            </div>
        </div>
    )
})

export default EditGame
