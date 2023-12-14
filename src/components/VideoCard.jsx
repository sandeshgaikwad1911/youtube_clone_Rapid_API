/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import VideoTime from "../shared/VideoTime";

const VideoCard = ({video}) => {
    // console.log('videoCard videoProp', video)
  return (
    // <Route path='/video/:id' element={<VideoDetails/>}/>
    <Link to={`/video/${video?.videoId}`}>
        <div className="flex flex-col mb-8">

            <div className="relative h-48 md:h-40 md:rounded-lg overflow-hidden ">
                <img src={video?.thumbnails?.[0]?.url} alt="" className="h-full w-full object-cover"/>
                {
                    video?.lengthSeconds && (
                        <VideoTime time={video?.lengthSeconds} />
                    )
                }
            </div>

            <div className="flex text-white mt-3">

                <div className="flex items-start">
                    <div className="flex h-9 w-9 rounded-full overflow-hidden">
                        <img src={video?.author?.avatar[0]?.url} alt="" 
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex flex-col ml-3 overflow-hidden">
                    <span className="text-sm font-bold line-clamp-2">
                        {video?.title}
                    </span>
                    <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                        {video?.author?.title}
                        {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                            <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1"/>
                        )}
                    </span>               
                    <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                            <span>{`${abbreviateNumber(video?.stats?.views,2)} views`}</span>
                            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">.</span>
                            <span className="truncate">{video?.publishedTimeText}</span>
                    </div>
                </div>

            </div>

        </div>
    </Link>
  )
}

export default VideoCard