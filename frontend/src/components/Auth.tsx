import { SignupInput } from "@idrishmomin/zodcommon";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Backend_BASE_URL } from "../config";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    });

    async function sendRequestToBackend() {
        try {
            const response = await axios.post(`${Backend_BASE_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            return Response.json({

            })
        }


    }
    return <div className="h-screen flex justify-center flex-col ">

        <div className="flex justify-center">
            <div>
                <div>
                    <div className="text-4xl font-bold">
                        Create an Account
                    </div>
                    <div className="text-slate-400">
                        {type === "signin" ? "Dont have an account?" : "Already have an account?"}
                        <Link className="underline pl-2" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>

                <div>
                    {type === "signup" ? <LabeledInput label="UserName" placeholder="Enter username" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}

                    <LabeledInput label="Email" placeholder="m@example.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />

                    <LabeledInput label="Password" type="password" placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <div className="pt-6">
                        <button onClick={sendRequestToBackend} type="button" className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-2.5 px-5 rounded-lg
                     focus:outline-none focus:ring-4 focus:ring-gray-300 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 block w-full">
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


interface LabeledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;

}

function LabeledInput({ label, placeholder, onChange, type }: LabeledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-medium text-black pt-1">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
} 