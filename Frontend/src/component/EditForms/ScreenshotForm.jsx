import { EditGameContext } from "@/pages/EditGame"
import { current } from "@reduxjs/toolkit"
import axios from "axios"
import { forwardRef, useContext, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { MdFindReplace, MdRestore } from "react-icons/md"

const ScreenshotForm = forwardRef(function ScreenshotForm(props, ref) {
    const { descriptionGame, setDescriptionGame } = useContext(EditGameContext)

    const [files, setFiles] = useState()

    const handleFileChange = (event) => {
        setFiles(event.target.files)
        console.log(event.target.files)
    }

    const handleOnClick = async () => {
        try {
            const formData = new FormData()
            const title = await descriptionGame?.name
                .split(" ")
                .join("-")
                .toLowerCase()

            const id = await descriptionGame?._id

            formData.append("title", title)
            formData.append("_id", id)

            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i])
            }

            const response = await axios("/api/upload", {
                method: "POST",
                data: formData,
            })
            const data = response.data.responseSuccess
            console.log(data)
            setDescriptionGame((current) => {
                return {
                    ...current,
                    short_screenshots: [...current.short_screenshots, ...data],
                }
            })
            setFiles(() => {
                return null
            })
        } catch (err) {
            console.log(err)
        }
    }

    const deleteScreenshot = (index) => {
        console.log(index)
        setDescriptionGame((current) => {
            return {
                ...current,
                short_screenshots: current.short_screenshots.map(
                    (screenshot, i) => {
                        return i === index
                            ? { ...screenshot, delete: true }
                            : screenshot
                    },
                ),
            }
        })
        console.log(descriptionGame)
    }

    const restoreScreenshot = (index) => {
        setDescriptionGame((current) => {
            return {
                ...current,
                short_screenshots: current.short_screenshots.map(
                    (screenshot, i) => {
                        return i === index
                            ? { ...screenshot, delete: false }
                            : screenshot
                    },
                ),
            }
        })
        console.log(descriptionGame)
    }

    const replaceScreenshot = async (e) => {
        try {
            console.log(e.target.files[0])
            const index = e.target.id.split("-")
            const file = e.target.files[0]
            console.log(file)
            const formData = new FormData()
            const title = await descriptionGame?.name
                .split(" ")
                .join("-")
                .toLowerCase()

            const id = await descriptionGame?._id

            formData.append("title", title)
            formData.append("_id", id)

            formData.append("images", file)
            console.log(formData.getAll("images"))

            const response = await axios("/api/replace", {
                method: "POST",
                data: formData,
            })
            const [data] = response.data.responseSuccess
            console.log(data)

            setDescriptionGame((current) => {
                return {
                    ...current,
                    short_screenshots: current.short_screenshots.map(
                        (screenshot, i) => {
                            return i === +index[1]
                                ? { ...screenshot, ...data }
                                : screenshot
                        },
                    ),
                }
            })
        } catch (err) {
            console.log(err)
        }
        console.log(descriptionGame)
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
                    {descriptionGame?.short_screenshots?.map(
                        (screenshot, index) => {
                            return (
                                index !== 0 && (
                                    <div
                                        key={index}
                                        className={`${
                                            screenshot?.upload &&
                                            "outline outline-green-600"
                                        }  group relative overflow-hidden rounded-md  shadow shadow-black `}
                                    >
                                        <img
                                            className="aspect-video object-cover"
                                            src={screenshot.image}
                                            alt=""
                                        />
                                        {screenshot.delete ? (
                                            <div className=" absolute top-0  flex h-full   w-full flex-col items-center justify-center bg-black bg-opacity-75">
                                                <button
                                                    onClick={() => {
                                                        restoreScreenshot(index)
                                                    }}
                                                    className="group/replace flex w-24 items-center gap-3  opacity-70 hover:opacity-100"
                                                >
                                                    <span className="flex rounded-full bg-neutral-800 p-0.5 group-hover/replace:bg-white group-hover/replace:text-black">
                                                        <MdRestore />
                                                    </span>
                                                    <div>Restore</div>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className=" absolute top-0  hidden h-full w-full   flex-col items-center justify-center hover:bg-black hover:bg-opacity-75 group-hover:flex">
                                                <label
                                                    className=" group/replace flex w-24 cursor-pointer items-center gap-3  opacity-70 hover:opacity-100"
                                                    htmlFor={`replace-${index}`}
                                                >
                                                    <span className="flex rounded-full bg-neutral-800 p-0.5 group-hover/replace:bg-white group-hover/replace:text-black">
                                                        <MdFindReplace />
                                                    </span>
                                                    <div>Replace</div>
                                                    <input
                                                        onChange={
                                                            replaceScreenshot
                                                        }
                                                        accept="image/png, image/gif, image/jpeg, image/webp"
                                                        name={`replace-${index}`}
                                                        id={`replace-${index}`}
                                                        type="file"
                                                        className="hidden"
                                                    />
                                                </label>

                                                <button
                                                    onClick={() => {
                                                        deleteScreenshot(index)
                                                    }}
                                                    className="group/delete flex w-24 items-center gap-3  opacity-70 hover:opacity-100"
                                                >
                                                    <span className="rounded-full bg-neutral-800 p-0.5 group-hover/delete:bg-white group-hover/delete:text-black">
                                                        <IoMdClose />
                                                    </span>
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                            )
                        },
                    )}
                </div>
            </div>
        </div>
    )
})

export default ScreenshotForm
