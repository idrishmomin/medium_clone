import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { AvatarComponent } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="grid grid-cols-12 pl-10 pr-10 pt-40 w-full max-w-screen-xl">
            <div className="col-span-9 px-20">
                <div className="text-4xl">{blog.title}</div>
                <div className="text-gray-600 text-base	 pt-5">Posted On August 24,2023</div>
                <div className="pt-5">{blog.content}</div>
            </div>

            <div className="col-span-3">
                Author
                <div className="flex flex-row">
                    <div className=" content-center">
                        <AvatarComponent size="big" name={blog.author.name} /></div>
                    <div className="pl-4">
                        <div className="text-xl  pt-4"> {blog.author.name}</div>
                        <div className="pt-2 text-gray-600">Hi am experianced Java developer with aroud 4 years of experiance</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}