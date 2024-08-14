import { title } from "@/components/primitives";
import BlogList from "@/components/blogList";

export default function BlogPage() {
  return (
    <div>
      <h1 className={title()}>Blog</h1>
        <br/><br/>
        <BlogList/>
    </div>
);
}
