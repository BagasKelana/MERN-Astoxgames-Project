import axios from "axios"
import { useState, useEffect } from "react"
axios
const useFetch = (url = null) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    console.log(url)

    useEffect(() => {
        if (url) {
            const fetchData = async () => {
                try {
                    const res = await axios.get(url)
                    if (res?.length) {
                        setData(() => [...res.data])
                        return null
                    }
                    setData(() => res.data)
                } catch (err) {
                    setError(err)
                    console.log(err)
                } finally {
                    setLoading(false)
                }
            }
            fetchData()
        }
    }, [url])

    const reFatch = async () => {
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    return { data, loading, error, reFatch }
}

export default useFetch
