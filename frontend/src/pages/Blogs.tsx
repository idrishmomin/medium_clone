import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeletion } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

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
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate="2nd March 2024" ></BlogCard>)}
            </div>
        </div>
    </div>
}