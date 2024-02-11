import axios from "axios"
import { useState, useEffect } from "react"
axios
const useFetch = (url = null) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller
        const fetchData = async () => {
            try {
                console.log(url)
                const res = await axios.get(url, { signal })

                if (res?.data) {
                    setData(res.data)
                } else {
                    setData([])
                }
            } catch (err) {
                if (signal.aborted) return
                setError(err)
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => controller.abort()
    }, [url])

    const refetch = async () => {
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, refetch }
}

export default useFetch
