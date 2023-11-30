<template>
  <div ref="rendererContainer" class="renderer-container" />
</template>

<script>
  import {onUnmounted, onMounted, ref} from 'vue';
  import * as THREE from 'three';
  import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader.js';

  export default {
    props: {
      deg: {
        type: Number,
        default: 0,
      },
      mode: {
        type: String,
        default: 'white',
      },
      rotate: {
        type: Boolean,
        default: true,
      },
      size: {
        type: Number,
        default: 2,
      },
      color: {
        type: String,
        default: null,
      },
    },
    setup(props, context) {
      const symbol = `<?xml version="1.0" encoding="UTF-8"?>
<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.62 43.26">
  <path class="cls-1" d="m43.45,19.45H13.89c2.21-1.56,4.15-3.49,5.72-5.7v3.52h4.36V1h0c.01-.33.03-.66.03-1h-4.36C19.63,10.72,10.91,19.45.16,19.45H.03s0,0,0,0h-.03v4.36h29.73c-2.21,1.56-4.14,3.5-5.71,5.71v-3.58h-4.36v16.27h0c-.01.31-.02.61-.03.92,0,.04,0,.09,0,.13h4.35c0-10.72,8.73-19.45,19.46-19.45h.15s0-.33,0-.33v-4.03s-.17,0-.17,0Z"/>
</svg>
`;
      const rendererContainer = ref(null);
      let size = {
        width: 56,
        height: 56,
      };
      let renderer, camera;

      onMounted(() => {
        const scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          size.width / size.height,
          0.1,
          1000,
        );
        renderer = new THREE.WebGLRenderer(
          props.mode === 'white'
            ? {
                alpha: true,
              }
            : {
                color: '#343434',
              },
        );
        renderer.setSize(size.width, size.height);
        rendererContainer.value.appendChild(renderer.domElement);

        const loader = new SVGLoader();
        const svgData = loader.parse(symbol);
        const group = new THREE.Group();
        scene.add(group);

        const material = new THREE.MeshBasicMaterial({
          color: props.color
            ? props.color
            : props.mode === 'white'
              ? 0x232323
              : 0xffffff,
          side: THREE.DoubleSide,
        });
        const extrudeSettings = {
          depth: 5, // 두께를 조절할 수 있는 값
          bevelEnabled: false,
        };

        // svg를 3d오브젝트로 변경
        svgData.paths.forEach(path => {
          const shapes = path.toShapes(true);
          shapes.forEach(shape => {
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          });
        });

        // 그룹 설정
        svgData.paths.forEach(path => {
          const shapes = path.toShapes(true);
          shapes.forEach(shape => {
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          });
        });

        group.updateMatrixWorld();
        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        box.getCenter(center);
        group.position.sub(center);

        // 크기설정
        group.scale.set(props.size, props.size, props.size);

        camera.position.z = 80;

        const animate = function () {
          requestAnimationFrame(animate);

          if (props.rotate) {
            group.rotation.z += 0.007;
            group.rotation.y += 0.01;
            group.rotation.y += 0.01;
            // 오브젝트의 bbox 중심점을 계산하고, 이를 기준으로 오브젝트를 이동시킵니다.
            const box = new THREE.Box3().setFromObject(group);
            const center = new THREE.Vector3();
            box.getCenter(center);
            group.position.sub(center);
          }

          renderer.render(scene, camera);
        };
        animate();

        // 리사이즈 이벤트
        window.addEventListener('resize', onWindowResize);
      });

      onUnmounted(() => {
        // 리사이즈 이벤트 해제
        window.removeEventListener('resize', onWindowResize);
      });

      function onWindowResize() {
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
        renderer.setSize(size.width, size.height);
      }

      return {rendererContainer};
    },
  };
</script>

<style></style>
