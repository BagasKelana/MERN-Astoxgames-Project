import imageCompression from "browser-image-compression"
import image64 from "./image64"
import { useState, useEffect, useCallback } from "react"

const useCompress = (url) => {
    const [img, setImg] = useState()
    const [loading, setLoading] = useState(true)

    const compressImg = useCallback(async (imageFile) => {
        try {
            const options = {
                maxSizeMB: 0.08,
                maxWidthOrHeight: 1000,
            }
            const compressedFile = await imageCompression(imageFile, options)
            return await image64(compressedFile)
        } catch (error) {
            console.error(error)
            return null
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                if (response.url.includes("data:image/webp;base64")) {
                    setImg(response.url)
                    setLoading(false)
                    return
                }
                const blob = await response.blob()
                const imageFile = new File([blob], "file.jpg", {
                    type: "image/jpeg",
                })
                const compressedData = await compressImg(imageFile)
                if (compressedData) {
                    setImg(compressedData)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [compressImg, url])

    return { img, loading }
}

export default useCompress
