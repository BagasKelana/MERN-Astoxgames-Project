import { memo } from "react"
const SideImg = memo(function SideImg({ src, title, show, id, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`${
                show?.[id]
                    ? "bg-gradient-to-br from-gray-600 to-gray-700"
                    : "bg-none"
            } group flex h-20 w-full cursor-pointer flex-col gap-2 rounded p-1 shadow shadow-black md:flex-row  md:p-2`}
        >
            <div className="flex  h-full w-full select-none items-center justify-center md:w-2/6">
                <img
                    width={640}
                    height={360}
                    className="h-full w-full rounded object-cover group-hover:scale-110"
                    src={src}
                    alt="sideImg"
                />
            </div>
            <div className="hidden h-full w-full items-center md:flex md:w-4/6 ">
                <p className="text-sm leading-5 tracking-wide">{title}</p>
            </div>
        </div>
    )
})

export default SideImg
