import React, { useState, useEffect, useRef } from 'react';
const Commercial3DModel = ({data}) => {
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
    };

    useEffect(() => {
        handleWidth(); // Initial call to set the dimensions correctly
        window.addEventListener('resize', handleWidth);
        const interval = setInterval(handleWidth, 1000);

        return () => {
            window.removeEventListener('resize', handleWidth);
            clearInterval(interval);
        };
    });

    return (
        <div>
            <model-viewer
                src={data}
                alt="A 3D model"
                ar
                ar-scale="fixed"
                id="modelViewer"
                autoplay
                camera-controls 
                touch-action="pan-y"
                shadow-intensity="2"
                skybox-image="https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/hdr/symmetrical_garden_02_1k.hdr"
                skybox-height="2m"
                max-camera-orbit={"0deg 90deg 0deg"}
                style={{ width: useWidth, height: useHeight }}>
            </model-viewer>
        </div>
    );
};

export default Commercial3DModel;