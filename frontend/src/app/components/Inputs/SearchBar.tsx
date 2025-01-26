"use client"
import { useState,useEffect, useCallback } from 'react';
import { useSearchParams  } from "next/navigation";

const DEBOUNCE_DELAY = 500; // Delay in milliseconds
interface SearchProps {
  onSearch: (keyword: string) => void;
}
const SearchBar: React.FC<SearchProps>  = ({onSearch}) => 
{
    const [input, setInput] = useState<string>("");
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const searchParams  = useSearchParams();
    const keyword = searchParams.get('keyword');

    useEffect(() => {
        if (typeof window !== "undefined" && keyword) {
            setInput(keyword as string);
        }
    }, [keyword]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        if (typingTimeout) clearTimeout(typingTimeout);
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('keyword', value);
            params.toString();
        }, DEBOUNCE_DELAY);
        setTypingTimeout(timeout);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            const value = (e.target as HTMLInputElement).value;
            onSearch(value);
        }
    }
  
    return (
        <div className="mb-8">
            <div className="flex flex-col max-w-xl mx-auto rounded-lg overflow-hidden ">
                <div className="relative ">
                    <div className="absolute h-full flex items-center justify-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" className="w-full ps-8 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-500" placeholder="Search"  
                        defaultValue={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
