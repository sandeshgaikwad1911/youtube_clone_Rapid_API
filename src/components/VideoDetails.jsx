import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import ReactPlayer from "react-player/youtube";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";

import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromUrl } from "../utils/api";

import { Context } from "../context/contextApi";

import SuggestedVideoCard from "./SuggestedVideoCard";

const VideoDetails = () => {

  const {id} = useParams();
  // console.log('id', id);
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const {setLoading} = useContext(Context);

  const fetchVideoDetails = ()=>{
    setLoading(true);
    fetchDataFromUrl(`video/details/?id=${id}`).then((res)=>{
      console.log('videoDetailsResponse', res);
      setVideo(res);
      setLoading(false);
    })
  }

  const fetchRelatedVideos = ()=>{
    setLoading(false);
    fetchDataFromUrl(`video/related-contents/?id=${id}`).then((res)=>{
      console.log('fetchRelatedVideos', res)
      setRelatedVideos(res);
      setLoading(false);
    })
  }

  useEffect(()=>{
    document.getElementById("root").classList.add("custom-h")
    fetchVideoDetails();
    fetchRelatedVideos();
  },[id]);

  return (

    <div className="flex justify-center h-[calc(100%-56px)] bg-black">

      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">

          <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-3 overflow-y-auto">
            <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] mx-[-16px] lg:mx-0">
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${id}`}
                    controls
                    width="100%" height="100%"
                    style={{backgroundColor: "#000000"}}
                    playing={true}
                />
            </div>

            <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                {video?.title}
            </div>

            <div className="flex justify-between flex-col md:flex-row mt-4">

                <div className="flex">
                    <div className="flex items-start">
                        <div className="flex h-11 w-11 rounded-full overflow-hidden">
                          <img src={video?.author?.avatar[0].url} className="h-full w-full object-cover"/>
                        </div>
                    </div>

                    <div className="flex flex-col ml-3">
                        <div className="flex items-center text-white font-semibold ">
                          {video?.author?.title}
                          {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (<BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1"/>)}
                        </div>
                        <div className="text-white/[0.7] text-sm">
                            {video?.author?.stats?.subscribersText}
                        </div>
                    </div>
                </div>

                <div className="flex gap-1 text-white mt-4 md:mt-0">
                    <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.14]">
                        <AiOutlineLike className="text-white text-xl mr-2"/>
                        <span>{`${abbreviateNumber(video?.stats?.likes,2)} Likes`}</span>
                    </div>
                    <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.14]">
                        <AiOutlineLike className="text-white text-xl mr-2"/>
                        <span>{`${abbreviateNumber(video?.stats?.views,2)} Likes`}</span>
                    </div>
                </div>

            </div>

          </div>

          <div className="flex flex-col p-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
              {
                relatedVideos?.contents?.map((item, i)=>{
                  if(item?.type != "video") return false
                  return(
                    <SuggestedVideoCard key={i} video={item?.video}/>
                  )
                })
              }
          </div>

      </div>

    </div>
  )
}

export default VideoDetails