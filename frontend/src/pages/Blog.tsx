import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { BlogSkeletion } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading) {
        return <div>
            <div><Appbar /></div>
            <div className="px-80 flex-col">
                <BlogSkeletion />
                <BlogSkeletion />
                <BlogSkeletion />
                <BlogSkeletion />
                <BlogSkeletion />
            </div>
        </div>
    }
    return <div>
        <div> <FullBlog blog={blog} />
        </div>
    </div>
}