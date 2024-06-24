
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as TWEEN from '@tweenjs/tween.js'
import DataManager from 'utils/DataManager';
import { Icon } from '@iconify/react';
import { useGlobalState } from 'state';
const ThreeJS = () => {
  const path_1 = process.env.NEXT_PUBLIC_PATH
  const [activeModel] = useGlobalState("activeModel")
  const sceneRef: any = useRef();
  let model: any
  const Manager = new DataManager();
  useEffect(() => {
    const Element = (document.getElementById("ThreeJS") as HTMLDivElement);

    const width = Element.clientWidth;
    const height = Element.clientHeight;

    console.log(width)
    // Create a scene
    const scene = new THREE.Scene();
    const canvas = sceneRef.current;
    // Create a camera
    const camera: any = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.z = 5;
    // Create a renderer
    const renderer: any = Manager.renderer(canvas, width, height);
    renderer.setSize(width, height);
    const controls = Manager.orbitControl(camera, renderer);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    
    Manager.Loadmodel(activeModel, camera, scene);

    const HDRLighting = (path: string) => {
      const HDR = new RGBELoader()
        .load(path, function (texture: any) {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
        })
      return HDR;
    }

    HDRLighting(`${path_1}/hdr/brown_photostudio_02_1k.hdr`);

    const animate = () => {
      requestAnimationFrame(animate);
      if (!model) return
      // model.rotation.y +=0.001
      controls.update();
      model.scale.set(0.9, 0.9, 0.9);
      model.position.y = -0.5;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div className="canvas" >
    <canvas id="canvas" ref={sceneRef} width={1108} height={1108}></canvas>
  </div>;
};

export default ThreeJS;
