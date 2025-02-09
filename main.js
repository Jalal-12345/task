import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";




// إنشاء المشهد
const scene = new THREE.Scene();

// إنشاء الكاميرا
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// إنشاء المُحرك (Renderer)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, 400); // تصغير حجم الشاشة السوداء
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "50%";
renderer.domElement.style.left = "0";
renderer.domElement.style.transform = "translate(0, -50%)";
renderer.domElement.style.borderRadius = "15% 85% 64% 36% / 23% 46% 54% 77%  "

document.body.appendChild(renderer.domElement);

// تحميل ملف 3D خارجي
const loader = new GLTFLoader();
loader.load('models/skull/scene.gltf', function (gltf) {
  const model = gltf.scene;
  model.scale.set(10, 10, 5); // تصغير حجم النموذج
  scene.add(model);
},
  undefined, function (error) {
    console.error('حدث خطأ أثناء تحميل الملف:', error);
  });

// إضافة إضاءة للمشهد
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;

// دالة التحريك
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // تحديث التحكم بالكاميرا
  renderer.render(scene, camera);
}

animate();
