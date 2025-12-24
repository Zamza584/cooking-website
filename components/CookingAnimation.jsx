"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CookingAnimation() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xefe6e0);

        const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Create pan (cylinder)
        const panGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 32);
        const panMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.8, roughness: 0.3 });
        const pan = new THREE.Mesh(panGeometry, panMaterial);
        pan.position.y = -1;
        scene.add(pan);

        // Create pan handle
        const handleGeometry = new THREE.BoxGeometry(0.2, 0.2, 1.2);
        const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(1.8, -0.8, 0);
        scene.add(handle);

        // Create food particles (spheres)
        const foodGroup = new THREE.Group();
        scene.add(foodGroup);

        const particleCount = 12;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const colors = [0xff6b4a, 0xffa500, 0xffcc66, 0xff8c42];
            const particleMaterial = new THREE.MeshStandardMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                metalness: 0.2,
                roughness: 0.7,
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);

            const angle = (i / particleCount) * Math.PI * 2;
            const radius = 1.0;
            particle.position.set(Math.cos(angle) * radius, -0.8, Math.sin(angle) * radius);

            particles.push({
                mesh: particle,
                angle: angle,
                radius: radius,
                time: 0,
            });
            foodGroup.add(particle);
        }

        // Handle hover effect
        let mouseX = 0;
        let mouseY = 0;
        let targetRotX = 0;
        let targetRotY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            targetRotY = mouseX * 0.5;
            targetRotX = mouseY * 0.3;
        });

        // Animation loop
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Pan rotation
            pan.rotation.x += (targetRotX - pan.rotation.x) * 0.1;
            pan.rotation.z += (targetRotY - pan.rotation.z) * 0.1;

            // Handle rotation with pan
            handle.rotation.x = pan.rotation.x;
            handle.rotation.z = pan.rotation.z;

            // Animate particles
            particles.forEach((p, i) => {
                p.time += 0.01;
                const bobOffset = Math.sin(p.time + i) * 0.3;
                const rotOffset = Math.cos(p.time * 0.5 + i) * 0.5;

                p.mesh.position.x = Math.cos(p.angle + rotOffset) * p.radius + pan.rotation.z * 0.5;
                p.mesh.position.y = -0.8 + bobOffset;
                p.mesh.position.z = Math.sin(p.angle + rotOffset) * p.radius + pan.rotation.x * 0.5;

                p.mesh.rotation.x += 0.02;
                p.mesh.rotation.y += 0.015;
                p.mesh.rotation.z += 0.01;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            const width = containerRef.current?.clientWidth || 800;
            const height = containerRef.current?.clientHeight || 600;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", () => { });
            cancelAnimationFrame(animationId);
            if (containerRef.current?.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            panGeometry.dispose();
            panMaterial.dispose();
            handleGeometry.dispose();
            handleMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "400px",
                borderRadius: "12px",
                overflow: "hidden",
            }}
        />
    );
}
