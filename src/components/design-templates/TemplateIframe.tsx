import { Template } from "@/types/types";

export const createTemplateIframe = (template: Template) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      * {
        box-sizing: border-box;
      }
      .template-container {
        transform: scale(1);
        transform-origin: center;
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="template-container">
      ${template.content}
    </div>
  </body>
  </html>
`;