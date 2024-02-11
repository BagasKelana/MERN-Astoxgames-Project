import { MyContext } from "@/App"
import { useContext } from "react"

const Layout = ({ children, className }) => {
    const { showSideBar, popUser, setPopUser } = useContext(MyContext)

    const showPopUser = (e) => {
        e.stopPropagation()
        setPopUser((current) => !current)
    }

    return (
        <>
            <div className={`${className} flex min-h-screen flex-col`}>
                <div className=" h-full w-full flex-grow">
                    <main
                        onClick={(e) => {
                            if (popUser) {
                                showPopUser(e)
                            }
                        }}
                        role="main"
                        className={`${
                            !showSideBar
                                ? "pl-0  md:pl-[70px] "
                                : " pl-[70px] md:pl-[320px]"
                        } relative  flex h-full min-h-screen w-full flex-col justify-start gap-4 pr-0 pt-[60px]  md:pb-[20px]  md:pr-[20px]  md:pt-[80px]`}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout
