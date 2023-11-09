import Layout from "@/Layout/Layout"

const UserSetting = () => {
    return (
        <Layout>
            <div className="flex h-full flex-col items-center">
                <div className="flex w-full max-w-screen-sm flex-col items-center gap-4 rounded-md bg-neutral-800 p-8 shadow-md shadow-black  ">
                    <div className=" flex h-full w-full flex-col items-center px-4">
                        <div className="flex w-full justify-start text-xl ">
                            Edit Profile
                        </div>
                        <label className="p-4 " htmlFor="photo-profile">
                            <div className=" h-24 w-24 ">
                                <img
                                    className="h-full w-full rounded-full object-cover shadow-lg shadow-black"
                                    src="/images/134265-3840x2160-desktop-4k-god-of-war-ragnarok-background.avif"
                                    alt=""
                                />
                            </div>
                            <input
                                id="photo-profile"
                                name="photo-profile"
                                type="file"
                                hidden
                            />
                        </label>
                    </div>
                    <form className="flex w-full flex-col gap-6  ">
                        <div className="flex w-full flex-col px-4">
                            <label htmlFor="full-name">Full Name</label>
                            <input
                                className="h-full w-full rounded px-2 py-1 text-black"
                                id="full-name"
                                name="full-name"
                                type="text"
                            />
                        </div>
                        <div className="flex w-full flex-col px-4">
                            <label htmlFor="email">E-mail</label>
                            <input
                                className=" h-full w-full rounded px-2 py-1 text-black"
                                id="email"
                                name="email"
                                type="email"
                            />
                        </div>
                        <div className="flex w-full flex-col px-4">
                            <label htmlFor="password">Current Password</label>
                            <input
                                className=" h-full w-full rounded px-2 py-1 text-black"
                                id="password"
                                name="password"
                                type="password"
                            />
                        </div>
                        <div className="flex w-full flex-col px-4">
                            <label htmlFor="new-password">New Password</label>
                            <input
                                className=" h-full w-full rounded px-2 py-1 text-black"
                                id="new-password"
                                name="new-password"
                                type="password"
                            />
                        </div>
                        <div className="mt-8 flex w-full justify-between px-4">
                            <button className="rounded-md bg-neutral-600 px-8 py-2">
                                CANCEL
                            </button>
                            <button className="rounded-md bg-sky-500 px-8 py-2">
                                SAVE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default UserSetting
