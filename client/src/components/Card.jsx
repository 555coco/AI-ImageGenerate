import React from "react";
import { MdOutlineDownloading } from "react-icons/md";
import { downloadImage } from "../utils";

const Card = ({_id, name, prompt, photo}) => {

    return(
        <div className="rounded-xl group relative aspect-square hover:shadow-2xl transition-shadow duration-300 bg-white/10 overflow-hidden">
            <img src={photo}
                className="w-full h-auto rounded-xl group-hover:scale-105"
                alt={prompt} />
            <div className="group-hover:flex flex-col rounded-xl w-full hidden absolute bottom-0 bg-[#10131f]">
                <p className="text-xs m-2">{prompt}</p>
                <div className="flex items-center">
                    <div className="flex items-center justify-center aspect-square w-8 h-8 bg-green-600 rounded-full mt-0.5 ml-2 mb-3">
                        <p className="text-white">{name[0]}</p>
                    </div>
                    <div className="ml-3 mb-2 text-xl">{name}</div>
                    <button className="absolute right-2 cursor-pointer" onClick={() => downloadImage(_id,photo)}>
                        <MdOutlineDownloading className="text-3xl"/>
                    </button>
                </div>
            </div>
        </div>
    )
} 

export default Card;