import React from "react";
import Layout from "../components/layout";

function about() {
  return <Layout>You are in about</Layout>;
}

export default about;

// src/pages/blog-post.js

// import React, { useEffect, useState } from "react";

// const BlogPostTemplate = ({ pageContext }) => {
//   const [viewCount, setViewCount] = useState(0);

//   useEffect(() => {
//     // Retrieve view count from localStorage
//     const storedViews = localStorage.getItem(`viewCount_${2}`);

//     // Increment view count
//     const count = storedViews ? parseInt(storedViews) + 1 : 1;

//     // Update state with the incremented view count
//     setViewCount(count);

//     // Update localStorage with the incremented view count
//     localStorage.setItem(`viewCount_${2}`, count.toString());
//   }, [2]);

//   return (
//     <div>
//       <h1>{pageContext ? pageContext.title : "Loading..."}</h1>
//       {pageContext && (
//         <React.Fragment>
//           <p>Views: {viewCount}</p>
//           <div dangerouslySetInnerHTML={{ __html: pageContext.html }} />
//         </React.Fragment>
//       )}
//     </div>
//   );
// };

// export default BlogPostTemplate;
