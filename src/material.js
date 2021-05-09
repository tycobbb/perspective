import * as T from "../lib/three@0.128.0.min.js"

// -- props --
let mMaterial = null
let mInstance = null

// -- lifetime --
export function material() {
  if (mInstance != null) {
    return mInstance
  }

  mInstance = {
    get ref() { return mMaterial },
    init,
  }

  return mInstance
}

// -- commands --
function init(assets) {
  mMaterial = new T.ShaderMaterial({
    vertexShader: assets.figure.vert,
    fragmentShader: assets.figure.frag,
  })
}
