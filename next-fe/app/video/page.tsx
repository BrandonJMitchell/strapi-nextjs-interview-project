import { title } from "@/components/primitives";
import VideoList from "@/components/videoList";


export default function VideoPage() {
  return (
    <div>
      <h1 className={title()}>Video</h1>
        <br/><br/>
        <VideoList/>
    </div>
  );
}
