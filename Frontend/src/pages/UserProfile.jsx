import Layout from "@/Layout/Layout"
import TopGameCard from "@/component/Card/GameCard"
import { Link } from "react-router-dom"

const UserProfile = () => {
    return (
        <Layout>
            <div className="flex h-full w-full flex-col ">
                <div className="md: flex w-full items-center justify-between gap-4  bg-neutral-800 p-4 shadow shadow-transparent md:shadow-black  ">
                    <div className="flex gap-4  p-4 ">
                        <div className="h-14 w-14">
                            <img
                                className=" h-full rounded-full outline outline-2   "
                                src="images/134265-3840x2160-desktop-4k-god-of-war-ragnarok-background.avif"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                            <h1 className="text-2xl">Hilal bagas</h1>
                            <p className="text-xs "> hilalbagas@gmail.com</p>
                        </div>
                    </div>
                    <Link to="/user/setting">
                        <button className=" rounded-md bg-sky-500 px-4 py-2 ">
                            Settings
                        </button>
                    </Link>
                </div>
                <div className="w-full px-4 md:p-0">
                    <ul className=" flex w-full justify-between overflow-auto rounded  px-4 py-4 md:justify-start md:gap-10 md:text-xl">
                        <li className="cursor-pointer text-neutral-300 hover:text-white">
                            {" "}
                            Favorit Games
                        </li>
                        <li className="cursor-pointer text-neutral-300 hover:text-white">
                            Reviews
                        </li>
                        <li className="cursor-pointer text-neutral-300 hover:text-white">
                            Following
                        </li>
                        <li className="cursor-pointer text-neutral-300 hover:text-white">
                            Followers
                        </li>
                    </ul>
                </div>
                <div className="w-full">
                    <div className=" my-4 grid grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-4 ">
                        <TopGameCard
                            width="w-full"
                            title={"Hilal bagas kelana"}
                            src={
                                "/images/spider_man_miles_morales_hd_marvels_spider_man_2-1280x720.webp"
                            }
                        />
                        <TopGameCard
                            width="w-full"
                            title={"Hilal bagas kelana"}
                            src={
                                "/images/spider_man_miles_morales_hd_marvels_spider_man_2-1280x720.webp"
                            }
                        />
                        <TopGameCard
                            width="w-full"
                            title={"Hilal bagas kelana"}
                            src={
                                "/images/spider_man_miles_morales_hd_marvels_spider_man_2-1280x720.webp"
                            }
                        />
                        <TopGameCard
                            width="w-full"
                            title={"Hilal bagas kelana"}
                            src={
                                "/images/spider_man_miles_morales_hd_marvels_spider_man_2-1280x720.webp"
                            }
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default UserProfile
