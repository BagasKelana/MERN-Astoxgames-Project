import { Link } from "react-router-dom"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SignIn = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleShowPassword = () => {
        setShowPassword((e) => !e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { firstName, lastName, email, password, confirmPassword } =
            userData
        if (firstName && lastName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const sendAuth = async () => {
                    try {
                        setLoading(true)
                        const response = await axios({
                            method: "post",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            url: "/api/auth/sign-in",
                            data: JSON.stringify({
                                firstName,
                                lastName,
                                email,
                                password,
                            }),
                        })
                        console.log(response.data)
                        response && navigate("/login")
                    } catch (err) {
                        console.log(err.response.data.message)
                        setError(err.response.data.message)
                    } finally {
                        setLoading(false)
                    }
                }
                sendAuth()
            } else {
                alert("password harus sama")
            }
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
                className="flex min-h-screen w-full items-start justify-center sm:items-center "
                style={{
                    background:
                        "linear-gradient(34deg, rgba(37,37,37,1) 0%, rgba(18,18,18,1) 48%) fixed",
                }}
            >
                <div
                    id="signin"
                    className="flex h-full w-full justify-center  rounded bg-transparent p-2 shadow-md drop-shadow sm:w-[22rem] sm:bg-product-main "
                >
                    <form
                        onSubmit={handleSubmit}
                        className=" flex h-full w-full flex-col justify-center gap-1 px-6 py-4 text-sm text-black  "
                    >
                        <div className=" flex w-full justify-center px-2 py-2 ">
                            <div className="h-16 w-16 overflow-hidden rounded-full ">
                                <img
                                    className="h-full object-cover"
                                    src="images/16427-3840x2160-desktop-4k-god-of-war-ragnarok-wallpaper-image.avif"
                                    alt=""
                                />
                            </div>
                        </div>
                        <label className=" text-white" htmlFor="first-name">
                            First Name
                        </label>
                        <input
                            value={userData.firstName}
                            onChange={handleOnChange}
                            id="first-name"
                            type="text"
                            name="firstName"
                            className="mb-2 flex h-full w-full rounded px-2 py-1 outline-none focus-within:outline-blue-200"
                        />
                        <label className=" text-white" htmlFor="last-name">
                            Last Name
                        </label>
                        <input
                            value={userData.lastName}
                            onChange={handleOnChange}
                            className="mb-2 flex h-full w-full rounded px-2 py-1 outline-none  focus-within:outline-blue-200"
                            id="last-name"
                            type="text"
                            name="lastName"
                        />
                        <label className=" text-white" htmlFor="email">
                            Email
                        </label>
                        <input
                            value={userData.email}
                            onChange={handleOnChange}
                            className="mb-2 flex h-full w-full rounded px-2 py-1  outline-none  focus-within:outline-blue-200"
                            id="email"
                            type="email"
                            name="email"
                        />
                        <span hidden={!error} className="text-sm text-red-500 ">
                            *{error}
                        </span>
                        <label className=" text-white" htmlFor="password">
                            Password
                        </label>
                        <div className="mb-2 flex  h-full w-full rounded bg-white px-2 py-1 outline-none  focus-within:outline-blue-200 ">
                            <input
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
                        <label
                            className=" text-white"
                            htmlFor="confirm-password"
                        >
                            Confirm Password
                        </label>
                        <input
                            value={userData.confirmPassword}
                            onChange={handleOnChange}
                            className="mb-2 flex h-full w-full  rounded px-2 py-1 outline-none  focus-within:outline-blue-200"
                            minLength={8}
                            id="confirm-password"
                            type={!showPassword ? "password" : "text"}
                            name="confirmPassword"
                        />
                        <div className="mb-4 mt-4 flex h-full w-full items-center justify-between">
                            <button
                                disabled={loading}
                                type="submit"
                                value="submit"
                                className="w-1/4 rounded bg-blue-500 px-2  py-1 text-center text-white  disabled:bg-neutral-600"
                            >
                                Sign In
                            </button>
                            <div className="flex flex-col flex-wrap justify-end text-xs">
                                <p className="  text-white ">have account? </p>
                                <Link
                                    className="font-bold text-blue-500"
                                    to={"/login"}
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn
