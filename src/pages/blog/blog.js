import React from "react";

function blog({ title = "", content = "", author = "", button = "" }) {
  return (
    <div>
      <table border={1}>
        <tr>
          <td>blog title is :</td>
          <td>{title}</td>
        </tr>
        <tr>
          <td>blog Content is :</td>
          <td>{content}</td>
        </tr>
        <tr>
          <td>blog Author is :</td>
          <td>{author}</td>
        </tr>
        <tr>
          <td>blog button is :</td>
          <td>
            <button type="button">{button}</button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default blog;
