"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { fetchVideo } from "@/lib/fetchVideos";

export default function VideoDetailPage({ params }) {
  const id = params.id;
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        if (id) {
          // Fetch the video details using the ID from the query parameters
          const v = await fetchVideo(id);

          setVideo(v);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center min-w-[800px] min-h-[500px]">
      <Card isFooterBlurred className="border-none w-full h-full" radius="lg">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {video?.title}
          </p>
          <h4 className="text-white font-medium text-large">
            {video?.videoDescription}
          </h4>
        </CardHeader>
        <CardBody>
          <video controls alt={video.description} className="object-cover">
            <source src={video.src} type="video/mp4" />
          </video>
        </CardBody>

        <Divider />
        <br />
        <br />
        <CardFooter className="justify-between  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny">{video?.duration} seconds to watch</p>
          <p className="text-tiny">Published on {video?.publishDate}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
