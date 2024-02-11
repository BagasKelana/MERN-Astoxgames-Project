import { EditGameContext } from "@/pages/EditGame"
import { forwardRef, useContext } from "react"

const GeneralInformationForm = forwardRef(
    function GeneralInformationForm(props, ref) {
        const { descriptionGame, setDescriptionGame } =
            useContext(EditGameContext)

        const handleOnChange = (event) => {
            setDescriptionGame((current) => {
                return { ...current, about_game: event.target.value }
            })
        }
        console.log(descriptionGame.about_game)

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
                            placeholder={descriptionGame?.name}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 ">
                    <div className="relative flex h-[150px] w-full rounded-md  ">
                        <img
                            className="h-full w-full  object-cover"
                            src={descriptionGame?.background_image}
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
                        onChange={handleOnChange}
                        name="about"
                        id="about"
                        className="min-h-[150px] w-full bg-neutral-900 px-4 py-2"
                        value={descriptionGame?.about_game}
                    />
                </div>
            </div>
        )
    },
)

export default GeneralInformationForm
