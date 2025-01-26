"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import SearchBar from "./components/Inputs/SearchBar";
import TravelLists from "./components/Lists/TravelLists";
import useTravels from "./hooks/useTravels";
import Debounce from "@/app/hooks/Debound";


export default function Home() {
    const params = useSearchParams();
    const keyword = params.get('keyword') || "";

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const debouncedKeyword = Debounce(keyword, 500);
    const { lists, spinner, error } = useTravels(debouncedKeyword);

    const handleSearch = (newKeyword: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('keyword', newKeyword);
        router.replace(`${pathname}?${params.toString()}`)
    };

    return (<>
        <div>
            <div className="container">
                <div className="text-3xl md:text-4xl xl:text-5xl text-center my-8 border-b-md">
                    <h1 className="font-bold text-sky-600 block">ไปเที่ยวไหนดี</h1>
                </div>
                <SearchBar onSearch={handleSearch}/>
                <TravelLists lists={lists} spinner={spinner} error={error}/>
            </div>
        </div>
    </>);
}
