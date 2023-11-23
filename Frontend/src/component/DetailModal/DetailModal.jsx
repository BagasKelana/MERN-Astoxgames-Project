import { EditGameContext } from "@/pages/EditGame"
import { useContext } from "react"
import { AiOutlineClose } from "react-icons/ai"

const DetailModal = ({ onClick, show, title, categories }) => {
    const { descriptionGame, setDescriptionGame } = useContext(EditGameContext)

    const handleOnKeyDown = (e) => {
        const { name, value } = e.target
        if (e.key === "Enter") {
            if (name === "parent_platforms") {
                value &&
                    setDescriptionGame((v) => {
                        return {
                            ...v,
                            [name]: [
                                ...v[name],
                                {
                                    platform: {
                                        name:
                                            value.charAt(0).toUpperCase() +
                                            value.slice(1),
                                        slug: value.toLowerCase(),
                                    },
                                },
                            ],
                        }
                    })
            } else {
                value &&
                    setDescriptionGame((v) => {
                        return {
                            ...v,
                            [name]: [
                                ...v[name],
                                {
                                    name:
                                        value.charAt(0).toUpperCase() +
                                        value.slice(1),
                                    slug: value.toLowerCase(),
                                },
                            ],
                        }
                    })
            }
            e.target.value = ""
        }
    }

    return (
        <div
            className={`${
                !show && "hidden "
            } fixed left-0  top-0  z-[100] flex h-screen  w-full items-center  justify-center overflow-hidden `}
        >
            <div className=" relative z-[150] flex h-3/5 w-3/5 items-center gap-2 rounded-md border border-white bg-neutral-800 p-6 ">
                <div className="flex h-full w-full flex-col gap-2">
                    <h1 className=" mb-4 text-3xl">
                        {categories}: {title}{" "}
                    </h1>
                    <label
                        htmlFor={
                            categories.toLowerCase() === "platforms"
                                ? "parent_platforms"
                                : categories.toLowerCase()
                        }
                    >
                        {categories}*
                    </label>
                    <div className=" h-[50px] w-full rounded border-[1px] border-white bg-neutral-900 px-4 py-2">
                        <input
                            onKeyDown={handleOnKeyDown}
                            name={
                                categories.toLowerCase() === "platforms"
                                    ? "parent_platforms"
                                    : categories.toLowerCase()
                            }
                            id={
                                categories.toLowerCase() === "platforms"
                                    ? "parent_platforms"
                                    : categories.toLowerCase()
                            }
                            placeholder={`Input new ${categories.toLowerCase()} here`}
                            className="h-full w-full bg-transparent outline-none  "
                            type="text"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 ">
                        {categories === "Genres" &&
                            descriptionGame.genres?.map((genre) => {
                                return (
                                    <div
                                        key={
                                            genre?._id ||
                                            (Math.random() + 1) * 100
                                        }
                                        className="flex items-center justify-center rounded-3xl bg-neutral-900 px-4 py-2 text-lg"
                                    >
                                        {genre.name}
                                    </div>
                                )
                            })}
                        {categories === "Platforms" &&
                            descriptionGame.parent_platforms?.map((game) => {
                                return (
                                    <div
                                        key={
                                            game._id ||
                                            (Math.random() + 1) * 100
                                        }
                                        className="flex items-center justify-center rounded-3xl bg-neutral-900 px-4 py-2 text-lg"
                                    >
                                        {game.platform.name}
                                    </div>
                                )
                            })}
                        {categories === "Tags" &&
                            descriptionGame.tags?.map((tag) => {
                                return (
                                    <div
                                        key={
                                            tag._id || (Math.random() + 1) * 100
                                        }
                                        className="flex items-center justify-center rounded-3xl bg-neutral-900 px-4 py-2 text-xs "
                                    >
                                        {tag.name}
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <button
                    onClick={onClick}
                    className=" absolute -right-4 -top-4  z-[151] rounded-full border border-white bg-black  p-4 text-xl text-white shadow shadow-black  "
                >
                    <span className=" text-3xl font-bold  ">
                        <AiOutlineClose />
                    </span>
                </button>
            </div>
            <div
                onClick={onClick}
                className=" absolute z-[100] h-full w-full bg-black bg-opacity-90"
            ></div>
        </div>
    )
}

export default DetailModal
