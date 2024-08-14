import {
  BlogDetail,
  BlogItem,
  BlogResponse,
  SingleBlogResponse,
} from "@/types";

const blogApiUrl: string = process.env.NEXT_PUBLIC_BLOGS_URL; // Blog API URL
const token: string = process.env.NEXT_PUBLIC_API_TOKEN; // Bearer token from environment variable
const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchBlogs = async (
  signal?: AbortSignal,
): Promise<Array<BlogItem>> => {
  try {
    // Fetch the data
    const response = await fetch(blogApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...(signal && { signal }),
    });
    const result: BlogResponse = await response.json();
    const blogs = result.data || [];

    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.attributes.title,
      readTime: blog.attributes.readTime,
      publishDate: blog.attributes.publishDate,
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    return [];
  }
};

export const fetchBlog = async (id: number): Promise<BlogDetail | null> => {
  try {
    const populateParam = "*";
    const url = `${blogApiUrl}/${id}?populate=${encodeURIComponent(populateParam)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result: SingleBlogResponse = await response.json();
    const blog = result.data;

    return {
      id: blog.id,
      title: blog.attributes.title,
      readTime: blog.attributes.readTime,
      publishDate: blog.attributes.publishDate,
      body: blog.attributes.body,
      src: `${baseUrl}${blog.attributes.image?.data.attributes.url}`,
    };
  } catch (error) {
    console.error("Error fetching blog detail:", error);

    return null;
  }
};
