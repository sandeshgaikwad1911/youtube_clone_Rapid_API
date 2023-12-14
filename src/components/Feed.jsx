import { useContext, useEffect } from "react"
import LeftNav from "./LeftNav"
import { Context } from "../context/contextApi"
import VideoCard from "./VideoCard";

const Feed = () => {

    const {loading, error, searchResult} = useContext(Context);

    useEffect(()=>{
      document.getElementById("root").classList.remove("custom-h");
    },[]);

  return (
    <div className="flex h-[calc(100%-56px)]">
      <LeftNav/>
      <div className="w-[calc(100%-240px)] h-full overflow-y-auto bg-black grow">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
            {
              !loading && searchResult &&
               searchResult.map((item, i)=>{
                if(item.type !== "video") return false;
                return(
                  // <VideoCard key={item?.video?.videoId}  
                  <VideoCard key={i}
                             video={item?.video}                  
                  />
                )
              })
            }
        </div>

        {
          error && (<div className="text-lg  text-center text-rose-500">{error}</div>)
        }

      </div>
    </div>
  )
}

export default Feed