import { useEffect, useRef } from "react";

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: any = null;
    let animationId: number;

    const init = async () => {
      try {
        const THREE = await import("three");
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 8;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // === PARTICLES ===
        const particleCount = 1800;
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 30;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
          sizes[i] = Math.random() * 0.04 + 0.01;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const pMat = new THREE.PointsMaterial({
          size: 0.04,
          color: 0x2563eb,
          transparent: true,
          opacity: 0.45,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        // Second particle layer — cyan
        const positions2 = new Float32Array(800 * 3);
        for (let i = 0; i < 800; i++) {
          positions2[i * 3] = (Math.random() - 0.5) * 25;
          positions2[i * 3 + 1] = (Math.random() - 0.5) * 25;
          positions2[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        const pGeo2 = new THREE.BufferGeometry();
        pGeo2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));
        const pMat2 = new THREE.PointsMaterial({
          size: 0.03,
          color: 0x0ea5e9,
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const particles2 = new THREE.Points(pGeo2, pMat2);
        scene.add(particles2);

        // === FLOATING 3D SHAPES ===
        const shapesGroup = new THREE.Group();
        scene.add(shapesGroup);

        const shapeConfigs = [
          { geo: new THREE.IcosahedronGeometry(0.55, 1), color: 0x2563eb, opacity: 0.15 },
          { geo: new THREE.OctahedronGeometry(0.45, 0), color: 0x0ea5e9, opacity: 0.18 },
          { geo: new THREE.TetrahedronGeometry(0.65, 0), color: 0x7c3aed, opacity: 0.12 },
          { geo: new THREE.TorusGeometry(0.55, 0.06, 12, 60), color: 0x2563eb, opacity: 0.2 },
          { geo: new THREE.TorusKnotGeometry(0.4, 0.1, 80, 12), color: 0x0ea5e9, opacity: 0.12 },
          { geo: new THREE.DodecahedronGeometry(0.5, 0), color: 0x7c3aed, opacity: 0.14 },
        ];

        for (let i = 0; i < 28; i++) {
          const cfg = shapeConfigs[i % shapeConfigs.length];
          const mat = new THREE.MeshBasicMaterial({
            color: cfg.color,
            wireframe: true,
            transparent: true,
            opacity: cfg.opacity,
          });
          const mesh = new THREE.Mesh(cfg.geo, mat);
          mesh.position.set(
            (Math.random() - 0.5) * 22,
            (Math.random() - 0.5) * 22,
            (Math.random() - 0.5) * 12
          );
          mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );
          const s = Math.random() * 0.6 + 0.3;
          mesh.scale.set(s, s, s);
          shapesGroup.add(mesh);
        }

        // === CONNECTING LINES (grid-like depth lines) ===
        const linesMat = new THREE.LineBasicMaterial({
          color: 0x2563eb,
          transparent: true,
          opacity: 0.06,
        });
        for (let i = 0; i < 12; i++) {
          const pts = [];
          for (let j = 0; j < 6; j++) {
            pts.push(new THREE.Vector3(
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10
            ));
          }
          const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
          const line = new THREE.Line(lineGeo, linesMat);
          scene.add(line);
        }

        // === MOUSE PARALLAX ===
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const onMouseMove = (e: MouseEvent) => {
          targetX = ((e.clientX / window.innerWidth) - 0.5) * 2;
          targetY = -((e.clientY / window.innerHeight) - 0.5) * 2;
        };
        document.addEventListener("mousemove", onMouseMove);

        // === RESIZE ===
        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        let t = 0;

        const animate = () => {
          animationId = requestAnimationFrame(animate);
          t += 0.004;

          // Smooth mouse parallax
          currentX += (targetX - currentX) * 0.04;
          currentY += (targetY - currentY) * 0.04;

          camera.position.x = currentX * 1.5;
          camera.position.y = currentY * 1.2;
          camera.lookAt(0, 0, 0);

          // Rotate particles
          particles.rotation.y = t * 0.018;
          particles.rotation.x = t * 0.009;
          particles2.rotation.y = -t * 0.014;
          particles2.rotation.z = t * 0.007;

          // Rotate shapes group
          shapesGroup.rotation.y = t * 0.008;
          shapesGroup.rotation.x = t * 0.004;

          // Animate individual shapes with floating
          shapesGroup.children.forEach((child, i) => {
            child.rotation.x += 0.003 * (i % 2 === 0 ? 1 : -1);
            child.rotation.y += 0.005 * (i % 3 === 0 ? 1 : -1);
            child.position.y += Math.sin(t * 0.8 + i * 0.7) * 0.003;
            child.position.x += Math.cos(t * 0.5 + i * 0.4) * 0.002;
          });

          renderer.render(scene, camera);
        };

        animate();

        return () => {
          window.removeEventListener("resize", onResize);
          document.removeEventListener("mousemove", onMouseMove);
          cancelAnimationFrame(animationId);
          if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
          }
          scene.clear();
          renderer.dispose();
        };
      } catch {
        // WebGL not available — CSS fallback
      }
    };

    const cleanupPromise = init();
    return () => {
      cleanupPromise.then((fn) => fn?.());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
