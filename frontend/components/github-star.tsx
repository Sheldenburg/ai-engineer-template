"use client";

import React, { useEffect, useState } from "react";

// GitHubStars component
const GitHubStars = () => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/Sheldenburg/nextjs-fastapi-template")
      .then((response) => response.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((error) => console.error("Error fetching star count:", error));
  }, []);

  return (
    <a
      href="https://github.com/Sheldenburg/nextjs-fastapi-template"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center"
    >
      {stars !== null ? (
        <iframe
          src="https://ghbtns.com/github-btn.html?user=sheldenburg&repo=nextjs-fastapi-template&type=star&count=true&size=large"
          width="170"
          height="30"
          title="GitHub"
        ></iframe>
      ) : (
        "Loading..."
      )}
    </a>
  );
};

export default GitHubStars;
