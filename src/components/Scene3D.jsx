// import React, { useRef } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

// const AnimatedSphere = () => {
//     const meshRef = useRef()

//     useFrame((state) => {
//         if (meshRef.current) {
//             meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
//             meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
//         }
//     })

//     return (
//         <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
//             <MeshDistortMaterial
//                 color="#667eea"
//                 attach="material"
//                 distort={0.3}
//                 speed={1.5}
//                 roughness={0.2}
//                 metalness={0.8}
//             />
//         </Sphere>
//     )
// }

// const Scene3D = () => {
//     return (
//         <div style={{ width: '100%', height: '400px' }}>
//             <Canvas camera={{ position: [0, 0, 5] }}>
//                 <ambientLight intensity={0.5} />
//                 <pointLight position={[10, 10, 10]} />
//                 <AnimatedSphere />
//                 <OrbitControls enableZoom={false} enablePan={false} />
//             </Canvas>
//         </div>
//     )
// }

// export default Scene3D

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    OrbitControls,
    Sphere,
    MeshDistortMaterial,
    Float,
    Text,
    Ring,
    Torus,
    Box
} from '@react-three/drei'
import * as THREE from 'three'

const AnimatedSphere = ({ position = [0, 0, 0], color = "#667eea" }) => {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.5} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    )
}

const FloatingRings = () => {
    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            <Ring args={[3, 3.2, 32]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color="#764ba2" transparent opacity={0.3} />
            </Ring>
            <Ring args={[4, 4.2, 32]} rotation={[0, Math.PI / 2, 0]}>
                <meshBasicMaterial color="#f093fb" transparent opacity={0.2} />
            </Ring>
            <Ring args={[5, 5.2, 32]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <meshBasicMaterial color="#667eea" transparent opacity={0.1} />
            </Ring>
        </group>
    )
}

const FloatingCubes = () => {
    const cubes = useRef([])

    useFrame((state) => {
        cubes.current.forEach((cube, index) => {
            if (cube) {
                cube.rotation.x = state.clock.elapsedTime * (0.5 + index * 0.1)
                cube.rotation.y = state.clock.elapsedTime * (0.3 + index * 0.1)
                cube.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5
            }
        })
    })

    return (
        <>
            {[...Array(8)].map((_, index) => (
                <Box
                    key={index}
                    ref={(el) => (cubes.current[index] = el)}
                    args={[0.3, 0.3, 0.3]}
                    position={[
                        Math.cos((index / 8) * Math.PI * 2) * 6,
                        Math.sin(index) * 2,
                        Math.sin((index / 8) * Math.PI * 2) * 6
                    ]}
                >
                    <meshStandardMaterial
                        color={`hsl(${240 + index * 15}, 70%, 60%)`}
                        transparent
                        opacity={0.7}
                    />
                </Box>
            ))}
        </>
    )
}

const ParticleField = () => {
    const pointsRef = useRef()
    const [positions] = useState(() => {
        const positions = new Float32Array(1000 * 3)
        for (let i = 0; i < 1000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        return positions
    })

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#667eea"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

const CameraController = () => {
    const { camera } = useThree()

    useFrame((state) => {
        camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2
        camera.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 8 + 5
        camera.lookAt(0, 0, 0)
    })

    return null
}

const Scene3D = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#764ba2" />
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1}
                    color="#f093fb"
                />

                <ParticleField />
                <AnimatedSphere position={[0, 0, 0]} color="#667eea" />
                <AnimatedSphere position={[3, 1, -2]} color="#764ba2" />
                <AnimatedSphere position={[-3, -1, 2]} color="#f093fb" />
                <FloatingRings />
                <FloatingCubes />

                <CameraController />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    )
}

export default Scene3D