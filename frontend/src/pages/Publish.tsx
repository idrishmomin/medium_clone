import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { Backend_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    return <div>
        <Appbar />
        <div className="pt-20 pl-80">
            <div className="flex flex-col">
                <input placeholder="Title" className="text-4xl outline-none font-serif" onChange={(e) => {
                    setTitle(e.target.value)
                }
                } />
                <div className="flex flex-align-center pt-4">
                    <div className="flex flex-col h-screen w-screen">
                        <textarea required placeholder="Tell your Story..." className="outline-none w-full flex-1 p-4" onChange={(e) => {
                            setContent(e.target.value)
                        }
                        } />
                    </div>
                </div>
            </div>
            <button onClick={async () => {
                const response = await axios.post(`${Backend_BASE_URL}/api/v1/blog`, { title, content }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${response.data.id}`)
            }}
                type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Publish post
            </button>
        </div>
    </div>

}
