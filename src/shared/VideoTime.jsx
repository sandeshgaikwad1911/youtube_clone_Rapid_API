/* eslint-disable react/prop-types */
import moment from 'moment';

const VideoTime = ({time}) => {
    const videoTimeInSec = moment()?.startOf("day")?.second(time)?.format("H:mm:ss");
  return (
    <span className='absolute bottom-2 right-2 py-1 px-2 text-white bg-black text-xs rounded-md'>
        {videoTimeInSec}
    </span>
  )
}

export default VideoTime