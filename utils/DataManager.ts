'use client'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';
import { toast } from 'react-toastify';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Base64 } from 'js-base64';
import Router, { useRouter } from 'next/router';

import * as TWEEN from '@tweenjs/tween.js'
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import {
    GET_CHILD_INVENTORY,
    GET_CATEGORY,
    GET_RELATED_PRODUCTS,
    GET_VIEW_PRODUCT,
    GET_LOGIN,
    GET_NAME_OF_STORE,
    GET_PRODUCT_TYPES,
    MANAGEMENT_INVENTORY,
    GET_BRANDS,
    GET_NUM_OF_VIEWS, GET_LOCATION_DATA,
    GET_INVENTORY_SUB_IMAGES,
    GET_ACCOUNT_DETAILS,
    GET_WEBSITE_VISITS,
    GET_ACCOUNT_DETAILS_ID
} from 'graphql/queries';
import client from 'client';
import { setGlobalState } from 'state';
class DataManager {
    //************************************************* MANAGEMENT START ***********************************************/
    public Inventory(EmailAddress: any) {
        const { data, loading, error } = useQuery(MANAGEMENT_INVENTORY, {
            variables: {
                emailAddress: EmailAddress
            }
        });
        if (error) return
        return { "Inventory": data, "loading": loading, "error": error }
    }

    public ManagementProductTypes() {
        const { data, loading, error } = useQuery(GET_PRODUCT_TYPES);
        return { "Product_Type": data, "loading": loading, "error": error }
    }
    public ManagementBrand() {
        const { data, loading, error } = useQuery(GET_BRANDS);
        return { "Brands": data, "loading": loading, "error": error }
    }
    public ManagementUploadCropImage() {
        const { data, loading, error } = useQuery(GET_BRANDS);
        return { "Brands": data, "loading": loading, "error": error }
    }
    //************************************************* MANAGEMENT END ***********************************************/

    //************************************************* FRONT END START ****************************************************/
    public AccountDetails_id(id: any) {
        const { data, loading, error } = useQuery(GET_ACCOUNT_DETAILS_ID, { variables: { getAccountDetailsIdId: id } });
        console.log(data)
        return { "AccountDetails": data, "loading": loading, "error": error }
    }
    public AccountDetails() {
        const { data, loading, error } = useQuery(GET_ACCOUNT_DETAILS);
        console.log(data)
        return { "AccountDetails": data, "loading": loading, "error": error }
    }
    public nameOfStore() {
        const { data, loading, error } = useQuery(GET_NAME_OF_STORE);
        if (error) return
        return { "Store": data, "loading": loading, "error": error }
    }
    public productRelated() {
        const { data, loading, error } = useQuery(GET_RELATED_PRODUCTS);
        console.log(useQuery(GET_RELATED_PRODUCTS))
        if (error) return
        if (loading) return
        if (data === undefined) return
        return { "Products": data, "loading": loading, "error": error }
    }
    public viewedProduct(id: number) {
        let JSON_DATA = {
            "getToviewProductId": id
        }

        const { data, loading, error } = useQuery(GET_VIEW_PRODUCT, {
            variables: JSON_DATA
        });
        return {
            "ViewedProducts": data,
            "Viewedloading": loading,
            "Viewederror": error
        }
    }
    public category() {
        const { data, loading, error } = useQuery(GET_CATEGORY);
        return { "Category": data, "loading": loading, "error": error }
    }
    public productThumbnail() {
        let JSON_DATA = {
            "skip": "",
            "take": ""
        }
        const { data, loading, error } = useQuery(GET_CHILD_INVENTORY, {
            variables: JSON_DATA,
        });
        if (error) return { "Products": null, "loading": null, "error": null }
        return { "Products": data, "loading": loading, "error": error }
    }
    public async ManagementLogin(username: any, password: any) {
        let JSON_DATA = {
            "username": username,
            "password": password
        }

        const data = await client.query({
            query: GET_LOGIN,
            variables: JSON_DATA
        })

        console.log(data);
        return { "response": data }
    }

