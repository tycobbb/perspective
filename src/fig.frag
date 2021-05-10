// -- constants --
#define M_PI 3.1415926538

// -- varying --
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vDir;
varying float vDepth;

// -- program --
void set(float val) {
  gl_FragColor = vec4(val, val, val, 1.0);
}

void set(vec3 vec) {
  gl_FragColor = vec4(vec, 1.0);
}

// void main()	{
//   vec3 dView = vec3(0.0, 0.0, 1.0);
//   vec3 dTangent = dView - dot(vNormal, dView) * vNormal;
//   dTangent = (dTangent + 1.0) / 2.0;
//   // TODO: something like this
//   // set(mod(dot(dTangent, vPos), 1.0));
//   // set(dTangent);
// }

// failure mode
void main() {
  float band = vDepth;

  band = cos(16.0 * (band * M_PI));
  band = (band + 1.0) / 2.0;

  if (band >= 0.5) {
    set(1.0);
  } else {
    discard;
  }
}
