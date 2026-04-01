import { useEffect, useRef } from 'react';

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: any = null;
    let animationFrameId: number;

    const init = async () => {
      try {
        const THREE = await import('three');

        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0015);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Particle field
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 25;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({
          size: 0.02,
          color: 0x22D3EE,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        // Abstract geometries
        const group = new THREE.Group();
        scene.add(group);

        const geometries = [
          new THREE.IcosahedronGeometry(0.5, 0),
          new THREE.OctahedronGeometry(0.4, 0),
          new THREE.TetrahedronGeometry(0.6, 0),
          new THREE.TorusGeometry(0.5, 0.02, 16, 100)
        ];

        const mats = [
          new THREE.MeshBasicMaterial({ color: 0x1E3A8A, wireframe: true, transparent: true, opacity: 0.2 }),
          new THREE.MeshBasicMaterial({ color: 0x2563EB, wireframe: true, transparent: true, opacity: 0.3 }),
          new THREE.MeshBasicMaterial({ color: 0x22D3EE, wireframe: true, transparent: true, opacity: 0.4 }),
          new THREE.MeshBasicMaterial({ color: 0xA78BFA, wireframe: true, transparent: true, opacity: 0.3 }),
        ];

        for (let i = 0; i < 30; i++) {
          const geo = geometries[Math.floor(Math.random() * geometries.length)];
          const mat = mats[Math.floor(Math.random() * mats.length)];
          const mesh = new THREE.Mesh(geo, mat);

          mesh.position.x = (Math.random() - 0.5) * 20;
          mesh.position.y = (Math.random() - 0.5) * 20;
          mesh.position.z = (Math.random() - 0.5) * 15;
          mesh.rotation.x = Math.random() * Math.PI;
          mesh.rotation.y = Math.random() * Math.PI;

          const scale = Math.random() * 0.5 + 0.3;
          mesh.scale.set(scale, scale, scale);
          group.add(mesh);
        }

        camera.position.z = 5;

        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX - windowHalfX) * 0.0005;
          mouseY = (event.clientY - windowHalfY) * 0.0005;
        };

        document.addEventListener('mousemove', onMouseMove);

        let elapsedTime = 0;
        let lastTime = performance.now();

        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);

          const now = performance.now();
          elapsedTime += (now - lastTime) / 1000;
          lastTime = now;

          particlesMesh.rotation.y = elapsedTime * 0.02;
          particlesMesh.rotation.x = elapsedTime * 0.01;

          group.rotation.x += 0.0005;
          group.rotation.y += 0.001;

          group.children.forEach((child, i) => {
            child.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1);
            child.rotation.y += 0.002 * (i % 3 === 0 ? 1 : -1);
            child.position.y += Math.sin(elapsedTime * 0.5 + i) * 0.002;
          });

          camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
          camera.position.y += (-mouseY * 5 - camera.position.y) * 0.02;
          camera.lookAt(scene.position);

          renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          document.removeEventListener('mousemove', onMouseMove);
          cancelAnimationFrame(animationFrameId);
          if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
          }
          scene.clear();
          renderer.dispose();
        };
      } catch {
        // WebGL not available — CSS fallback background handles the visuals
      }
    };

    const cleanup = init();

    return () => {
      cleanup.then(fn => fn && fn());
      cancelAnimationFrame(animationFrameId);
      if (renderer) {
        try { renderer.dispose(); } catch { }
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ pointerEvents: 'none' }}
    />
  );
}
