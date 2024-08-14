'use client'

import {useEffect, useState} from "react";
import {fetchBlog} from "@/lib/fetchBlogs";
import {Image} from "@nextui-org/image";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Link} from "@nextui-org/link";

export default function BlogDetailPage({params}) {

    const id  = params.id;
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBlog = async () => {
            try {
                if (id) {
                    // Fetch the blog details using the ID from the query parameters
                    const b = await fetchBlog(id);
                    setBlog(b);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadBlog();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Card className="max-w-[600px]">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="Black girl magic"
                        height={200}
                        radius="lg"
                        src={blog?.src}
                        width={200}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">{blog?.title}</p>
                        <p className="text-small text-default-500">{blog?.readTime} minute read</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody className="overflow-auto max-h-[300px] py-2">
                    <p>{blog?.body}</p>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <p>Published on {blog?.publishDate}</p>
                </CardFooter>
            </Card>
        </div>

    );
}
