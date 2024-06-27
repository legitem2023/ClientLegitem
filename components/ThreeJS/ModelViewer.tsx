import React, { useState, useEffect } from 'react';
import { useGlobalState } from 'state';

const ModelViewer = () => {
    const [activeModel] = useGlobalState("activeModel");
    const [useHeight, setHeight] = useState('100vw');
    const [useWidth, setWidth] = useState('100vw');

    const handleWidth = () => {
        if (window.innerWidth < 600) {
            setWidth('100vw');
            setHeight('100vw');
        } else {
            setWidth('100%');
            setHeight('500px');
        }
        console.log(useWidth, useHeight);
    };

    useEffect(() => {
        handleWidth(); // Initial call to set the dimensions correctly
        window.addEventListener('resize', handleWidth);
        const interval = setInterval(handleWidth, 1000);

        return () => {
            window.removeEventListener('resize', handleWidth);
            clearInterval(interval);
        };
    }, [useWidth, useHeight]);

    return (
        <div className="canvas">
            <model-viewer
                src={activeModel}
                alt="A 3D model"
                ar
                ar-scale="fixed"
                camera-controls touch-action="pan-y"
                shadow-intensity="2"
                skybox-image="https://www.nps.gov/npgallery/GetAsset/152b501b-8759-4cfa-8fdd-2563c8945426/proxy/hires?"
                skybox-height="2m"
                max-camera-orbit="auto 90deg auto"
                style={{ width: useWidth, height: useHeight }}>
            </model-viewer>
        </div>
    );
};

export default ModelViewer;
