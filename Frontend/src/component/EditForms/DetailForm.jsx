import { forwardRef, useEffect, useState } from "react"
import DetailModal from "../DetailModal/DetailModal"

const DetailForm = forwardRef(function DetailForm(props, ref) {
    const [modelComponent, setModelComponent] = useState({
        genres: false,
        platforms: false,
        tags: false,
    })
    const { game } = props

    const handleAddGenres = () => {
        setModelComponent((preview) => {
            return { ...preview, genres: !preview.genres }
        })
    }

    const handleAddPlatforms = () => {
        setModelComponent((preview) => {
            return { ...preview, platforms: !preview.platforms }
        })
    }

    const handleAddTags = () => {
        setModelComponent((preview) => {
            return { ...preview, tags: !preview.tags }
        })
    }
    useEffect(() => {
        if (
            !(
                modelComponent.genres ||
                modelComponent.platforms ||
                modelComponent.tags
            )
        ) {
            document.body.classList.remove("body-screen")
        } else {
            document.body.classList.add("body-screen")
        }

        return () => document.body.classList.remove("body-screen")
    }, [modelComponent.genres, modelComponent.platforms, modelComponent.tags])

    return (
        <>
            <div
                ref={(element) => (ref.current.detail = element)}
                className="flex h-full  flex-col gap-4 rounded-md bg-neutral-800 px-8 py-6 text-neutral-300 shadow shadow-black focus-within:text-white"
            >
                <h1 className=" flex text-2xl font-semibold text-white">
                    Details
                </h1>
                <div className="flex w-full flex-col gap-2">
                    <label>Genres*</label>
                    <div className="flex flex-wrap gap-2 ">
                        <button
                            onClick={handleAddGenres}
                            className="flex items-center justify-center rounded-3xl bg-neutral-700 px-4 py-2"
                        >
                            + Add Genres
                        </button>
                        <div className="flex items-center justify-center rounded-3xl bg-neutral-900 px-4 py-2 text-lg">
                            {game?.genres?.[0].name}
                        </div>
                        <div className="flex items-center justify-center rounded-3xl bg-neutral-900 px-4 py-2 text-lg">
                            {game?.genres?.[1].name}
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-2">
                    <label>Platforms*</label>
                    <div className="flex flex-wrap gap-2 ">
                        <button
                            onClick={handleAddPlatforms}
                            className="flex items-center justify-center rounded-3xl bg-neutral-700 px-4 py-2"
                        >
                            + Add Platforms
                        </button>
                        <div className="flex items-center justify-center rounded-3xl bg-neutral-900 px-4 py-2 text-lg">
                            {game?.platforms?.[0].platform?.name}
                        </div>
                        <div className="flex items-center justify-center rounded-3xl bg-neutral-900 px-4 py-2 text-lg">
                            {game?.platforms?.[1].platform?.name}
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-2">
                    <label>Tags*</label>
                    <div className="flex flex-wrap gap-2 ">
                        <button
                            onClick={handleAddTags}
                            className="flex items-center justify-center rounded-3xl bg-neutral-700 px-4 py-2"
                        >
                            + Add Tags
                        </button>
                        <div className="flex items-center justify-center rounded-3xl bg-neutral-900 px-4 py-2 text-lg">
                            {game?.tags?.[0].name}
                        </div>
                        <div className="flex items-center justify-center rounded-3xl bg-neutral-900 px-4 py-2 text-lg">
                            {game?.tags?.[1].name}
                        </div>
                    </div>
                </div>
            </div>
            <DetailModal
                onClick={handleAddGenres}
                show={modelComponent.genres}
                title={game?.title}
                categories="Genres"
                data={{ genres: game?.genres }}
            />
            <DetailModal
                onClick={handleAddPlatforms}
                show={modelComponent.platforms}
                title={game?.title}
                categories="Platforms"
            />
            <DetailModal
                onClick={handleAddTags}
                show={modelComponent.tags}
                title={game?.title}
                categories="Tags"
            />
        </>
    )
})

export default DetailForm
