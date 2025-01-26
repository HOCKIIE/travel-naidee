"use client"
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

interface ItemProps {
    list:{
        title: string;
        eid: string;
        description: string;
        photos: string[];
        tags: string[];
        url: string;
    }
};
const TravelCard = ({list}:ItemProps) =>{
    const {title,eid,description,photos,tags,url} = list;
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const handleTagClick = (tag: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('keyword', tag);
        router.replace(`${pathname}?${params.toString()}`)
    };

    return (
    <div className="flex flex-col max-w-xl mx-auto shadow-md border-2 border-gray-100 overflow-hidden min-h-[500px] rounded-lg">
        <a href={url}>
            <div className="flex-shrink-0 h-48">
                <img src={photos[0]}
                    alt={`article ${eid} main image`}
                    className="w-full h-full object-cover"
                />
            </div>
        </a>
        <div className="flex flex-col justify-between p-6 bg-white flex-grow">
            <a href={url}>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
            </a>
            <p className="text-gray-700 mb-4">
                {description}{" "}
                <a href={url} className="font-bold text-blue-600 cursor-pointer">อ่านต่อ..</a>
            </p>
            <div className="flex flex-wrap mb-4">
                {tags.map((tag, k) => (
                <a key={k}
                    onClick={()=>handleTagClick(tag)}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1"
                >
                    #{tag}
                </a>
                ))}
            </div>
            <div className="flex gap-2 pb-2 overflow-x-auto md:hidden">
                {photos.slice(1).map((img, k) => (
                    <img key={1+k} src={img}
                        alt={`article ${eid} image ${k + 1}`}
                        className="w-[calc(45vw-10px)] h-full rounded-lg object-cover shadow-sm"
                    />
                ))}
            </div>
            <div className="hidden md:grid grid-cols-12 gap-4 mt-4 ">
                {photos.slice(1).map((img, k) => (
                <div key={2+k} className="col-span-6 md:col-span-4">
                    <img
                        src={img}
                        alt={`article ${eid} image ${k + 1}`}
                        className="w-full h-full rounded-lg object-cover shadow-sm transition-transform duration-200 hover:scale-110"
                    />
                </div>
                ))}
            </div>
        </div>
    </div>);
}

export default TravelCard;