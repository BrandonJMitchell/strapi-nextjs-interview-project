import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="relative w-full h-64">
        <Image
          alt="Banner Image"
          className="absolute inset-0"
          layout="fill" // This makes the image fill the parent container
          objectFit="cover" // Ensures the image covers the container without distortion
          src="/images/welcome-banner.jpg" // Path to your image
        />
        {/*<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">*/}
        {/*  <h1 className="text-white text-3xl">Your Banner Text</h1>*/}
        {/*</div>*/}
      </div>

      <br />
      <br />
      <div className="flex flex-col justify-between gap-4 py-8 md:py-10">
        <div className="relative w-full bg-gray-500 text-white p-4">
          <div className="absolute bottom-0 left-0 inset-0 flex items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-white bg-black bg-opacity-50 p-6 rounded-lg">
              Relax with a Blog
            </h1>
          </div>
          <Image
            alt="Blogs"
            height={300}
            src="/images/blue-coffee.jpeg"
            width={1000}
          />

          <Link href="/blog">
            <Button color="primary" variant="faded">
              Learn more
            </Button>
          </Link>
        </div>
        <div className="relative w-full bg-gray-500 text-white p-4 flex justify-end">
          <div className="absolute bottom-0 left-0 inset-0 flex items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-white bg-black bg-opacity-50 p-6 rounded-lg">
              Check out our Videos
            </h1>
          </div>
          <Image
            alt="Videos"
            height={300}
            src="/images/black-coffee.jpeg"
            width={1000}
          />
          <Link href="/video">
            <Button color="primary" variant="faded">
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
