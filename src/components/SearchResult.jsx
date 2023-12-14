import { fetchDataFromUrl } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultsVideoCard from "./SearchResultsVideoCard";
import {useParams} from 'react-router-dom'
import { useEffect, useContext, useState } from "react";

const SearchResult = () => {
  const [result, setResult] = useState([]);
  const {setLoading} = useContext(Context);

  const {searchQuery} = useParams();
  console.log('searchResult.jsx useParams()', searchQuery)

  useEffect(()=>{
    document.getElementById("root").classList.remove("custom-h")
    fetchSearchResults();
  },[searchQuery]);

  const fetchSearchResults = ()=>{
    setLoading(true);
    fetchDataFromUrl(`search/?q=${searchQuery}`).then((res)=>{
      console.log('searchResult', res);
      setResult(res?.contents);
      setLoading(false);
    })
  }

  return (
    <div className="flex h-[calc(100%-56px)]">

        <LeftNav/>

        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
            <div className="grid grid-cols-1 gap-2 p-5">
                {
                  result && result?.map((item)=>{
                    if(item?.type !== "video") return false;
                    return(
                      <SearchResultsVideoCard key={item?.video?.videoId} video={item?.video} />
                    )
                  })
                }
            </div>
        </div>

    </div>
  )
}

export default SearchResult