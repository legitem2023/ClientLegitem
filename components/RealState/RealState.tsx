
"use client"
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import DataManager from 'utils/DataManager';
import { setGlobalState, useGlobalState } from 'state';
const RealState = () => {

    const [activeModel] = useGlobalState("activeModel");
    setGlobalState("activeModel", `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/model_houses/House.glb`);
    const sceneRef: any = useRef();
    let model: any
    const Manager = new DataManager();
    useEffect(() => {
        const Element = (document.getElementById("RealStatecanvas_container") as HTMLDivElement);
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const width = Element.clientWidth;
        const height = Element.clientHeight;
        // Create a scene
        const scene = new THREE.Scene();
        const canvas = sceneRef.current;
        // Create a camera
        const camera: any = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
        camera.position.z = 5;
        camera.position.y = 1;
        // Create a renderer
        const renderer: any = new THREE.WebGLRenderer({ antialias: true, canvas: canvas, alpha: true });
        renderer.setSize(width, height);

        // Create a controls
        const controls = Manager.orbitControl(camera, renderer);
        controls.enableDamping = true;
        controls.enableZoom = true;
        controls.enableRotate = true;
        // controls.enablePan = false;
        // controls.minPolarAngle = Math.PI / 6; // 45 degrees
        // controls.maxPolarAngle = Math.PI / 2; // 90 degrees
        // controls.minDistance = 80;
        // controls.maxDistance = 110;

        const light = Manager.Light();
        scene.add(light.A, light.B, light.C, light.D, light.E, light.F, light.G, light.H, light.I, light.J, light.K, light.L, light.M, light.light);

        Manager.Loadmodel(activeModel, camera, scene);

        const geometry = new THREE.CircleGeometry(150, 150);

        var loader = new THREE.TextureLoader();
        var texture = loader.load(`${process.env.NEXT_PUBLIC_PATH}/image/grass.jpg`, function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(100, 100);
        });

        const material = new THREE.MeshBasicMaterial(
            {
                color: 0x79A93C,
                map: texture,

            });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, -0.5, 0);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        scene.add(plane);
        let isTweening = false;



        const onMouseClick = (event: any) => {
            // Convert mouse coordinates to normalized device coordinates
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            // Update the raycaster with the current mouse position
            raycaster.setFromCamera(mouse, camera);
            // Calculate objects intersected by the ray
            const intersects = raycaster.intersectObjects([plane], true);
            // Check if the cube is intersected
            if (intersects.length > 0) {

                let tween = new TWEEN.Tween(camera.position).to({
                    x: intersects[0].point.x,
                    y: intersects[0].point.y + 7,
                    z: intersects[0].point.z
                }, 1000);

                tween.easing(TWEEN.Easing.Quadratic.Out);
                tween.start();
                tween.onUpdate(function () {
                    Manager.updateCameraOrbit(camera, controls);
                }.bind(this));
                tween.onComplete(function () {
                    Manager.updateCameraOrbit(camera, controls);
                }.bind(this));


            }
        }

        window.addEventListener('dblclick', onMouseClick, false);



        renderer.setAnimationLoop((time: any) => {
            TWEEN.update();
            controls.update();
            Manager.cameraPositionLimit(camera, controls);
            renderer.render(scene, camera);
        })

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

    return (
        <div className='body_messages'>
            <div className="Loading" id="Loading">
                <div id="progress"></div>
                <div className="loader"></div>
            </div>
            <div className='LeftWing'>
                {/* <Store/> */}
            </div>
            <div className='middlecontainer_messages'>
                <div className='messages_container'>
                    <div className="RealStatecanvas" id='RealStatecanvas_container'>
                        <canvas id="RealStatecanvas" ref={sceneRef} width={1108} height={1108}></canvas>
                    </div>
                </div>
            </div>
            <div className='RightWing'>

            </div>
        </div>)
};

export default RealState;
