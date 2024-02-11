import useCompress from "@/hook/useCompress"
import useFetch from "@/hook/useFetch"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const Download = () => {
    const { data } = useFetch("/api/games/games-id")
    const [file, setFile] = useState(null)

    console.log(file)

    const setData = () => {
        setFile(() => data)
    }
    const { img } = useCompress(file)

    return (
        <div className="min-h-screen w-full ">
            <div className="flex h-screen w-full items-center justify-center">
                <input
                    onChange={(e) => console.log(e.target.files)}
                    type="file"
                />
                <button onClick={setData}>klik here</button>
            </div>
        </div>
    )
}

export default Download
