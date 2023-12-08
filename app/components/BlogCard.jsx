import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ title, author, datePublished, coverPhoto, slug }) => {
  return (
    <>
      <Link href={`/posts/${slug}`}>
        <div className="w-[200px] h-[300px] bg-red-500 rounded-lg">
          <h1>{title}</h1>
          <Image src={coverPhoto} alt="these is a image" width={200} height={200} />
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
