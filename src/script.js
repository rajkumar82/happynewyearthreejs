import * as THREE from 'three'
import {
	OrbitControls
} from 'three/addons/controls/OrbitControls.js'

import GUI from 'lil-gui'
import gsap from 'gsap'

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

// Create a Mesh
const boxGeometry = new THREE.BoxGeometry(1, 1, 1,4,4,4)
var axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

const debugObject = {
	color:  '#33aabb',
	subdivisions: 2
}

// Trials related to cube

// Create a pane for gui settings
//var guiFolder = gui.addFolder('Cube Pane')

// const material = new THREE.MeshBasicMaterial({
// 	color: debugObject.color,
// 	wireframe: true
// })
// const mesh = new THREE.Mesh(boxGeometry, material)
// mesh.position.set(1, 1, 1)
// scene.add(mesh)
// guiFolder.add(mesh.position,'y').min(0).max(10).step(1).name('Elevation')
// guiFolder.add(mesh,'visible').name('Visibility')
// guiFolder.add(mesh.material,'wireframe').name('Wireframe')
// guiFolder.addColor(debugObject,'color').name('Color').onChange(()=>{
// 	//console.log(mesh.material.color.getHexString())
// 	mesh.material.color.set(debugObject.color)
// })

// guiFolder.add(debugObject,'subdivisions').min(2).max(10).step(1).onFinishChange(()=>{
// 	mesh.geometry.dispose()
// 	mesh.geometry = new THREE.BoxGeometry(1,1,1,debugObject.subdivisions,debugObject.subdivisions,debugObject.subdivisions)
// })

// debugObject.spin = () => {
// 	gsap.to(mesh.rotation,{y:mesh.rotation.y + Math.PI*2})
// }
// guiFolder.add(debugObject,'spin')


// Create a Camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(0, 1, 10)
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






function animate() {

	requestAnimationFrame(animate)
	
	renderer.render(scene, camera)
}


animate()