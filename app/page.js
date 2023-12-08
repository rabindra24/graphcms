"use client"
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "./components/BlogCard";
import '@tldraw/tldraw/tldraw.css'
import {Tldraw} from '@tldraw/tldraw'

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.hygraph.com/v2/clpvm607aba8401ta9yxy3kdm/master"
);

const Query = gql`
  {
    posts {
      title
      datePublished
      slug
      context {
        html
      }
      author {
        id
      }
      coverPhoto {
        url
      }
    }
  }
`;

const getData = async () => {
  const { posts } = await graphcms.request(Query);
  return {
    posts: {
      posts,
    },
    revalidate: 10,
  };
};

export default async function Home() {
  const { posts } = await getData();

  return (
    <main className="fixed inset-0">
      <div className="w-full bg-gray-200 h-screen flex flex-wrap gap-10 "> 
        {posts.posts.map((item, idx) => (
          <BlogCard
            title={item.title}
            datePublished={item.datePublished}
            coverPhoto={item.coverPhoto.url}
            author={item.author}
            key={idx}
            slug={item.slug}
          />
        ))}
     </div>

      {/* <Tldraw inferDarkMode hideUi /> */}
      
    </main>
  );
}

export const revalidate = 3