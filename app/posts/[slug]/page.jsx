import React from "react";
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.hygraph.com/v2/clpvm607aba8401ta9yxy3kdm/master"
);

const page = async ({ params }) => {
  const slug = await params.slug;
  const Query = gql`
    {
      posts(where: { slug: "${slug}" }) {
        id
        title
        context {
          html
        }
        publishedAt

        author {
          id
          name
        }
      }
    }
  `;
  const { posts } = await graphcms.request(Query);

  console.log(posts);

  return (
    <div>
      <h1>{posts[0].title}</h1>
      <p>{posts[0].author.name}</p>
    </div>
  );
};

export default page;
