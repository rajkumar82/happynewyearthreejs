import * as THREE from 'three'
import {
	OrbitControls
} from 'three/addons/controls/OrbitControls.js'

import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

//
//  Debug GUI
//
const gui = new GUI(
	{
		width:400,
		title:'Debug GUI',
		closeFolders:true,				
	}
)

// Hide the debug Gui Initially
gui.show(false)

// When 'h' is pressed, make the debug gui visible
window.addEventListener('keydown',(event)=>{
	if(event.key == 'h')
	{
		gui.show(gui._hidden)
	}
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Create a Scene
const scene = new THREE.Scene()

// Create a Camera
const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000)
camera.position.set(0, 20, 20)
scene.add(camera)




// Create a renderer
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: canvas
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


var sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

/*
 *    Event listener for double click to maximize to full screen
 */
window.addEventListener('dblclick', () => {
	const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen()
		} else if (canvas.webkitRequestFullscreen) {
			canvas.webkitRequestFullscreen()
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen()
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen()
		}
	}
})

/*
 *   Event listener for resize window
 *
 */
window.addEventListener('resize', () => {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()




const debugObject = {
	color:  '#33aabb',
	subdivisions: 2	
}

const meshes =[]
const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)
material.side = THREE.DoubleSide

//light
const light = new THREE.AmbientLight(new THREE.Color('white'))
scene.add(light)

for(var i=0;i<1000;i++)
{
	var size = 1/2
	const mesh = new THREE.Mesh(new THREE.BoxGeometry(size,size,size),material)
	scene.add(mesh)
	meshes.push(mesh)

	var full=600
	var half = full/2

	mesh.position.x = Math.random()*full-half
	mesh.position.y = Math.random()*full-half
	mesh.position.z = Math.random()*full-half

	const sphere = new THREE.Mesh(new THREE.BoxGeometry(1/2),material)
	scene.add(sphere)

	sphere.position.x = Math.random()*full-half
	sphere.position.y = Math.random()*full-half
	sphere.position.z = Math.random()*full-half
	meshes.push(sphere)
}

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_bold.typeface.json',
    (font) =>
    {
		
        const textGeometry = new TextGeometry(
            'Happy New Year 2024',
            {
                font: font,
                size: 2.5,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        
		textGeometry.center()
        const text = new THREE.Mesh(textGeometry, material)		
        scene.add(text)
    }
)


const clock = new THREE.Clock()

function animate() {

	requestAnimationFrame(animate)

	const elapsedTime = clock.getElapsedTime()

	meshes.forEach(element => {
		// Update objects
		element.rotation.x = element.rotation.x+ (Math.random())/30
		element.rotation.y = element.rotation.y +(Math.random())/30
		element.rotation.z = element.rotation.z + (Math.random())/30
	});

	
	 camera.rotation.x = camera.rotation.x +(Math.random())/2000
	 camera.rotation.y = camera.rotation.y +(Math.random()-0.5)/2000
	 camera.rotation.z = camera.rotation.z + (Math.random())/2000
	 
	
	renderer.render(scene, camera)
}


animate()