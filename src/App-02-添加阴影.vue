<template>
  <div></div>
</template>

<script setup>
import * as THREE from "three";
import { onMounted } from "vue";

// 1、创建场景
const scene = new THREE.Scene();


// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 角度
  window.innerWidth / window.innerHeight, // 相机的宽高比
  1, // 近平面
  1000 // 远平面
);
// 设置相机位置
camera.position.set(0, 0, 20);


// 3、创建渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);


// 4、将渲染器添加到body
document.body.appendChild(renderer.domElement);


// 5、添加一个立方体
// 5.1、创建立方体对象
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
// 5.2、创建材质对象
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "pink", // 颜色
  wireframe: false, // 是否是线框模式
});
// 5.3、创建网格模型对象
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 5.4、添加到场景中
scene.add(cube);

// 6、添加一个平面，用来接收阴影
// 6.1、创建平面对象
const planeGeometry = new THREE.PlaneGeometry(20, 30);
// 6.2、创建材质对象
const planeMaterial = new THREE.MeshBasicMaterial({color: 0x999999});
// 6.3、创建网格模型对象
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// 6.4、调整平面的角度并添加到场景中
plane.rotateZ(20);
plane.position.z = -10;
plane.position.x = 3;
scene.add(plane);


// 7、添加一个灯光
const spotlight = new THREE.SpotLight(0xffffff);
spotlight.position.set(-10, 10, 90);
scene.add(spotlight);


// 8、阴影设置
cube.castShadow = true; //让立方体产生阴影
plane.receiveShadow = true; // 让平面接收阴影
spotlight.castShadow = true; // 让灯光产生阴影
renderer.shadowMap.enabled = true; // 开启阴影


onMounted(() => {
  // 10、添加动画，让图形动起来
  function animation() {
    cube.rotation.x = cube.rotation.x + 0.01;
    cube.rotation.y = cube.rotation.y + 0.01;

    // 9、渲染，传入场景和相机
    renderer.render(scene, camera);

    requestAnimationFrame(animation);
  }
  animation();
});
</script>
