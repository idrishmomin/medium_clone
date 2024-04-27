import { AvatarComponent } from "./BlogCard"

export const Appbar = () => {

    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center">
            Medium
        </div>
        <div>
            <AvatarComponent size={8} name="Idrish" />
        </div>
    </div>
}
