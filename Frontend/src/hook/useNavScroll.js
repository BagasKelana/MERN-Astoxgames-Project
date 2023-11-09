import { useEffect, useState } from "react"

const useNavScroll = () => {
    const [topScreen, setTopScreen] = useState(false)
    useEffect(() => {
        const data = window.addEventListener(
            "scroll",
            () => {
                if (window.scrollY < 60) {
                    setTopScreen(true)
                } else if (window.scrollY > 60) {
                    setTopScreen(false)
                }
                return window.removeEventListener(data)
            },
            [topScreen]
        )
    })
    return { topScreen }
}

export default useNavScroll
