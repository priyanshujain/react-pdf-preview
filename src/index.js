import React from "react";
import PDF from "./PDF";

const PdfPreview = ({ src, scale = "1.2" }) => (
  <div className="pdf-preview-container">
    <PDF src={src} scale={scale} />
  </div>
);

export default PdfPreview;
