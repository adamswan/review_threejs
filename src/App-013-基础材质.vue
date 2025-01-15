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


// 6、添加灯光
// 6.1、创建灯光对象
const spotLight = new THREE.SpotLight(0xffffff);
// 6.2、设置灯光位置
spotLight.position.set(-10, 10, 90);
// 6.3、设置灯光强度，确保足够照亮立方体
spotLight.intensity = 8000;
// 6.3、添加到场景中
scene.add(spotLight);

cube.castShadow = true; // 允许立方体产生阴影
spotLight.castShadow = true; // 允许灯光产生阴影
renderer.shadowMap.enabled = true; // 允许渲染器产生阴影

// 传入点光源, 生成 GUI 控制器
initGUIControl(spotLight);

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
