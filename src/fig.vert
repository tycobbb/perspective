// -- varying --
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vDir;
varying float vDepth;

// -- program --
void main() {
  vUv = uv;
  vNormal = normal;
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vDepth = -mvPos.z;
  gl_Position = projectionMatrix * mvPos;
}
