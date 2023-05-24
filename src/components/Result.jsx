import React, { useEffect, useState } from "react";

const Result = ({ title, html, css, js, save }) => {
  const srcCode = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        </head>
        
        <body>
        ${html}
        </body>
        <style>${css}</style>
        <script>${js}</script>
        </html>
        `;
  const [src, setSrc] = useState(srcCode);
  useEffect(() => {
    setSrc(srcCode)
  },[save]);
  
  return (
    <iframe
      srcDoc={src}
      title={title}
      sandbox="allow-scripts"
      frameborder="0"
      className="w-full h-screen"
    ></iframe>
  );
};

export default Result;
