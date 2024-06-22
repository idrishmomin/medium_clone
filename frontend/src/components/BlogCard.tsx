import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string,
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b-2 border-slate-200 p-4 cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col"><AvatarComponent name={authorName} size="small" /></div>
                <div className="flex justify-center pl-3 font-semibold"> {authorName}.</div>
                <div className="flex justify-center font-extralight pl-4 font-thin text-slate-500">{publishedDate}</div>
            </div>

            <div className="font-bold text-xl">{title}</div>

            <div className="pt-1 text-md font-thin">{content.slice(0, 200) + "..."}</div>

            <div className="flex pt-5 pl-4">
                <div className="bg-slate-200 rounded-2xl pl-2 pr-2 pt-0.5 pb-0.5 font-medium text-s ">Side Hustel</div>
                <div className="pl-3 flex justify-center flex-col text-slate-700 text-sm font-thin">{`${Math.ceil(content.length) / 100} minutes`}</div>
            </div>
        </div>
    </Link>
}

export function AvatarComponent({ name, size = "small" }: { name: string, size: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center
         w-${size} h-${size} overflow-hidden bg-gray-400 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10   "}`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-100 dark:text-gray-300`}>{name[0]}</span>
    </div >


}