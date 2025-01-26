"use client"
import TravelCard from "../Card/TravelCard";
import Spinner from "../atom/Spinner";

interface ArticleListProps {
    lists: { status: string; data: any[] };
    spinner: boolean;
    error: string | null;
}

const TravelLists = ({lists,spinner,error}:ArticleListProps) => {
    if(error) return <p className="flex justify-center">{error}</p>;
    if(spinner) return <Spinner/>;
    if(!lists?.data) return <p className="text-center">No results found.</p>;
    
    return <div className="grid grid-col gap-6">
        {lists.data?.map((v,k)=> <TravelCard key={v.eid+k} list={v} />)}
    </div>
}

export default TravelLists