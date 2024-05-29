import React from "react";
import Blog from "./blog";
import Layout from "../../components/layout";
function index() {
  const data1 = {
    title: "Gatsby is cool",
    content: "This is the content 1",
    AuthorName: "JOHN",
    button: "Click me",
  };

  const data2 = {
    title: "Gatsby is cool",
    content: "This is the content 2",
    AuthorName: "JOHN",
    button: "Click me",
  };

  const data3 = {
    title: "Gatsby is cool",
    content: "This is the content 3",
    AuthorName: "JOHN",
    button: "Click me",
  };
  return (
    <Layout>
      <Blog
        title={data1.title}
        content={data1.content}
        author={data1.AuthorName}
        button={data1.button}
      ></Blog>

      <Blog
        title={data2.title}
        content={data2.content}
        author={data2.AuthorName}
        button={data2.button}
      ></Blog>

      <Blog
        title={data3.title}
        content={data3.content}
        author={data3.AuthorName}
        button={data3.button}
      ></Blog>
      <h1>This is a blog page</h1>
    </Layout>
  );
}

export default index;
