import * as T from "../lib/three@0.128.0.min.js"
import { material } from "./material.js"

// -- impls --
export class Figure {
  // -- props --
  // the backing mesh, access this through `ref`
  // mesh = null

  // -- lifetime --
  constructor() {
    // create geometry
    const geometry = new T.BoxGeometry()

    // build mesh
    const mesh = new T.Mesh(geometry, material().ref)

    // add mesh shadows
    mesh.castShadow = false
    mesh.receiveShadow = true

    // store mesh
    this.mesh = mesh
  }

  // -- queries --
  get ref() {
    return this.mesh
  }
}
