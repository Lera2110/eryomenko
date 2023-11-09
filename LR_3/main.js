import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { MindARThree } from 'mindar-image-three';


document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "hiro_quad.mind",
			uiScanning: "yes",
			uiLoading: "yes",
			maxTrack: 2,
		      });
		const {renderer, scene, camera} = mindarThree;

		const anchor_hiro = mindarThree.addAnchor(0);
		const anchor_quad = mindarThree.addAnchor(1);

		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 5);
		scene.add(light);

		const loader = new GLTFLoader();

		loader.load("horse.glb", (model1) => {
			anchor_hiro.group.add(model1.scene);
			model1.scene.scale.set(0.7, 0.7, 0.7);
			model1.scene.position.set(0, -1, 0);
		});

		loader.load("ship_x.glb", (model2) => {
			anchor_quad.group.add(model2.scene);
			model2.scene.scale.set(0.1, 0.1, 0.1);
		});


		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			  renderer.render(scene, camera);
		});
	}
	start();
});