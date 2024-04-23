import { SignupInput } from "@idrishmomin/zodcommon";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    });

    return <div className="h-screen flex justify-center flex-col ">

        <div className="flex justify-center">
            <div>
                <div>
                    <div className="text-4xl font-bold">
                        Create an Account
                    </div>
                    <div className="text-slate-400">
                        Already have an account?
                        <Link className="underline pl-2" to={"/signin"}>Login</Link>
                    </div>
                </div>

                <div>
                    <LabeledInput label="UserName" placeholder="Enter username" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />

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
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}  </label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
} 