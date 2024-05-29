// src/pages/blog-post.js

import React, { useEffect, useState } from "react";

const BlogPostTemplate = ({ pageContext }) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Retrieve view count from localStorage
    const storedViews = localStorage.getItem(`viewCount_${1}`);

    // Increment view count
    const count = storedViews ? parseInt(storedViews) + 1 : 1;

    // Update state with the incremented view count
    setViewCount(count);

    // Update localStorage with the incremented view count
    localStorage.setItem(`viewCount_${1}`, count.toString());
  }, [1]);

  return (
    <div>
      <h1>{pageContext ? pageContext.title : "Loading..."}</h1>
      {pageContext && (
        <React.Fragment>
          <p>Views: {viewCount}</p>
          <div dangerouslySetInnerHTML={{ __html: pageContext.html }} />
        </React.Fragment>
      )}
    </div>
  );
};

export default BlogPostTemplate;
