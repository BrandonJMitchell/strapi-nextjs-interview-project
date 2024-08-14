import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface BlogItem {
  id: number;
  title: string;
  readTime: string;
  publishDate: string;
}

export interface BlogDetail extends BlogItem {
  body: string | undefined;
  src: string;
}

export interface BlogAttributes {
  title: string;
  readTime: string;
  publishDate: string;
  body?: string;
  image?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

export interface Blog {
  id: number;
  attributes: BlogAttributes;
}

export interface BlogResponse {
  data: Array<Blog>;
}

export interface SingleBlogResponse {
  data: Blog;
}

export interface VideoItem {
  id: number;
  title: string;
  duration: number;
  publishDate: string;
  videoDescription: string;
}

export interface VideoDetail extends VideoItem {
  src: string;
}

export interface VideoAttributes {
  title: string;
  duration: number;
  publishDate: string;
  videoDescription: string;
  video?: {
    data: {
      attributes: {
        url: string;
      };
    }[];
  };
}

export interface Video {
  id: number;
  attributes: VideoAttributes;
}

export interface VideoResponse {
  data: Array<Video>;
}

export interface SingleVideoResponse {
  data: Video;
}
