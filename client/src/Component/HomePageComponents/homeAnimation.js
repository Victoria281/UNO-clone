import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

let camera, scene, renderer;
const loader = new GLTFLoader();

export function homeAnimation() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 5;
    camera.rotation.z = 1;

	scene = new THREE.Scene();

    const light = new THREE.AmbientLight( 0xffffff, 2 );
    scene.add( light );


    loader.load("/models/uno_cards_3d/scene.gltf", (gltf) => {
        let model = gltf.scene
        model.scale.set(1.75, 1.75, 1.75)

        gsap.to(camera.position, {
            z: 1,
            duration: 1,
            ease: "back.out(1.7)"
        })
        gsap.to(camera.rotation, {
            z: 0,
            duration: 1
        })

        gsap.to(model.rotation, {
            x: 1,
            duration: 1,
            delay: 1
        })
        gsap.to(model.rotation, {
            y: Math.PI * 1.75,
            duration: 2,
            delay: 1
        })
        gsap.to(model.scale, {
            delay: 1,
            duration: 1,
            x: 2.4,
            y: 2.4,
            z: 2.4
        })
        gsap.to(model.position, {
            delay: 1,
            duration: 1,
            x: .60,
            y: .1
        })

        gsap.to(model.rotation, {
            y: Math.PI * 1.75,
            duration: 30,
            repeat: -1,
            delay: 1
        })

        scene.add(model)
    })

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animation );
    renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
	document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    });
}

function animation() {
	renderer.render( scene, camera );

}