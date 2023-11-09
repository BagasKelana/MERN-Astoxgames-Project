import { app } from "@/firebase"
import axios from "axios"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { useDispatch } from "react-redux"
import { loginSuccess } from "@/redux/user/userSlice"
import { useNavigate } from "react-router-dom"
const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOnClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            console.log(result)
            const [firstName, lastName] = result.user.displayName.split(" ")

            const res = await axios({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    firstName,
                    lastName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
                url: `/api/auth/google`,
            })
            const data = await res.data
            console.log(data)
            dispatch(loginSuccess(data))
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="flex h-full flex-col gap-2">
            <button
                onClick={handleOnClick}
                className="rounded-r-lg bg-red-500 px-4 py-2 text-sm hover:opacity-90"
            >
                Login with Google
            </button>
            <button className="rounded-r-lg bg-blue-500 px-4 py-2 text-sm hover:opacity-90">
                Login with Facebook
            </button>
        </div>
    )
}

export default OAuth
