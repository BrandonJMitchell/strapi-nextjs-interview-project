import {
  SingleVideoResponse,
  VideoDetail,
  VideoItem,
  VideoResponse,
} from "@/types";

const videoApiUrl: string = process.env.NEXT_PUBLIC_VIDEOS_URL; // Video API URL
const token: string = process.env.NEXT_PUBLIC_API_TOKEN; // Bearer token from environment variable
const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchVideos = async (
  signal?: AbortSignal,
): Promise<Array<VideoItem>> => {
  try {
    // Fetch the data
    const response = await fetch(videoApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...(signal && { signal }),
    });
    const result: VideoResponse = await response.json();
    const videos = result.data || [];

    return videos.map((video) => ({
      id: video.id,
      title: video.attributes.title,
      duration: video.attributes.duration,
      publishDate: video.attributes.publishDate,
      videoDescription: video.attributes.videoDescription,
    }));
  } catch (error) {
    console.error("Error fetching video posts:", error);

    return [];
  }
};

export const fetchVideo = async (id: number): Promise<VideoDetail | null> => {
  try {
    const populateParam = "*";
    const url = `${videoApiUrl}/${id}?populate=${encodeURIComponent(populateParam)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result: SingleVideoResponse = await response.json();
    const video = result.data;

    return {
      id: video.id,
      title: video.attributes.title,
      duration: video.attributes.duration,
      publishDate: video.attributes.publishDate,
      videoDescription: video.attributes.videoDescription,
      src: `${baseUrl}${video.attributes.video?.data[0].attributes.url}`,
    };
  } catch (error) {
    console.error("Error fetching video detail:", error);

    return null;
  }
};
