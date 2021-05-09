import * as T from "../lib/three@0.128.0.min.js"
import { Floor } from "./floor.js"
import { Figure } from "./figure.js"
import { material } from "./material.js"
import { equalish } from "./utils.js"

// -- props --
let mScene = null
let mFloor = null
let mFigure = null
let mLight = null
let mParams = null
let mColors = null
let mHelpers = []
let mDelegate = null
let mBounds = new T.Box3()

// -- lifetime --
export function init() {
  // init scene
  mScene = new T.Scene()
  mScene.background = new T.Color(0xaaffaa)

  // add light
  mLight = new T.DirectionalLight(0xffffff, 1.0)
  mLight.position.set(3.0, 2.0, 2.0)
  mLight.lookAt(0.0, 0.0, 0.0)
  mLight.castShadow = true

  const detail = 1 << 10
  mLight.shadow.mapSize.x = detail
  mLight.shadow.mapSize.y = detail

  mScene.add(mLight)

  // add a floor plane
  mFloor = new Floor()
  mScene.add(mFloor.ref)

  // add figure to scene
  mFigure = new Figure()
  mFigure.ref.rotation.y = 0.5
  mScene.add(mFigure.ref)

  // add helpers, invisible by default
  addHelpers()

  // export module
  return {
    get ref() { return mScene },
    sim,
    generate,
    rotate,
    setParams,
    setColors,
    setMore,
    setDebug,
    setShadows,
    getBounds,
    onGenerate,
  }
}

// -- commands --
function sim() {
}

function generate() {
  // mRock.generate()

  if (mDelegate != null) {
    mDelegate()
  }
}

function rotate(translation) {
  mFigure.ref.rotation.y += translation * 0.01
}

function setParams(params) {
  // ignore duplicate params
  if (mParams != null && equalish(mParams, params)) {
    return
  }

  // regenerate figure
  mParams = params
  // mRock.setParams(mParams)
  generate()
}

function setMore(more) {
  setGlowIntensity(more["glow-intensity"])
}

function setColors(colors) {
  mColors = colors

  const bg = mScene.background
  bg.setHex(colors.bg)

  const floor = mFloor.ref.material
  floor.color.setHex(colors.bg)
  floor.emissive.setHex(colors.bg)

  const light = mLight.color
  light.setHex(colors.light)

  const mat = material().ref
  mat.color.setHex(colors.figure)
  mat.emissive.setHex(colors.glow)
}

function setGlowIntensity(emission) {
  const mat = material().ref
  mat.emissiveIntensity = emission
}

// -- c/debug
export function setDebug(isDebug) {
  for (const helper of mHelpers) {
    helper.visible = isDebug
  }
}

function setShadows(isShadowed) {
  mFigure.ref.receiveShadow = isShadowed
}

function addHelpers() {
  addHelper(new T.DirectionalLightHelper(mLight))
}

function addHelper(helper) {
  helper.visible = false
  mHelpers.push(helper)
  mScene.add(helper)
}

// -- queries --
function getBounds() {
  mBounds.setFromObject(mRock.ref)
  return mBounds
}

// -- events --
function onGenerate(delegate) {
  mDelegate = delegate
}
