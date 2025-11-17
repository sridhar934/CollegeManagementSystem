import React, { useEffect } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = document.getElementById("three-bg");
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const particles = new THREE.Group();
    scene.add(particles);

    const geometry = new THREE.SphereGeometry(0.6, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 180; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      particles.add(mesh);
    }

    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0007;
      particles.rotation.y += 0.0012;
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, []);

  return <div id="three-bg" style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
}
