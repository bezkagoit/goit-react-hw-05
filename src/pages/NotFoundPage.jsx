import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 - Page not found</h2>
      <p>
        Go to <Link to="/">Home</Link>{" "}
      </p>
    </div>
  );
};

export default NotFoundPage;
