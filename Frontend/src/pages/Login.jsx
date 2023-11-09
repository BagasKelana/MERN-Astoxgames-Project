import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { loginStart, loginSuccess, loginFailure } from "@/redux/user/userSlice"
import OAuth from "@/component/Oauth/Oauth"

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.user)

    const handleShowPassword = () => {
        setShowPassword((e) => !e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = userData
        if (email && password) {
            const login = async () => {
                try {
                    dispatch(loginStart())
                    const response = await axios({
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        url: `/api/auth/login`,
                        data: JSON.stringify({ email, password }),
                    })
                    dispatch(loginSuccess(response.data))
                    response && navigate("/")
                } catch (err) {
                    dispatch(loginFailure(err.response.data.message))
                    err.response.status === 400
                        ? setError({ password: err.response.data.message })
                        : setError({ email: err.response.data.message })
                }
            }
            login()
        } else {
            alert("your data not valid")
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setUserData((e) => {
            return { ...e, [name]: value }
        })
    }

    return (
        <>
            <div
                className="relative flex min-h-screen w-full items-start justify-center sm:items-center "
                style={{
                    background:
                        "linear-gradient(34deg, rgba(37,37,37,1) 0%, rgba(18,18,18,1) 48%) fixed",
                }}
            >
                <div
                    id="login"
                    className="border-bl flex h-full w-full justify-center rounded border-[2px] bg-transparent p-2 shadow-md drop-shadow sm:w-[22rem] sm:bg-product-main "
                >
                    <form
                        onSubmit={handleSubmit}
                        className=" flex h-full w-full flex-col justify-center gap-1 px-6 py-4 text-sm text-black  "
                    >
                        <div className=" mb-2 flex w-full justify-center px-2 py-2 ">
                            <div className="h-16 w-16 overflow-hidden rounded-full shadow-md shadow-black ">
                                <img
                                    className="h-full object-cover"
                                    src="images/16427-3840x2160-desktop-4k-god-of-war-ragnarok-wallpaper-image.avif"
                                    alt=""
                                />
                            </div>
                        </div>
                        <label className=" text-white" htmlFor="email">
                            Email
                        </label>
                        <input
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleOnChange}
                            className="mb-2 flex h-full w-full rounded px-2 py-1 outline-none  focus-within:outline-blue-200"
                            id="email"
                            type="email"
                            name="email"
                        />
                        <span
                            hidden={!error?.email}
                            className="text-sm text-red-500 "
                        >
                            *{error?.email}
                        </span>
                        <label className=" text-white" htmlFor="password">
                            Password
                        </label>
                        <div className="mb-2 flex  h-full w-full rounded bg-white px-2 py-1 outline-none  focus-within:outline-blue-200 ">
                            <input
                                placeholder="Password"
                                value={userData.password}
                                onChange={handleOnChange}
                                className=" w-full outline-none"
                                minLength={8}
                                id="password"
                                type={!showPassword ? "password" : "text"}
                                name="password"
                            />
                            <div
                                onClick={handleShowPassword}
                                className="flex cursor-pointer  items-center"
                            >
                                {!showPassword ? <FiEye /> : <FiEyeOff />}
                            </div>
                        </div>
                        <span
                            hidden={!error.password}
                            className="text-sm text-red-500 "
                        >
                            *{error.password}
                        </span>
                        <div className="mb-2 mt-2 flex  h-full w-full items-center justify-between">
                            <button
                                disabled={loading}
                                type="submit"
                                value="submit"
                                className="flex h-full w-1/4 items-center justify-center gap-2  rounded bg-blue-500 px-2  py-1 text-center text-white  disabled:bg-neutral-600"
                            >
                                Login
                            </button>
                            <div className="flex flex-col flex-wrap justify-end text-xs">
                                <p className=" text-white ">
                                    {"don't have account?"}
                                </p>
                                <Link
                                    className="font-bold text-blue-500"
                                    to={"/signin"}
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
                <OAuth />
            </div>
        </>
    )
}

export default Login