    public async Ipaddress() {
        const data = await fetch('https://api.ipify.org?format=json').then(response => response.json())
        return { "ipAddress": data.ip };
    }
    public LocationData(ipAddress: any) {
        // const ipAddressData = await fetch('https://api.ipify.org?format=json').then(response => response.json())
        const { data, loading, error } = useQuery(GET_LOCATION_DATA, { variables: { ipAddress: ipAddress } });
        // if(loading) return
        console.log(data)
        return { "Location_Data": data, "LocationDataLoading": loading, "LocationDataError": error }

    }
    public NumberOfViews() {
        const { data, loading, error } = useQuery(GET_NUM_OF_VIEWS);
        return { "NumberOFViews": data, "LoadingNumberOFViews": loading, "ErrorNumberOFViews": error }
    }
    public WebsiteVisit() {
        const { data, loading, error } = useQuery(GET_WEBSITE_VISITS);
        return { 'NumberOFVisits': data, "LoadingNumberOFVisits": loading, "ErrorNumberOFViews": error }
    }
    public InventorySubImages() {
        const { data, loading, error } = useQuery(GET_INVENTORY_SUB_IMAGES);
        if (error) return { "ImageData": null, "loading": null, "error": null }
        return { "ImageData": data, "loading": loading, "error": error }
    }
    public Success(message: any) {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    public Promise(message: any) {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    public Warning(message: any) {
        toast.warn(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    public Error(message: any) {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    //************************************************* FRONT END END ************************************************* */
    //************************************************* THREEJS START ************************************************* */
    public scene() {
        return new THREE.Scene()
    }
    public renderer(canvas: any, width: any, height: any) {
        const renderer = new THREE.WebGLRenderer({
            preserveDrawingBuffer: true,
            canvas: canvas,
            antialias: true,
            alpha: false,
            precision: 'highp',
        });
        renderer.autoClear = false;
        renderer.clear();
        renderer.clearDepth();
        renderer.setClearColor(0xffffff);
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        return renderer;

    }
    public threeCamera(width: any, height: any) {
        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);

        camera.position.set(0, 0, 200);

        return camera;
    }
    public HDRLighting(path: string) {
        const HDR = new RGBELoader()
            .load(path, function (texture: any) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                // console.log(texture);
                return texture;
            })
        return HDR;
    }
    // public Loadmodel(path: any, callback: (model: THREE.Object3D) => void) {
    //     const manager = new THREE.LoadingManager();
    //     manager.onStart = function (url, itemsLoaded, itemsTotal) {
    //         (document.getElementById('Loading') as HTMLDivElement).style.display ='flex';
    //       };
    //       manager.onLoad = function () {
    //         (document.getElementById('Loading') as HTMLDivElement).style.display ='none';
    //       };
    //       manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    //         (document.getElementById('Loading') as HTMLDivElement).style.display ='flex';
    //       };

    //     const loader = new GLTFLoader(manager);
    //     const dracoLoader = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/').setDecoderConfig({ type: 'js' });
    //     loader.setDRACOLoader(dracoLoader);
    //     loader.load(path, (gltf: any) => {
    //         const model = gltf.scene;
    //         callback(model);
    //     });
    // }
    public Light() {
        const A = new THREE.DirectionalLight(0xFFFFFF, 1);
        A.position.set(12.119, 10.000, 12.311);
        const B = new THREE.DirectionalLight(0xFFFFFF, 1);
        B.position.set(12.124, 10.000, -12.773);
        const C = new THREE.DirectionalLight(0xFFFFFF, 1);
        C.position.set(-12.856, 10.000, 12.346);
        const D = new THREE.DirectionalLight(0xFFFFFF, 1);
        D.position.set(-12.871, 10.000, -12.723);
        const E = new THREE.DirectionalLight(0xFFFFFF, 1);
        E.position.set(12.119, -10.000, 12.311);
        const F = new THREE.DirectionalLight(0xFFFFFF, 1);
        F.position.set(12.124, -10.000, -12.773);
        const G = new THREE.DirectionalLight(0xFFFFFF, 1);
        G.position.set(-12.856, -10.000, 12.346);
        const H = new THREE.DirectionalLight(0xFFFFFF, 1);
        H.position.set(-12.871, -10.000, -12.723);
        const I = new THREE.PointLight(0xFFffff, 0.1);
        I.position.set(0, 1.197, 0)
        const J = new THREE.PointLight(0xffFFff, 0.1);
        J.position.set(0, 0, 2.208)
        const K = new THREE.PointLight(0xffffFF, 0.1);
        K.position.set(0, 0, -2.208)
        const L = new THREE.PointLight(0xFFFFFF, 0.1);
        L.position.set(-2.208, 0, 0)
        const M = new THREE.PointLight(0xFFFFFF, 0.1);
        M.position.set(2.208, 0, 0)
        const N = new THREE.DirectionalLight(0xFF0000, 0.5);
        N.position.set(2.140, 10.000, 2.140);
        const O = new THREE.DirectionalLight(0xFF0000, 0.5);
        O.position.set(2.140, 10.000, -2.140);
        const P = new THREE.DirectionalLight(0xFF0000, 0.5);
        P.position.set(-2.140, 10.000, 2.140);
        const Q = new THREE.DirectionalLight(0xFF0000, 0.5);
        Q.position.set(-2.140, 10.000, -2.140);
        const N1 = new THREE.DirectionalLight(0x00FF00, 0.5);
        N1.position.set(2.140, 9.000, 2.140);
        const O1 = new THREE.DirectionalLight(0x00FF00, 0.5);
        O1.position.set(2.140, 9.000, -2.140);
        const P1 = new THREE.DirectionalLight(0x00FF00, 0.5);
        P1.position.set(-2.140, 9.000, 2.140);
        const Q1 = new THREE.DirectionalLight(0x00FF00, 0.5);
        Q1.position.set(-2.140, 9.000, -2.140);
        const N2 = new THREE.DirectionalLight(0x0000FF, 0.5);
        N2.position.set(2.140, 8.000, 2.140);
        const O2 = new THREE.DirectionalLight(0x0000FF, 0.5);
        O2.position.set(2.140, 8.000, -2.140);
        const P2 = new THREE.DirectionalLight(0x0000FF, 0.5);
        P2.position.set(-2.140, 8.000, 2.140);
        const Q2 = new THREE.AmbientLight(0xFF0000); // Soft white ambient light
        const light = new THREE.DirectionalLight(0x717171, 1);

        light.position.set(0, 100, 40);
        light.castShadow = true;
        light.shadow.mapSize.width = 150; // Set larger shadow map width
        light.shadow.mapSize.height = 150; // Set larger shadow map height
        light.shadow.camera.near = 5.5; // Set near value for the shadow camera
        light.shadow.camera.far = 500; // Set far value for the shadow camera
        light.shadow.camera.left = -40; // Adjust the shadow camera left
        light.shadow.camera.right = 40; // Adjust the shadow camera right
        light.shadow.camera.top = 40; // Adjust the shadow camera top
        light.shadow.camera.bottom = -40; // Adjust the shadow camera bottom
        light.shadow.radius = 2; // Set shadow map blur radius for softening\

        return { A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, N1, O1, P1, Q1, N2, O2, P2, Q2, light };

    }
    public cameraPositionLimit = (camera: any, controls: any) => {
        camera.updateProjectionMatrix();
        if (camera.position.y <= 1) {
            controls.enabled = false;
        } else {
            controls.enabled = true;
        }
        if (camera.position.z >= 75) {
            camera.position.z = 74.9;
            controls.enabled = false;
        } else {
            controls.enabled = true;
        }
        if (camera.position.z <= -75) {
            camera.position.z = -74.9;
            controls.enabled = false;
        } else {
            controls.enabled = true;
        }
        if (camera.position.x >= 75) {
            camera.position.x = 74.9;
            controls.enabled = false;
        } else {
            controls.enabled = true;
        }
        if (camera.position.x <= -75) {
            camera.position.x = -74.9;
            controls.enabled = false;
        } else {
            controls.enabled = true;
        }
        if (camera.position.y >= 200) {
            camera.position.y = 199.9;
            controls.enabled = false;
        } else {
            controls.enabled = true;
        }

        if (camera.position.y <= 1) {
            camera.position.y = 1.1;
            controls.enabled = false;
        } else {
            controls.enabled = true;
        }
    }
    public updateCameraOrbit = (camera: any, controls: any) => {
        var forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        controls.target.copy(camera.position).add(forward);
        controls.update();
    };
    public setSharedCookie = (name: string, value: string, daysToExpire: number, domain: string) => {
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + daysToExpire);

        const encodedValue = Base64.encode(value);
        const numChunks = Math.ceil(encodedValue.length / 3800);

        for (let i = 0; i < numChunks; i++) {
            const chunk = encodedValue.substring(i * 3800, (i + 1) * 3800);
            const chunkName = `${name}_${i}`;
            const cookieValue = `${encodeURIComponent(chunkName)}=${encodeURIComponent(chunk)}; expires=${expiration.toUTCString()}; domain=${domain}; path=/`;
            document.cookie = cookieValue;
        }

        // Store the number of chunks as a separate cookie
        const cookieValue = `${encodeURIComponent(name)}_chunks=${numChunks}; expires=${expiration.toUTCString()}; domain=${domain}; path=/`;
        document.cookie = cookieValue;
    };


    public Loadmodel(path: any, camera: any, scene: any) {
        const manager = new THREE.LoadingManager();

        manager.onStart = function (url, itemsLoaded, itemsTotal) {
            const loadingElement = document.getElementById('Loading') as HTMLDivElement;
            loadingElement.style.display = 'flex';
        };
        manager.onLoad = function () {
            const loadingElement = document.getElementById('Loading') as HTMLDivElement;
            loadingElement.style.display = 'none';
        };
        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            const loadingElement = document.getElementById('Loading') as HTMLDivElement;
            loadingElement.style.display = 'flex';
            const Element = document.getElementById('progress') as HTMLDivElement; // You're missing a declaration for 'Element'
            const percentComplete = ((itemsLoaded / itemsTotal) * 100).toFixed(0);
            Element.innerText = `Progress: ${percentComplete}%`;
        };
        manager.onError = function (url) {
            const loadingElement = document.getElementById('Loading') as HTMLDivElement;
            loadingElement.style.display = 'flex';
        };
        const loader = new GLTFLoader(manager);
        const dracoLoader = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/').setDecoderConfig({ type: 'js' });
        loader.setDRACOLoader(dracoLoader);
        loader.load(path, (gltf: any) => {
            let model = gltf.scene;
            model.position.set(0, -0.5, 0);
            model.scale.set(2,2,2)
            if (!model) return;
            var box = new THREE.Box3().setFromObject(model);
            var center = box.getCenter(new THREE.Vector3());
            var size = box.getSize(new THREE.Vector3());
            var maxDim = Math.max(size.x, size.y, size.z);
            var fov = camera.fov * (Math.PI / 180);
            var cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));
            camera.position.set(center.x, center.y, cameraZ * 1);
            model.castShadow = true;
            model.receiveShadow = true;
            model.traverse((child: any) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })

            scene.add(model);
        },
            // onProgress callback
            function (xhr: any) {
                const loadingElement = document.getElementById('progress') as HTMLDivElement;
                if (xhr.lengthComputable) {
                    const percentComplete = xhr.loaded / xhr.total * 100;
                    loadingElement.innerText = `Downloading: ${Math.round(percentComplete)}%`;
                } else {
                    loadingElement.innerText = 'Loading...';
                }
            });
    }
    public Box3() {
        return new THREE.Box3();
    }
    public Vector3() {
        return new THREE.Vector3();
    }
    public orbitControl(camera: any, renderer: any) {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.enablePan = false;
        return controls;
    }
    public animateScale(modelScale: any, size: any, control: any) {
        const newScale = new THREE.Vector3();
        newScale.set(size, size, size)
        let tween = new TWEEN.Tween(modelScale).to(newScale, 1500);
        tween.easing(TWEEN.Easing.Quadratic.InOut);
        tween.start();
        tween.onUpdate(function () {
            control.update();
        }.bind(this));
        tween.onComplete(function () {
            control.update();
        }.bind(this));
    }
    //************************************************* THREEJS END *************************************************** */

    public triggerLogin = async (e: any) => {
        const router = useRouter();
        e.preventDefault(); // Prevent default form submission behavior
        const username: any = (document.getElementById("username") as HTMLInputElement).value;
        const password: any = (document.getElementById("password") as HTMLInputElement).value;
        const response: any = await client.query({
            query: GET_LOGIN,
            variables: {
                "username": username,
                "password": password
            }
        })
        const errorHandling = document.getElementById("ErrorHandling");
        if (username === "" || username === null) {
            errorHandling.innerHTML = "Input Username";
            (document.getElementById("username") as HTMLInputElement).focus();
        } else if (password === "" || password === null) {
            errorHandling.innerHTML = "Input Password";
            (document.getElementById("password") as HTMLInputElement).focus();
        } else {
            if (response.data.getLogin.statusText === "Welcome!") {
                this.setSharedCookie("token", response.data.getLogin.jsonToken, 1, 'localhost');
                router.push('/Management/Dashboard/');
            } else {
                errorHandling.innerHTML = "Input Password";
                (document.getElementById("password") as HTMLInputElement).focus();
            }

        }
    };

}
export default DataManager