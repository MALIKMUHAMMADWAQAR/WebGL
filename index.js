function init() {


  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000)
  const renderer = new THREE.WebGLRenderer({antialias: true})

  renderer.setSize(innerWidth, innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  document.body.appendChild(renderer.domElement)

  //Creating a sphere
const sphereGeometry = new THREE.SphereGeometry(10,50,50)
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('uvglobe.png')

})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)

function createCoordinates(lati,longi,colr,data){

  if(data == "bar"){
  var point = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,8),
   new THREE.MeshBasicMaterial({color:colr, opacity:0.4, transparent: true}))
 }

 else{
   var point = new THREE.Mesh(new THREE.SphereGeometry(0.3,10,10),
    new THREE.MeshBasicMaterial({color:colr,opacity:0.4, transparent: true}))
 }

   const latitude = ((lati-5) / 180) * Math.PI
   const longitude = ((longi+8) / 180) * Math.PI
   const radius = 10;
   const x = radius * Math.cos(latitude) * Math.sin(longitude)
   const y = radius * Math.sin(latitude)
   const z = radius * Math.cos(latitude) * Math.cos(longitude)

   point.position.x = x;
   point.position.y = y;
   point.position.z = z;


   scene.add(point);

   sphere.add(point);

   point.lookAt(0,0,0)


}

//pakistan
createCoordinates(30.5753, 69.3451, 'green','bar')
//China
createCoordinates(35.8617,104.1954, 'yellow','bar')
//South Korea
createCoordinates(35.9078, 127.7669,'red','bar')
//Germany
 createCoordinates(51.1657, 10.4515,'orange','point')
//France
createCoordinates(46.2276, 2.2137,'black','point')
//Poland
createCoordinates(51.9194, 19.1451,'purple','point')


window.addEventListener('resize', onResize, false);
function onResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}



camera.position.z = 25



//Ray caster
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2();

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
raycaster.setFromCamera(mouse, camera)


var trackballControls = initTrackballControls(camera, renderer);
var clock = new THREE.Clock();

function render() {
    // update the stats and the controls
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera)
  }

  render();

//popup
  function animate() {
  requestAnimationFrame(animate)



  sphere.rotation.y += 0.005


    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(sphere.children );
  //
  sphere.children.forEach((mesh) =>{
    mesh.material.opacity = 0.4;
  })

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[i].object.material.opacity = 1

	}

	renderer.render( scene, camera );



  }
window.addEventListener( 'mousemove', onMouseMove, false );
  animate()

}
