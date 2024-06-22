import axios from "axios";
import { useEffect, useState } from "react"
import { Backend_BASE_URL } from "../config";

export interface Blog {
    "content": string,
    "title": string,
    "id": string,
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [blog, setBlog] = useState<Blog>();
    const [loading, setloading] = useState(true);


    useEffect(() => {
        axios.get(`${Backend_BASE_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlog(response.data.blog)
            setloading(false)
        })
    })

    return {
        loading, blog
    }
}

export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${Backend_BASE_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setloading(false);
            })
    })

    return {
        loading, blogs
    }

}