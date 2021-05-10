// -- varying --
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vDir;
varying float vDepth;

// -- program --
void main() {
  vUv = uv;

  // pass projected normal
  vec4 mvNormal = modelViewMatrix * vec4(normal, 0.0);
  vNormal = normalize((projectionMatrix * mvNormal).xyz);

  // pass projected pos
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPos;

  // add projected pos
  vPos = gl_Position.xyz;

  // add object space depth
  vDepth = (modelMatrix * vec4(position, 1.0)).z;
}
