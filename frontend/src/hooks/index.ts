import axios from "axios";
import { useEffect, useState } from "react"
import { Backend_BASE_URL } from "../config";

export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        axios.get(`${Backend_BASE_URL}/api/v1/blog/bulk`)
            .then(response => {
                setBlogs(response.data);
                setloading(false);
            })
    })

    return {
        loading, blogs
    }

}