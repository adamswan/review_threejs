<template>
  <div></div>
</template>

<script setup>
import * as THREE from "three";
import { onMounted } from "vue";
import { initGUIControl } from "./GUI-Control/index";

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

// 4、将渲染器添加到 body
document.body.appendChild(renderer.domElement);

// 5、添加一个立方体
// 5.1、创建立方体对象
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 5.2、创建材质对象
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: "pink", // 颜色
  wireframe: false, // 是否是线框模式
});
// 5.3、创建网格模型对象
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 5.4、添加到场景中
scene.add(cube);

// 7、添加一个平面.接收阴影
const planeGeometry = new THREE.PlaneGeometry(20, 30);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0x999999,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// 正确的旋转平面的方式
plane.rotateZ(20);
// 正确的设置平面位置的方式
plane.position.z = -10;
plane.position.x = 3;
scene.add(plane);

// 6、添加灯光
// 6.1、创建灯光对象
const hemisphereLight = new THREE.HemisphereLight(0xffffff);
// 6.2、设置灯光位置
hemisphereLight.position.set(-10, 10, 90);
// 6.3、设置灯光强度，确保足够照亮立方体
hemisphereLight.intensity = 8000;
// 6.3、添加到场景中
scene.add(hemisphereLight);

cube.castShadow = true; // 允许立方体产生阴影
plane.receiveShadow = true; // 允许平面接收阴影

// 传入光源, 生成 GUI 控制器
initGUIControl(hemisphereLight);

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

<style scoped>

</style>
