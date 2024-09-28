// components/ModelViewerScript.tsx
import Script from 'next/script';
import React from 'react';
import { useEffect, useState } from 'react';

const ModelViewerScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          strategy="lazyOnload"
        />
      )}
    </>
  );
};

export default ModelViewerScript;
