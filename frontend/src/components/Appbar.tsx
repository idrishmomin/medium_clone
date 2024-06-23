import { Link } from "react-router-dom"
import { AvatarComponent } from "./BlogCard"

export const Appbar = () => {

    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center cursor-pointer">
            <Link to={"/blogs"}>Medium</Link>
        </div>
        <div>
            <Link to={'/publish'}>
                <button type="button" className="mr-10 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    New
                </button>
            </Link>
            <AvatarComponent size={"big"} name="Idrish" />
        </div>
    </div>
}

