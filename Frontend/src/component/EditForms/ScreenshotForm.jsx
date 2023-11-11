import { EditGameContext } from "@/pages/EditGame"
import axios from "axios"
import { forwardRef, useContext, useState } from "react"

const ScreenshotForm = forwardRef(function ScreenshotForm(props, ref) {
    const { descriptionGame, setDescriptionGame } = useContext(EditGameContext)

    const { game } = props

    const [files, setFiles] = useState()

    const handleFileChange = (event) => {
        setFiles(event.target.files)
        console.log(event.target.files)
    }

    const handleOnClick = async () => {
        try {
            const formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i])
            }
            console.log(formData.getAll("images"))

            const response = await axios("/api/upload", {
                method: "POST",
                data: formData,
            })
            const data = response.data
            console.log(data)
        } catch (err) {
            console.log(err)
        }
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

export default ScreenshotForm
