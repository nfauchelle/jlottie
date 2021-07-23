/*!
 * @lottiefiles/jlottie v1.0.7
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const xmlns = 'http://www.w3.org/2000/svg';

exports.animation = [];
exports.frame = [];
exports.animationCount = -1;
const animationLength = 0;
let animationLoading = 0;
const frozen = false;
let playStarted = false;
var panda = console;
var smallestFrameTime = 0;

/// ////////// BEZIER
function arcLength(p1, p2) {
  return Math.sqrt(Math.pow(p2[0] - p1[0]) + Math.pow(p2[1] - p1[1]));
}

function bezierCurve(
  p1,
  c1,
  c2,
  p2,
  fromT,
  toT,
  isLayer,
  animationId,
  refKey,
  addTransformation,
  objectId,
  depth,
  customFlag,
) {
  const newNodes = [];

  if (c1.hasOwnProperty('x')) {
  } else if (c1.length >= 1) {
    c1.x = c1[0];
    if (refKey == 'p' || refKey == 's') {
      c1.y = c1[1];
    }
  }
  if (c2.hasOwnProperty('x')) {
  } else if (c2.length >= 1) {
    c2.x = c1[0];
    if (refKey == 'p' || refKey == 's') {
      c2.y = c1[1];
    }
  }
  if (refKey == 's') {
    if (c1.x.length > 1) {
      c1.x = c1.x[0];
      c1.y = c1.y[0];
    }
    if (c2.x.length > 1) {
      c2.x = c2.x[0];
      c2.y = c2.y[0];
    }
  }
  const frames = toT - fromT;
  let timeTick;
  let oneMinusT;
  let currentFrame = fromT;
  for (let i = 1; i < frames; i++) {
    timeTick = i / frames;
    oneMinusT = 1 - timeTick;
    newNodes.push({ _comp: 1, t: 0 });
    currentFrame++;
    newNodes[newNodes.length - 1]._frame = parseInt(currentFrame);
    newNodes[newNodes.length - 1].t = parseInt(currentFrame);
    newNodes[newNodes.length - 1].s = [];
    if (refKey != 'ks') {
      if (p1.length > 4) {
        for (var m = 0; m < (p1.length / 4); m++) {
          newNodes[newNodes.length - 1].s.push(
            Math.pow(oneMinusT, 3) * p1[m * 4] +
              3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[m * 4]) +
              3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[m * 4]) +
              Math.pow(timeTick, 3) * p2[m * 4],
          );
          for (var n = 1; n < 4; n++) {
            newNodes[newNodes.length - 1].s.push(
              Math.pow(oneMinusT, 3) * p1[(m * 4) + n] +
                3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[(m * 4) + n]) +
                3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[(m * 4) + n]) +
                Math.pow(timeTick, 3) * p2[(m * 4) + n],
            );
          }
        }
      } else {
        newNodes[newNodes.length - 1].s.push(
        Math.pow(oneMinusT, 3) * p1[0] +
          3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[0]) +
          3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[0]) +
          Math.pow(timeTick, 3) * p2[0],
        );
        if (refKey != 'x' && refKey != 'y') {
          if (refKey == 'p' || refKey == 's') {
            newNodes[newNodes.length - 1].s.push(
              Math.pow(oneMinusT, 3) * p1[1] +
                3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[1]) +
                3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[1]) +
                Math.pow(timeTick, 3) * p2[1],
            );
          }
        }
      }
    } else {
      newNodes[newNodes.length - 1].s.push({ i: [], o: [], v: [] });
      const j = 0;
      for (let k = 0; k < p1[j].i.length; k++) {
        newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].i.push([
          Math.pow(oneMinusT, 3) * p1[j].i[k][0] +
            3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].i[k][0]) +
            3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].i[k][0]) +
            Math.pow(timeTick, 3) * p2[j].i[k][0],
          Math.pow(oneMinusT, 3) * p1[j].i[k][1] +
            3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].i[k][1]) +
            3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].i[k][1]) +
            Math.pow(timeTick, 3) * p2[j].i[k][1],
        ]);

        newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].o.push([
          Math.pow(oneMinusT, 3) * p1[j].o[k][0] +
            3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].o[k][0]) +
            3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].o[k][0]) +
            Math.pow(timeTick, 3) * p2[j].o[k][0],
          Math.pow(oneMinusT, 3) * p1[j].o[k][1] +
            3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].o[k][1]) +
            3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].o[k][1]) +
            Math.pow(timeTick, 3) * p2[j].o[k][1],
        ]);

        newNodes[newNodes.length - 1].s[newNodes[newNodes.length - 1].s.length - 1].v.push([
          Math.pow(oneMinusT, 3) * p1[j].v[k][0] +
            3 * Math.pow(oneMinusT, 2) * timeTick * (c1.x + p1[j].v[k][0]) +
            3 * oneMinusT * Math.pow(timeTick, 2) * (c2.x + p2[j].v[k][0]) +
            Math.pow(timeTick, 3) * p2[j].v[k][0],
          Math.pow(oneMinusT, 3) * p1[j].v[k][1] +
            3 * Math.pow(oneMinusT, 2) * timeTick * (c1.y + p1[j].v[k][1]) +
            3 * oneMinusT * Math.pow(timeTick, 2) * (c2.y + p2[j].v[k][1]) +
            Math.pow(timeTick, 3) * p2[j].v[k][1],
        ]);
      }
    }
    if (addTransformation > -1 && refKey != 'ks' && customFlag != 'length') {
      if (newNodes[newNodes.length - 1].hasOwnProperty('s')) {
        addGroupPositionTransform(
          currentFrame,
          newNodes[newNodes.length - 1].s,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      }
    }
  }

  return newNodes;
}

/// ////////// ANIMATOR

function loadFrame(i, _currentFrame) {
  for (let ref = 0; ref < exports.animation[i]._refObj.length; ref++) {
    const refObj = exports.animation[i]._refObj[ref];
    let nextObj = false;
    for (let m = _currentFrame - 1; m >= 0; m--) {
      for (let n = 0; n < exports.animation[i]._scene[m]._transform.length; n++) {
        /*
        if (animation[i]._scene[m]._transform[n].refObj == refObj) {
          currentObj = document.getElementById(animation[i]._scene[m]._transform[n].refObj);
          currentObjOther = document.getElementById(animation[i]._scene[m]._transform[n].refObjOther);
          if (
            animation[i]._scene[m]._transform[n].isTween ||
            animation[i]._scene[m]._transform[n].combined.length > 0
          ) {
            if (animation[i]._scene[m]._transform[n].isTween) {
              currentObj.setAttribute('d', animation[i]._scene[m]._transform[n].dataString);
            }
            currentObj.setAttribute('transform', animation[i]._scene[m]._transform[n].combined);
            currentObjOther.setAttribute('opacity', animation[i]._scene[m]._transform[n].opacity);
            nextObj = true;
            break;
          }
        }
        */
        if (exports.animation[i]._scene[m]._transform[n].refObj == refObj) {
          if (exports.animation[i]._scene[m]._transform[n].fillSet) {
            if (exports.animation[i]._scene[m]._transform[n].isGradient) {
              const stops = document.getElementById(exports.animation[i]._scene[m]._transform[n].fillObj).querySelectorAll("stop");
              for (var o = 0; o < stops.length; o++) {
                stops[o].setAttribute("offset", exports.animation[i]._scene[m]._transform[n].offsets[m]);
                stops[o].setAttribute("style", exports.animation[i]._scene[m]._transform[n].styles[m]);
              }
            } else {

            }
          } else {
            if (exports.animation[i]._scene[m]._transform[n].refObjSet) {
              const currentObj = document.getElementById(exports.animation[i]._scene[m]._transform[n].refObj);
              const currentObjOther = document.getElementById(
                exports.animation[i]._scene[m]._transform[n].refObjOther,
              );
              if (exports.animation[i]._scene[m]._transform[n].isTween) {
                currentObj.setAttribute('d', exports.animation[i]._scene[m]._transform[n].dataString);
              }
              if (exports.animation[i]._scene[m]._transform[n].combined.length > 0) {
                currentObj.setAttribute(
                  'transform',
                  exports.animation[i]._scene[m]._transform[n].combined,
                );
              }
              if (exports.animation[i]._scene[m]._transform[n].fillSet) {
                currentObj.setAttribute(
                  'fill',
                  exports.animation[i]._scene[m]._transform[n].fill,
                );
              }
              if (exports.animation[i]._scene[m]._transform[n].strokeWidth > -1) {
                currentObj.setAttribute(
                  'stroke-width',
                  exports.animation[i]._scene[m]._transform[n].strokeWidth,
                );
              }
              currentObjOther.setAttribute(
                'opacity',
                exports.animation[i]._scene[m]._transform[n].opacity,
              );
              nextObj = true;
              break;
            }
            if (exports.animation[i]._scene[m]._transform[n].hide && exports.animation[i]._scene[m]._transform[n].stageEvent) {
              document.getElementById(
                exports.animation[i]._scene[m]._transform[n].stageObj,
              ).style.display = 'none';
            }
            if (exports.animation[i]._scene[m]._transform[n].show && exports.animation[i]._scene[m]._transform[n].stageEvent) {
              document.getElementById(
                exports.animation[i]._scene[m]._transform[n].stageObj,
              ).style.display = 'block';
            }            
          }
        }

        if (nextObj) break;
      }
      if (nextObj) break;
    }
    //if (nextObj) continue;
  }
}

function lottiemate() {
  const currentDate = Date.now();
  for (let i = 0; i <= exports.animationCount; i++) {
    if (exports.animation[i]._loaded && currentDate - exports.animation[i]._lastTime >= exports.animation[i]._frameTime) {
      if (exports.animation[i]._removed || exports.animation[i]._paused) {
        continue;
        //return;
      }
      if (exports.animation[i]._debugAnimation) {
        // DEBUG
        exports.animation[i]._timeElapsed = exports.animation[i]._timeElapsed + (currentDate - exports.animation[i]._lastTime);
      }
      exports.animation[i]._lastTime = currentDate;
      //animation[i]._lastFrame = animation[i]._currentFrame;
      exports.animation[i]._currentFrame++;
      if (exports.animation[i]._currentFrame >= exports.animation[i]._totalFrames) {
        if (!exports.animation[i]._loop) {
          exports.animation[i]._currentFrame--;
          exports.animation[i]._paused = true;
          goToAndStop(exports.animation[i]._currentFrame, '', exports.animation[i]._elementId);
          continue;
          //return;
        } else {
          exports.animation[i]._currentFrame = 0;
        }
      }

      //setTimeout(function () {
        for (let j = 0; j < exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform.length; j++) {
          if (exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].fillSet) {
            if (exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].isGradient) {
              const stops = document.getElementById(exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].fillObj).querySelectorAll("stop");
              for (var m = 0; m < stops.length; m++) {
                stops[m].setAttribute("offset", exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].offsets[m]);
                stops[m].setAttribute("style", exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].styles[m]);
              }
            } else {

            }
          } else {
            if (exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].refObjSet) {
              const currentObj = document.getElementById(exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].refObj);
              const currentObjOther = document.getElementById(
                exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].refObjOther,
              );
              if (exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].isTween) {
                currentObj.setAttribute('d', exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].dataString);
              }
              if (exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].combined.length > 0) {
                currentObj.setAttribute(
                  'transform',
                  exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].combined,
                );
              }
              if (exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].fillSet) {
                currentObj.setAttribute(
                  'fill',
                  exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].fill,
                );
              }
              if (exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].strokeWidth > -1) {
                currentObj.setAttribute(
                  'stroke-width',
                  exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].strokeWidth,
                );
              }
              currentObjOther.setAttribute(
                'opacity',
                exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].opacity,
              );
            }
            if (exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].hide && exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].stageEvent) {
              document.getElementById(
                exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].stageObj,
              ).style.display = 'none';
            }
            if (exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].show && exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].stageEvent) {
              document.getElementById(
                exports.animation[i]._scene[exports.animation[i]._currentFrame]._transform[j].stageObj,
              ).style.display = 'block';
            }
          }
        }
      //}, 0);
    }
    
    var postRender = Date.now();
    if (exports.animation[i]._debugAnimation) {
      // DEBUG
      var debugDate = Date.now();
      exports.animation[i]._timeElapsed = exports.animation[i]._timeElapsed + (debugDate - currentDate);
      //animation[i]._debugObj.innerHTML = `required fps: ${animation[i].fr}, current fps: ${animation[i]._timeElapsed}`;
      if (exports.animation[i]._timeElapsed >= 2000) {
        exports.animation[i]._curFPS = (exports.animation[i]._timeElapsed / 2) * exports.animation[i].fr;
        exports.animation[i]._debugObj.innerHTML = `required fps: ${exports.animation[i].fr}, current fps: ${
          exports.animation[i]._curFPS / 1000
        }`;
        exports.animation[i]._timeElapsed = 0;
      }
    }
      
  }
  setTimeout(lottiemate, smallestFrameTime - (postRender - currentDate));
}

/// ////////// BUILD SCENE GRAPH
let lastRefObj;

function getEmptyTransform() {
  const transforms = {};
  transforms.translateX = 0;
  transforms.translateY = 0;
  transforms.scaleFactorX = 0;
  transforms.scaleFactorY = 0;
  transforms.rotateAngle = 0;
  transforms.opacityFactor = 0;
  transforms.anchorX = 0;
  transforms.anchorY = 0;
  transforms.paddingX = 0;
  transforms.paddingY = 0;
  transforms.paddingAnchorX = 0;
  transforms.paddingAnchorY = 0;
  transforms.isTranslate = false;

  transforms.fillSet = false;

  transforms.dataString = '';
  transforms.isTween = false;
  transforms.tweenShape = '';
  transforms.refObj = '';
  transforms.combined = '';
  transforms.refObjOther = '';
  transforms.refObjSet = false;

  transforms.hide = false;
  transforms.show = false;
  transforms.stageEvent = false;

  transforms.translate = '';
  transforms.rotate = '';
  transforms.scale = '';
  transforms.opacity = 1;
  transforms.inPoint = -1;
  transforms.outPoint = -1;
  transforms.isLayer = true;
  transforms.stageObj = '';
  transforms.isSet = false;

  // related to strokes
  transforms.strokeWidth = -1;

  return transforms;
}

function getEmptyFillTransform() {
  const transforms = {};
  transforms.fillSet = true;
  transforms.isGradient = false;
  transforms.fill = '';
  transforms.gradientFill = [];
  transforms.fillObj = '';
  return transforms;
}

function getEmptyStageTransform() {
  const transforms = {};
  transforms.fillSet = false;
  transforms.stageObj = '';
  transforms.refObj = '';
  transforms.hide = false;
  transforms.show = false;
  return transforms;
}

function findExistingTransform(transforms, animationId, frame, forFill) {
  let found = 0;
  if (exports.animation[animationId]._scene[parseInt(frame)] === undefined) {
    return transforms;
  }
  for (let i = 0; i < exports.animation[animationId]._scene[parseInt(frame)]._transform.length; i++) {
    if (forFill) {
      if (exports.animation[animationId]._scene[parseInt(frame)]._transform[i].fillObj == transforms.fillObj) {
        found = 1;
        break;
      }
    } else {
      if (exports.animation[animationId]._scene[parseInt(frame)]._transform[i].refObj == transforms.refObj) {
        transforms = exports.animation[animationId]._scene[parseInt(frame)]._transform[i];
        found = 1;
        break;
      }
    }
  }
  return transforms;
}

function stageSequence(animationId, stageObj, inPoint, outPoint) {
  if (outPoint > exports.animation[animationId]._totalFrames) {
    outPoint = exports.animation[animationId]._totalFrames;
  }
  if (inPoint < 0) {
    inPoint = 0;
  }
  if (inPoint > exports.animation[animationId]._totalFrames) {
    inPoint = exports.animation[animationId]._totalFrames;
  }
  let transforms = getEmptyStageTransform();
  let found = 0;
  if (inPoint > -1) {
    exports.frame = inPoint;
    for (var i = 0; i < exports.animation[animationId]._scene[parseInt(exports.frame)]._transform.length; i++) {
      if (exports.animation[animationId]._scene[parseInt(exports.frame)]._transform[i].stageObj == stageObj) {
        transforms = exports.animation[animationId]._scene[parseInt(exports.frame)]._transform[i];
        found = 1;
        break;
      }
    }
    transforms.stageObj = stageObj;
    transforms.show = true;
    transforms.stageEvent = true;
    exports.animation[animationId]._scene[parseInt(exports.frame)]._transform.push(transforms);
  }

  transforms = getEmptyStageTransform();
  found = 0;
  if (outPoint > -1) {
    exports.frame = outPoint;
    for (var i = 0; i < exports.animation[animationId]._scene[parseInt(exports.frame)]._transform.length; i++) {
      if (exports.animation[animationId]._scene[parseInt(exports.frame)]._transform[i].stageObj == stageObj) {
        transforms = exports.animation[animationId]._scene[parseInt(exports.frame)]._transform[i];
        found = 1;
        break;
      }
    }
    transforms.stageObj = stageObj;
    transforms.hide = true;
    transforms.stageEvent = true;
    exports.animation[animationId]._scene[parseInt(exports.frame)]._transform.push(transforms);
  } else {
    exports.frame = 0;
  }

  transforms = getEmptyStageTransform();
  found = 0;
  if (outPoint > -1 && inPoint > 0) {
    exports.frame = 0;
    for (var i = 0; i < exports.animation[animationId]._scene[parseInt(exports.frame)]._transform.length; i++) {
      if (exports.animation[animationId]._scene[parseInt(exports.frame)]._transform[i].stageObj == stageObj) {
        transforms = exports.animation[animationId]._scene[parseInt(exports.frame)]._transform[i];
        found = 1;
        break;
      }
    }
    transforms.stageObj = stageObj;
    transforms.hide = true;
    transforms.stageEvent = true;
    exports.animation[animationId]._scene[parseInt(exports.frame)]._transform.push(transforms);
  }

  let lastState = 0;
  if (exports.frame > 0) {
    for (let j = 0; j <= exports.animation[animationId]._totalFrames; j++) {
      for (var i = 0; i < exports.animation[animationId]._scene[j]._transform.length; i++) {
        if (exports.animation[animationId]._scene[j]._transform[i].stageObj == stageObj) {
          if (exports.animation[animationId]._scene[j]._transform[i].show) {
            lastState = 1;
          }
          if (exports.animation[animationId]._scene[j]._transform[i].hide) {
            lastState = 0;
          }
          if (lastState == 1) {
            exports.animation[animationId]._scene[j]._transform[i].show = true;
          } else {
            exports.animation[animationId]._scene[j]._transform[i].hide = true;
          }
        }
      }
    }
  }
}

function addGroupPositionTransform(
  frame,
  position,
  isLayer,
  animationId,
  refKey,
  addTransformation,
  objectId,
  depth,
) {
  if (frame < 0 || addTransformation < 1) {
    return;
  }
  if (frame > exports.animation[animationId]._totalFrames) {
    return;
  }
  let transforms = getEmptyTransform();

  let posX = 0;

  if (isLayer) {
    if (objectId.hasOwnProperty('_currentLayerGroup')) {
      //if (objectId._currentLayerGroup._layer > 0) {
      //console.log('inpoint');
      if (objectId._currentLayerGroup._inPoint >= 0) {
        //console.log('inpoint');
        transforms.inPoint = parseInt(objectId._currentLayerGroup._inPoint);
      }
      if (objectId._currentLayerGroup._outPoint > 0) {
        transforms.outPoint = parseInt(objectId._currentLayerGroup._outPoint);
      }
    } else {
      if (objectId.hasOwnProperty('_currentLayer')) {
        if (objectId._currentLayer._inPoint >= 0) {
          //console.log('inpoint');
          transforms.inPoint = parseInt(objectId._currentLayer._inPoint);
        }
        if (objectId._currentLayer._outPoint > 0) {
          transforms.outPoint = parseInt(objectId._currentLayer._outPoint);
        }
      }
    }
  } else {
  }

  if (transforms.inPoint < 0 && transforms.outPoint < 0) {
    if (frame != transforms.inPoint && frame != transforms.outPoint) {
      if (Array.isArray(position)) {
        posX = position[0];
        if (Number.isNaN(posX)) {
          return;
        }
      } else {
        posX = position;
        if (Number.isNaN(posX)) {
          posX = position[0];
          if (Number.isNaN(posX)) {
            return;
          }
        }
      }
    }
  }

  if (isLayer) {
    transforms.isLayer = true;
    if (objectId.td > 0) {
      transforms.refObj = `${animationId}_${depth}_layerGroup${objectId._layer}`;
    } else {
      transforms.refObj = `${animationId}_${depth}_layerTranslate${objectId._layer}`;
    }
    transforms.refObjOther = `${animationId}_${depth}_layerGroup${objectId._layer}`;
  } else {
    transforms.isLayer = false;
    transforms.refObj = `${animationId}_group${exports.animation[animationId]._currentShapeGroup}`;
    transforms.refObjOther = `${animationId}_group${exports.animation[animationId]._currentShapeGroup}`;
  }

  transforms.anchorX = objectId._anchorX;
  transforms.anchorY = objectId._anchorY;

  transforms = findExistingTransform(transforms, animationId, frame);

  if (exports.animation[animationId]._instated.hasOwnProperty(transforms.refObj)) {
  } else {
    exports.animation[animationId]._refObj.push(transforms.refObj);
    exports.animation[animationId]._objSize[transforms.refObj] = [];
    exports.animation[animationId]._objSize[transforms.refObj][0] = document
      .getElementById(transforms.refObj)
      .getBoundingClientRect().width;
    exports.animation[animationId]._objSize[transforms.refObj][1] = document
      .getElementById(transforms.refObj)
      .getBoundingClientRect().height;
  }
  if (objectId._layer == 3) {
  }
  transforms.refObjSet = true;

  let posY = 0;

  if (refKey == 'r') {
    transforms.rotateAngle += posX;
    if (objectId.hasOwnProperty('_anchorX') && objectId.hasOwnProperty('_anchorY')) {
      transforms.rotate = `rotate(${transforms.rotateAngle},${objectId._anchorX},${objectId._anchorY}) `;
    } else {
      transforms.rotate = `rotate(${transforms.rotateAngle},${
        document.getElementById(transforms.refObj).getBoundingClientRect().width / 2
      },${document.getElementById(transforms.refObj).getBoundingClientRect().height / 2}) `;
    }
  }
  var tempBoundingW;
  var tempBoundingH;
  if (refKey == 's') {
    transforms.scaleFactorX += posX;
    tempBoundingW = exports.animation[animationId]._objSize[transforms.refObj][0];
    tempBoundingH = exports.animation[animationId]._objSize[transforms.refObj][1];
    let currentScaleX;
    let currentScaleY;
    if (position.length > 1) {
      transforms.scaleFactorY += position[1];
      currentScaleX = 1 - transforms.scaleFactorX / 100;
      currentScaleY = 1 - transforms.scaleFactorY / 100;
    } else {
      currentScaleX = 1 - transforms.scaleFactorX / 100;
      currentScaleY = 1 - transforms.scaleFactorX / 100;
    }
    transforms.scale = `scale(${transforms.scaleFactorX / 100},${transforms.scaleFactorY / 100}) `;
    transforms.paddingX = (transforms.anchorX - tempBoundingW) * currentScaleX + tempBoundingW * currentScaleX;
    transforms.paddingY = (transforms.anchorY - tempBoundingH) * currentScaleY + tempBoundingH * currentScaleY;
    transforms.paddingAnchorX = transforms.anchorX * currentScaleX;
    transforms.paddingAnchorY = transforms.anchorY * currentScaleY;
  }
  if (refKey == 'p') {
    posY = position[1];
    if (objectId.hasOwnProperty('_anchorX')) {
      transforms.translateX += posX;
    }
    if (objectId.hasOwnProperty('_anchorY')) {
      transforms.translateY += posY;
    }
    transforms.translate = `translate(${transforms.translateX - transforms.anchorX},${
      transforms.translateY - transforms.anchorY
    }) `;
    transforms.isTranslate = true;
  }

  if (!transforms.isTranslate) {
    transforms.translate = `translate(${transforms.paddingX},${transforms.paddingY}) `;
  }

  if (refKey == 'o') {
    transforms.opacityFactor += posX;
    transforms.opacity = transforms.opacityFactor / 100;
  }

  transforms.combined = transforms.translate + transforms.scale + transforms.rotate;
  transforms.isSet = true;
  exports.animation[animationId]._scene[parseInt(frame)]._transform.push(transforms);

  // Add this transformation head to the root frame if no previous transformations for this refObj exists
  if (frame > 1) {
    let foundPrevious = false;
    for (let i = parseInt(frame) - 1; i > 0; i--) {
      if (exports.animation[animationId]._scene[i]._transform.refObj == transforms.refObj) {
        if (exports.animation[animationId]._scene[i]._transform.isTranslate) {
          foundPrevious = true;
          break;
        }
      }
    }
    if (! foundPrevious) {
      /*for (let i = parseInt(frame) - 1; i > 0; i--) {
        animation[animationId]._scene[i]._transform.push(transforms);
      }*/
    }
  }

  lastRefObj = transforms.refObj;

  if (exports.animation[animationId]._instated.hasOwnProperty(transforms.refObj)) {
  } else {
    exports.animation[animationId]._instated[transforms.refObj] = 1;
    exports.animation[animationId]._scene[0]._transform.push(transforms);
  }
}

/// ////////// PREP JSON

function extrapolateValueKeyframe(valueKeyframeObj) {
  return valueKeyframeObj;
}

function extrapolateOffsetKeyframe(
  offsetKeyframeObj,
  refKey,
  isLayer,
  animationId,
  addTransformation,
  objectId,
  depth,
) {
  let i = 0;
  let objLength = offsetKeyframeObj[refKey].k.length;
  let oldLength = objLength;
  const emptyPos = { x: 0, y: 0 };
  let p2;
  let gotI;
  let gotO;


  while (i < objLength - 1) {
    gotI = true;
    gotO = true;

    if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('_comp')) {
    } else {
      if (addTransformation > -1) {
        if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('s')) {
          addGroupPositionTransform(
            offsetKeyframeObj[refKey].k[i].t,
            offsetKeyframeObj[refKey].k[i].s,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
            depth,
          );
        } else {
          if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('e')) {
            addGroupPositionTransform(
              offsetKeyframeObj[refKey].k[i].t,
              offsetKeyframeObj[refKey].k[i].e,
              isLayer,
              animationId,
              refKey,
              addTransformation,
              objectId,
              depth,
            );
          }  
        }
      }
      /*if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('e')) {
        p2 = offsetKeyframeObj[refKey].k[i].e;
      } else if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('s')) {
        p2 = offsetKeyframeObj[refKey].k[i + 1].s;
      }*/
      p2 = offsetKeyframeObj[refKey].k[i + 1].s;

      if (offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') && refKey != 'ks' && addTransformation > -1) {
        if (offsetKeyframeObj[refKey].k[i + 1].i.x < 1) offsetKeyframeObj[refKey].k[i + 1].i.x = 0.0;
        if (offsetKeyframeObj[refKey].k[i + 1].i.y < 1) offsetKeyframeObj[refKey].k[i + 1].i.y = 0.0;
      }
      if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && refKey != 'ks' && addTransformation > -1) {
        if (offsetKeyframeObj[refKey].k[i].o.x < 1) offsetKeyframeObj[refKey].k[i].o.x = 0.0;
        if (offsetKeyframeObj[refKey].k[i].o.y < 1) offsetKeyframeObj[refKey].k[i].o.y = 0.0;
      }

      var returnedKeyframeObj;
      if (
        offsetKeyframeObj[refKey].k[i].hasOwnProperty('e') &&
        offsetKeyframeObj[refKey].k[i].hasOwnProperty('s')
      ) {
        //panda.log("found");
        returnedKeyframeObj = bezierCurve(
          offsetKeyframeObj[refKey].k[i].s,
          offsetKeyframeObj[refKey].k[i].o,
          offsetKeyframeObj[refKey].k[i].i,
          offsetKeyframeObj[refKey].k[i].e,
          offsetKeyframeObj[refKey].k[i].t,
          offsetKeyframeObj[refKey].k[i + 1].t,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      } else if (
        offsetKeyframeObj[refKey].k[i + 1].hasOwnProperty('i') &&
        offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') &&
        gotI
      ) {
        returnedKeyframeObj = bezierCurve(
          offsetKeyframeObj[refKey].k[i].s,
          offsetKeyframeObj[refKey].k[i].o,
          offsetKeyframeObj[refKey].k[i + 1].i,
          p2,
          offsetKeyframeObj[refKey].k[i].t,
          offsetKeyframeObj[refKey].k[i + 1].t,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      } else if (offsetKeyframeObj[refKey].k[i].hasOwnProperty('o') && gotO) {
        returnedKeyframeObj = bezierCurve(
          offsetKeyframeObj[refKey].k[i].s,
          offsetKeyframeObj[refKey].k[i].o,
          emptyPos,
          p2,
          offsetKeyframeObj[refKey].k[i].t,
          offsetKeyframeObj[refKey].k[i + 1].t,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      } else {
        returnedKeyframeObj = bezierCurve(
          offsetKeyframeObj[refKey].k[i].s,
          emptyPos,
          emptyPos,
          p2,
          offsetKeyframeObj[refKey].k[i].t,
          offsetKeyframeObj[refKey].k[i + 1].t,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      }
      for (let s = returnedKeyframeObj.length - 1; s >= 0; s--) {
        offsetKeyframeObj[refKey].k.splice(i + 1, 0, returnedKeyframeObj[s]);
      }

      objLength = offsetKeyframeObj[refKey].k.length;
      i += objLength - oldLength;
      oldLength = objLength;
    }
    i += 1;
  }

  return offsetKeyframeObj;
}

function extrapolatePathPosition(
  currentObj,
  parentObj,
  refKey,
  isLayer,
  animationId,
  addTransformation,
  objectId,
  depth,
) {
  currentObj[refKey].k = [];
  if (currentObj[refKey].x.k.length > 1) {
    currentObj[refKey] = extrapolateOffsetKeyframe(
      currentObj[refKey],
      'x',
      isLayer,
      animationId,
      false,
      objectId,
      depth,
    );
  } else {
  }
  if (currentObj[refKey].y.k.length > 1) {
    currentObj[refKey] = extrapolateOffsetKeyframe(
      currentObj[refKey],
      'y',
      isLayer,
      animationId,
      false,
      objectId,
      depth,
    );
  } else {
  }

  if (!Array.isArray(currentObj[refKey].x.k)) {
    for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
      if (currentObj[refKey].y.k[i].hasOwnProperty('s')) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [currentObj[refKey].x.k, currentObj[refKey].y.k[i].s[0], 0],
          t: currentObj[refKey].y.k[i].t,
        });
      }
    }

    /*for (var i = 0; i < currentObj[refKey].k.length; i++) {
      if (currentObj[refKey].k[i].hasOwnProperty('s')) {
        addGroupPositionTransform(
          currentObj[refKey].k[i].t,
          currentObj[refKey].k[i].s,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      } else {
        if (currentObj[refKey].k[i].hasOwnProperty('e')) {
          addGroupPositionTransform(
            currentObj[refKey].k[i].t,
            currentObj[refKey].k[i].e,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
            depth,
          );
        }
      }
    }

    return currentObj;*/
  }

  if (!currentObj[refKey].y.k.isArray) {
    for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
      if (currentObj[refKey].x.k[i].hasOwnProperty('s')) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [currentObj[refKey].x.k[i].s[0], currentObj[refKey].y.k, 0],
          t: currentObj[refKey].x.k[i].t,
        });
      }
    }

    /*for (var i = 0; i < currentObj[refKey].k.length; i++) {
      if (currentObj[refKey].k[i].hasOwnProperty('s')) {
        addGroupPositionTransform(
          currentObj[refKey].k[i].t,
          currentObj[refKey].k[i].s,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      } else {
        if (currentObj[refKey].k[i].hasOwnProperty('e')) {
          addGroupPositionTransform(
            currentObj[refKey].k[i].t,
            currentObj[refKey].k[i].e,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
            depth,
          );
        }
      }
    }

    return currentObj;*/
  }

  if (currentObj[refKey].x.k.length > currentObj[refKey].y.k.length) {
    for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
      currentObj[refKey].k.push({
        i: [0, 0, 0],
        o: [0, 0, 0],
        s: [currentObj[refKey].x.k[i].s[0], 0, 0],
        t: currentObj[refKey].x.k[i].t,
      });
    }
    for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
      if (currentObj[refKey].k[0].t > currentObj[refKey].y.k[i].t) {
        currentObj[refKey].k.splice(i, 0, {
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [0, currentObj[refKey].y.k[i].s[0], 0],
          t: currentObj[refKey].y.k[i].t,
        });
      } else if (currentObj[refKey].k[0].t < currentObj[refKey].y.k[i].t) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [0, currentObj[refKey].y.k[i].s[0], 0],
          t: currentObj[refKey].y.k[i].t,
        });
      } else if (currentObj[refKey].k[0].t == currentObj[refKey].y.k[i].t) {
        currentObj[refKey].k.s[1] = currentObj[refKey].y.k[i].s[0];
      }
    }

    /*for (var i = 0; i < currentObj[refKey].k.length; i++) {
      if (currentObj[refKey].k[i].hasOwnProperty('s')) {
        addGroupPositionTransform(
          currentObj[refKey].k[i].t,
          currentObj[refKey].k[i].s,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
        );
      } else {
        if (currentObj[refKey].k[i].hasOwnProperty('e')) {
          addGroupPositionTransform(
            currentObj[refKey].k[i].t,
            currentObj[refKey].k[i].e,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
            depth,
          );
        }
      }
    }

    return currentObj;*/
  }

  if (currentObj[refKey].x.k.length < currentObj[refKey].y.k.length) {
    for (var i = 0; i < currentObj[refKey].y.k.length; i++) {
      currentObj[refKey].k.push({
        i: [0, 0, 0],
        o: [0, 0, 0],
        s: [0, currentObj[refKey].y.k[i].s[0], 0],
        t: currentObj[refKey].y.k[i].t,
      });
    }
    for (var i = 0; i < currentObj[refKey].x.k.length; i++) {
      if (currentObj[refKey].k[0].t > currentObj[refKey].x.k[i].t) {
        currentObj[refKey].k.splice(i, 0, {
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [currentObj[refKey].x.k[i].s[0], 0, 0],
          t: currentObj[refKey].x.k[i].t,
        });
      } else if (currentObj[refKey].k[0].t < currentObj[refKey].x.k[i].t) {
        currentObj[refKey].k.push({
          i: [0, 0, 0],
          o: [0, 0, 0],
          s: [currentObj[refKey].x.k[i].s[0], 0, 0],
          t: currentObj[refKey].x.k[i].t,
        });
      } else if (currentObj[refKey].k[0].t == currentObj[refKey].x.k[i].t) {
        currentObj[refKey].k.s[0] = currentObj[refKey].x.k[i].s[0];
      }
    }

    /*for (var i = 0; i < currentObj[refKey].k.length; i++) {
      if (currentObj[refKey].k[i].hasOwnProperty('s')) {
        addGroupPositionTransform(
          currentObj[refKey].k[i].t,
          currentObj[refKey].k[i].s,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      } else {
        if (currentObj[refKey].k[i].hasOwnProperty('e')) {
          addGroupPositionTransform(
            currentObj[refKey].k[i].t,
            currentObj[refKey].k[i].e,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
            depth,
          );
        }
      }
    }

    return currentObj;*/
  }

  for (var i = 0; i < currentObj[refKey].k.length; i++) {
    if (currentObj[refKey].k[i].hasOwnProperty('s')) {
      addGroupPositionTransform(
        currentObj[refKey].k[i].t,
        currentObj[refKey].k[i].s,
        isLayer,
        animationId,
        refKey,
        addTransformation,
        objectId,
        depth,
      );
    } else {
      if (currentObj[refKey].k[i].hasOwnProperty('e')) {
        addGroupPositionTransform(
          currentObj[refKey].k[i].t,
          currentObj[refKey].k[i].e,
          isLayer,
          animationId,
          refKey,
          addTransformation,
          objectId,
          depth,
        );
      } else {
        if (currentObj[refKey].k[i - 1].hasOwnProperty('e')) {
          addGroupPositionTransform(
            currentObj[refKey].k[i].t,
            currentObj[refKey].k[i - 1].e,
            isLayer,
            animationId,
            refKey,
            addTransformation,
            objectId,
            depth,
          );
        }
      }
    }
  }

  return currentObj;
}

function getPosition(currentObj, parentObj, refKey, isLayer, animationId, addTransformation, objectId, depth) {
  if (currentObj.hasOwnProperty(refKey)) {
    if (currentObj[refKey].hasOwnProperty('x') && currentObj[refKey].hasOwnProperty('y')) {
      currentObj = extrapolatePathPosition(
        currentObj,
        parentObj,
        refKey,
        isLayer,
        animationId,
        addTransformation,
        objectId,
        depth,
      );
    }
    if (currentObj[refKey].hasOwnProperty('k')) {
      if (currentObj[refKey].k.length > 1) {
        if (currentObj[refKey].k[0].hasOwnProperty('s')) {
          currentObj = extrapolateOffsetKeyframe(
            currentObj,
            refKey,
            isLayer,
            animationId,
            addTransformation,
            objectId,
            depth,
          );
        }
      }
    }
  }
  return currentObj;
}

function prepShapeEl(shapeObj, referrer, animationId, addTransformation, depth) {
  const newShape = document.createElementNS(xmlns, 'ellipse');
  newShape.setAttribute('cx', shapeObj.p.k[0]);
  newShape.setAttribute('cy', shapeObj.p.k[1]);
  newShape.setAttribute('rx', shapeObj.s.k[0]);
  newShape.setAttribute('ry', shapeObj.s.k[1]);
  newShape.setAttribute('fill', 'transparent');
  newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
  newShape.classList.add('ellipse');
  referrer.prepend(newShape);
  shapeObj._isShape = true;
  return shapeObj;
}

function prepShapeElKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {
  return shapeObj;
}

function prepShapeSr(shapeObj, referrer, animationId, addTransformation, depth) {
  const newShape = document.createElementNS(xmlns, 'path');
  newShape.setAttribute('d', dataString);
  newShape.setAttribute('fill', 'transparent');
  newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
  newShape.classList.add('star');
  referrer.prepend(newShape);
  shapeObj._isShape = true;
  return shapeObj;
}

function prepShapeSrKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {
  return shapeObj;
}

function prepShapeRc(shapeObj, referrer, animationId, addTransformation, depth) {
  const newShape = document.createElementNS(xmlns, 'rect');
  newShape.setAttribute('fill', 'transparent');

  newShape.setAttribute('width', shapeObj.s.k[0]);
  newShape.setAttribute('height', shapeObj.s.k[1]);
  if (shapeObj.p.k.length > 0) {
    newShape.setAttribute('x', shapeObj.p.k[0] + shapeObj.s.k[0] / 2);
    newShape.setAttribute('y', shapeObj.p.k[1] + shapeObj.s.k[1] / 2);
  }
  newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
  newShape.classList.add('rectangle');
  referrer.prepend(newShape);
  shapeObj._isShape = true;
  return shapeObj;
}

function prepShapeRcKeyframe(shapeObj, referrer, animationId, addTransformation, depth) {
  return shapeObj;
}

function prepDataString(sourceObject, closed) {
  var dataString = `M${sourceObject.v[0][0]},${sourceObject.v[0][1]}`;
  for (var i = 1; i < sourceObject.v.length; i++) {
    dataString = `${dataString} C${
      sourceObject.v[i - 1][0] + sourceObject.o[i - 1][0]
    },${sourceObject.v[i - 1][1] + sourceObject.o[i - 1][1]} ${
      sourceObject.v[i][0] + sourceObject.i[i][0]
    },${sourceObject.v[i][1] + sourceObject.i[i][1]} ${
      sourceObject.v[i][0]
    },${sourceObject.v[i][1]}`;
  }
  if (closed) {
    dataString = `${dataString} C${
      sourceObject.v[sourceObject.v.length - 1][0] +
      sourceObject.o[sourceObject.v.length - 1][0]
    },${
      sourceObject.v[sourceObject.v.length - 1][1] +
      sourceObject.o[sourceObject.v.length - 1][1]
    } ${sourceObject.v[0][0] + sourceObject.i[0][0]},${
      sourceObject.v[0][1] + sourceObject.i[0][1]
    } ${sourceObject.v[0][0]},${sourceObject.v[0][1]}`;
    dataString += ' Z';
  }

  return dataString;
}

function setDataString(animationId, sourceObj, shapeId, pathClosed, frame) {
  let transforms = getEmptyTransform();
  transforms.isLayer = false;
  transforms.isTween = true;
  transforms.refObj = `${animationId}_shape${shapeId}`;
  transforms.refObjOther = `${animationId}_shape${shapeId}`;
  transforms.refObjSet = true;
  transforms = findExistingTransform(transforms, animationId, frame);
  transforms.dataString = prepDataString(sourceObj, pathClosed);

  return transforms;
}

function prepShapeSh(shapeObj, referrer, animationId, addTransformation, depth) {
  if (shapeObj.ks.k.hasOwnProperty('v')) {
  } else {
    if (shapeObj.ks.k[0].hasOwnProperty('s')) {
      shapeObj = extrapolateOffsetKeyframe(shapeObj, 'ks', false, animationId, -1, shapeObj, depth);
      var dataString = '';
      let totalK;
      if (shapeObj.ks.k[shapeObj.ks.k.length - 1].hasOwnProperty('s')) {
        totalK = shapeObj.ks.k.length;
      } else {
        totalK = shapeObj.ks.k.length - 1;
      }
      for (let kCount = 0; kCount < totalK; kCount++) {
        /*
        let transforms = getEmptyTransform();
        transforms.isLayer = false;
        transforms.isTween = true;
        transforms.refObj = `${animationId}_shape${shapeObj._shape}`;
        transforms.refObjOther = `${animationId}_shape${shapeObj._shape}`;
        transforms.refObjSet = true;
        transforms = findExistingTransform(transforms, animationId, shapeObj.ks.k[kCount].t);
        var dataString = `M${shapeObj.ks.k[kCount].s[0].v[0][0]},${shapeObj.ks.k[kCount].s[0].v[0][1]}`;
        for (var i = 1; i < shapeObj.ks.k[kCount].s[0].v.length; i++) {
          dataString = `${dataString} C${
            shapeObj.ks.k[kCount].s[0].v[i - 1][0] + shapeObj.ks.k[kCount].s[0].o[i - 1][0]
          },${shapeObj.ks.k[kCount].s[0].v[i - 1][1] + shapeObj.ks.k[kCount].s[0].o[i - 1][1]} ${
            shapeObj.ks.k[kCount].s[0].v[i][0] + shapeObj.ks.k[kCount].s[0].i[i][0]
          },${shapeObj.ks.k[kCount].s[0].v[i][1] + shapeObj.ks.k[kCount].s[0].i[i][1]} ${
            shapeObj.ks.k[kCount].s[0].v[i][0]
          },${shapeObj.ks.k[kCount].s[0].v[i][1]}`;
        }
        if (shapeObj.ks.k[0].s[0].c) {
          dataString = `${dataString} C${
            shapeObj.ks.k[kCount].s[0].v[shapeObj.ks.k[kCount].s[0].v.length - 1][0] +
            shapeObj.ks.k[kCount].s[0].o[shapeObj.ks.k[kCount].s[0].v.length - 1][0]
          },${
            shapeObj.ks.k[kCount].s[0].v[shapeObj.ks.k[kCount].s[0].v.length - 1][1] +
            shapeObj.ks.k[kCount].s[0].o[shapeObj.ks.k[kCount].s[0].v.length - 1][1]
          } ${shapeObj.ks.k[kCount].s[0].v[0][0] + shapeObj.ks.k[kCount].s[0].i[0][0]},${
            shapeObj.ks.k[kCount].s[0].v[0][1] + shapeObj.ks.k[kCount].s[0].i[0][1]
          } ${shapeObj.ks.k[kCount].s[0].v[0][0]},${shapeObj.ks.k[kCount].s[0].v[0][1]}`;
          dataString += ' Z';
        }
        */

        let transforms = setDataString(animationId, shapeObj.ks.k[kCount].s[0], shapeObj._shape, shapeObj.ks.k[0].s[0].c, shapeObj.ks.k[kCount].t);
        if (kCount == 0) {
          var newShape = document.createElementNS(xmlns, 'path');
          newShape.setAttribute('fill', 'transparent');
          newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
          newShape.setAttribute('d', dataString);
          newShape.classList.add('shape');
          referrer.prepend(newShape);
          shapeObj._isShape = true;
        }

        if (shapeObj.ks.k[kCount].t > exports.animation[animationId]._totalFrames || shapeObj.ks.k[kCount].t < 0) {
          break;
        }
        exports.animation[animationId]._scene[parseInt(shapeObj.ks.k[kCount].t)]._transform.push(transforms);
        //if (kCount == 0) {
        //  animation[animationId]._scene[1]._transform.push(transforms);
        //}
      }
    }
    return shapeObj;
  }

  var dataString = `M${shapeObj.ks.k.v[0][0]},${shapeObj.ks.k.v[0][1]}`;
  for (var i = 1; i < shapeObj.ks.k.v.length; i++) {
    dataString = `${dataString} C${shapeObj.ks.k.v[i - 1][0] + shapeObj.ks.k.o[i - 1][0]},${
      shapeObj.ks.k.v[i - 1][1] + shapeObj.ks.k.o[i - 1][1]
    } ${shapeObj.ks.k.v[i][0] + shapeObj.ks.k.i[i][0]},${shapeObj.ks.k.v[i][1] + shapeObj.ks.k.i[i][1]} ${
      shapeObj.ks.k.v[i][0]
    },${shapeObj.ks.k.v[i][1]}`;
  }
  if (shapeObj.ks.k.c) {
    dataString = `${dataString} C${
      shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][0] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][0]
    },${shapeObj.ks.k.v[shapeObj.ks.k.v.length - 1][1] + shapeObj.ks.k.o[shapeObj.ks.k.v.length - 1][1]} ${
      shapeObj.ks.k.v[0][0] + shapeObj.ks.k.i[0][0]
    },${shapeObj.ks.k.v[0][1] + shapeObj.ks.k.i[0][1]} ${shapeObj.ks.k.v[0][0]},${shapeObj.ks.k.v[0][1]}`;
    dataString += ' Z';
  }
  shapeObj._data = dataString;
  var newShape = document.createElementNS(xmlns, 'path');
  newShape.setAttribute('fill', 'transparent');
  newShape.setAttribute('id', `${animationId}_shape${shapeObj._shape}`);
  newShape.setAttribute('d', dataString);
  newShape.classList.add('shape');
  referrer.prepend(newShape);
  shapeObj._isShape = true;
  return shapeObj;
}

function prepShapeShKeyframe(shapeObj, referrer, animationId, depth) {
  return shapeObj;
}

function prepShape(shapeObj, referrer, animationId, isMasked, depth) {
  if (shapeObj.ty == 'fl') {
    if (shapeObj.c.k.hasOwnProperty('s')) {
      shapeObj = getPosition(shapeObj, null, 'c', false, animationId, 3, shapeObj, depth);
    }
  }
  if (shapeObj.ty == 'tr') {
    if (shapeObj.hasOwnProperty('a')) {
      if (shapeObj.a.k.hasOwnProperty('s')) {
        shapeObj = getPosition(shapeObj, null, 'a', false, animationId, 2, shapeObj, depth);
        if (shapeObj.a.k[0].t > 0) {
          shapeObj._startI = true;
        }
      }
      if (shapeObj.a.k.length > 1) {
        shapeObj._anchorX = shapeObj.a.k[0];
        shapeObj._anchorY = shapeObj.a.k[1];
      }
    }
    if (shapeObj.hasOwnProperty('p')) {
      if (shapeObj.p.k.hasOwnProperty('s')) {
        shapeObj = getPosition(shapeObj, null, 'p', false, animationId, 2, shapeObj, depth);
        if (shapeObj.p.k[0].t > 0) {
          shapeObj._startI = true;
        }
      }
    }
  }

  if (shapeObj.ty == 'sh') {
    if (shapeObj.hasOwnProperty('ks') && shapeObj.ks.k.length > 1) {
      shapeObj = prepShapeShKeyframe(shapeObj, referrer, animationId, depth);
    }
    shapeObj = prepShapeSh(shapeObj, referrer, animationId, depth);
  }

  if (shapeObj.ty == 'rc') {
    if (shapeObj.hasOwnProperty('ks') && shapeObj.ks.k.length > 1) {
      shapeObj = prepShapeRcKeyframe(shapeObj, referrer, animationId, depth);
    }
    shapeObj = prepShapeRc(shapeObj, referrer, animationId, depth);
  }

  if (shapeObj.ty == 'el') {
    if (shapeObj.hasOwnProperty('ks') && shapeObj.ks.k.length > 1) {
      shapeObj = prepShapeRcKeyframe(shapeObj, referrer, animationId, depth);
    }
    shapeObj = prepShapeEl(shapeObj, referrer, animationId, depth);
  }

  return shapeObj;
}

function createGradientDef(start, end, opacity, gradient, radial, animationId, depth) {
  exports.animation[animationId].gradientCount++;
  const newDefId = `${animationId}_gradient${exports.animation[animationId].gradientCount}`;
  var newDef;
  if (radial == 2) {
    newDef = document.createElementNS(xmlns, 'radialGradient');
    if (gradient.k.k[0].hasOwnProperty('s')) {
      if (!Number.isNaN(start.k[0] != NaN)) {
        newDef.setAttribute('x1', start.k[0]);
      }
      if (!Number.isNaN(end.k[0])) {
        newDef.setAttribute('x2', end.k[0]);
      }
      if (!Number.isNaN(start.k[1])) {
        newDef.setAttribute('y1', start.k[1]);
      }
      if (!Number.isNaN(end.k[1])) {
        newDef.setAttribute('y2', end.k[1]);
      }
    }
  } else {
    newDef = document.createElementNS(xmlns, 'linearGradient');
    if (gradient.k.k[0].hasOwnProperty('s')) {
      newDef.setAttribute('spreadMethod', 'pad');
      newDef.setAttribute('gradientUnits', 'userSpaceOnUse');
      if (!Number.isNaN(start.k[0])) {
        newDef.setAttribute('x1', start.k[0]);
      }
      if (!Number.isNaN(end.k[0])) {
        newDef.setAttribute('x2', end.k[0]);
      }
      if (!Number.isNaN(start.k[1])) {
        newDef.setAttribute('y1', start.k[1]);
      }
      if (!Number.isNaN(end.k[1])) {
        newDef.setAttribute('y2', end.k[1]);
      }
    }
  }
  newDef.setAttribute('id', newDefId);
  exports.animation[animationId].defs.prepend(newDef);
  //panda.log('---------------------------------------');
  if (gradient.k.k[0].hasOwnProperty('s')) {
    var firstRun = true;
    gradient = extrapolateOffsetKeyframe(gradient, 'k', false, animationId, -1, gradient, depth);
    for (var j = 0; j < gradient.k.k.length - 1; j++) {
      const offsets = [];
      const styles = [];
      const opacities = [];
      var transforms = getEmptyFillTransform();
      transforms.offsets = [];
      transforms.styles = [];
      if (gradient.k.k[j].hasOwnProperty('s')) {
        for (var i = 0; i < gradient.p; i++) {
          //panda.log(`${gradient.k.k[j].s[i * 4 + 0] * 100}%`);
          if (gradient.k.k[j].s[i * 4 + 0] == 0 || isNaN(gradient.k.k[j].s[i * 4 + 0])) {
            offsets.push("0%");
          } else {
            offsets.push(`${gradient.k.k[j].s[i * 4 + 0] * 100}%`);
          }
          styles.push(
            `stop-color:rgb(${parseInt(gradient.k.k[j].s[i * 4 + 1] * 255)},${parseInt(gradient.k.k[j].s[i * 4 + 2] * 255)},${parseInt(
              gradient.k.k[j].s[i * 4 + 3] * 255,
            )});`,
          );
          /*panda.log(`stop-color:rgb(${parseInt(gradient.k.k[j].s[i * 4 + 1] * 255)},${parseInt(gradient.k.k[j].s[i * 4 + 2] * 255)},${parseInt(
            gradient.k.k[j].s[i * 4 + 3] * 255,
          )});`);*/
          opacities.push('stop-opacity:1;');
        }
        if (gradient.k.k[j].s.length > gradient.p * 4) {
          for (var i = 0; i < gradient.p; i++) {
            opacities[i] = `stop-opacity:${gradient.k.k[j].s[i * 2 + gradient.p * 4 + 1]};`;
          }
        }
        transforms.fillObj = newDefId;
        for (var i = 0; i < gradient.p; i++) {
          transforms.offsets.push(offsets[i]);
          transforms.styles.push(styles[i] + opacities[i]);
        }
        transforms.isGradient = true;
        exports.animation[animationId]._scene[parseInt(gradient.k.k[j].t)]._transform.push(transforms);
        if (firstRun) {
          for (var i = 0; i < gradient.p; i++) {
            const newStop = document.createElementNS(xmlns, 'stop');
            newStop.setAttribute('offset', offsets[i]);
            newStop.setAttribute('style', styles[i] + opacities[i]);
            newDef.append(newStop);
          }
          firstRun = false;
        }
      }
    }
  } else {
    const offsets = [];
    const styles = [];
    const opacities = [];
    for (var i = 0; i < gradient.p; i++) {
      if (gradient.k.k[i * 4 + 0] > 0) {
        offsets.push(`${gradient.k.k[i * 4 + 0] * 100}%`);
      } else {
        offsets.push("0%");
      }
      styles.push(
        `stop-color:rgb(${parseInt(gradient.k.k[i * 4 + 1] * 255)},${parseInt(gradient.k.k[i * 4 + 2] * 255)},${parseInt(
          gradient.k.k[i * 4 + 3] * 255,
        )});`,
      );
      opacities.push('stop-opacity:1;');
    }
    if (gradient.k.k.length > gradient.p * 4) {
      for (var i = 0; i < gradient.p; i++) {
        opacities[i] = `stop-opacity:${gradient.k.k[i * 2 + gradient.p * 4 + 1]};`;
      }
    }
    for (var i = 0; i < gradient.p; i++) {
      const newStop = document.createElementNS(xmlns, 'stop');
      newStop.setAttribute('offset', offsets[i]);
      newStop.setAttribute('style', styles[i] + opacities[i]);
      newDef.append(newStop);
    }
  }

  return `url(#${newDefId})`;
}

// Enum for line cap types.
const lcEnum = {
  1: 'butt',
  2: 'round',
  3: 'square',
};

// Enum for line join options.
const ljEnum = {
  1: 'miter',
  2: 'round',
  3: 'bevel',
};

/**
 * Create all the parameters for stroking a shape.
 * 
 * @param {JSON} color An object that holds the parameters for the color definition.
 * @param {JSON} opacity An object that holds the opacity parameter.
 * @param {JSON} width An object that describes the width of the stroke.
 * @param {integer} lineCap Enum key that describes the line cap type.
 * @param {integer} lineJoin Enum key that describes the line join type.
 * @param {integer} miterLimit The miter limit parameter.
 * @returns {JSON} strokeString An object that lists all the parameters needed for stroking.
 */
function getStrokeString(shapeObj, animationId, depth, shapeGroup) {
  const strokeString = {
    color: '',
    opacity: 1,
    width: 1,
    lineCap: 'round',
    lineJoin: 'round',
    miterLimit: 0,
  };

  strokeString.color = `rgb(${shapeObj.c.k[0] * 255},${shapeObj.c.k[1] * 255},${shapeObj.c.k[2] * 255})`;
  strokeString.opacity = shapeObj.o.k / 100;
  if (shapeObj.w.k.length > 1 && shapeObj.w.k[0].hasOwnProperty('s')) {
    let totalK;
    shapeObj = extrapolateOffsetKeyframe(shapeObj, 'w', false, animationId, -1, shapeObj, depth);
    if (shapeObj.w.k[shapeObj.w.k.length - 1].hasOwnProperty('s')) {
      totalK = shapeObj.w.k.length;
    } else {
      totalK = shapeObj.w.k.length - 1;
    }
    for (let sCount = 0; sCount < shapeGroup.length; sCount++) {
      if (shapeGroup[sCount]._isShape) {
        for (let kCount = 0; kCount < shapeObj.w.k.length; kCount++) {
          let transforms = getEmptyTransform();
          transforms.isLayer = false;
          transforms.isTween = false;
          transforms.refObj = `${animationId}_shape${shapeGroup[sCount]._shape}`;
          transforms.refObjOther = `${animationId}_shape${shapeGroup[sCount]._shape}`;
          //panda.log(transforms.refObj);
          transforms.refObjSet = true;

          transforms = findExistingTransform(transforms, animationId, shapeObj.w.k[kCount].t);
          transforms.strokeWidth = shapeObj.w.k[kCount].s;
          if (shapeObj.w.k[kCount].t > exports.animation[animationId]._totalFrames || shapeObj.w.k[kCount].t < 0) {
            break;
          }
          exports.animation[animationId]._scene[parseInt(shapeObj.w.k[kCount].t)]._transform.push(transforms);
        }
      }
    }
    strokeString.width = shapeObj.w.k[0].s;
  } else {
    strokeString.width = shapeObj.w.k;
  }
  strokeString.lineCap = lcEnum[shapeObj.lc];
  strokeString.lineJoin = lcEnum[shapeObj.lj];
  if (strokeString.lineJoin == 1) {
    strokeString.miterLimit = strokeString.lineJoin;
  }
  return strokeString;
}

/**
 * Generate a color string that conforms to the format for 'color' property defined by SVG 1.1.
 * 
 * @param {float} redVal The weight of red color as a fraction of 1.
 * @param {float} greenVal The weight of green color as a fraction of 1.
 * @param {float} blueVal The weight of blue color as a fraction of 1.
 * @returns {string} color A valid color value for the 'color' property defined by SVG 1.1.
 */
function getColorString(redVal, greenVal, blueVal) {
  const color = `rgb(${redVal * 255},${greenVal * 255},${blueVal * 255})`;
  return color;
}

/**
 * Set the stroke for a group of shapes.
 * 
 * @param {JSON} shapesGroup An array of shapes.
 * @param {JSON} strokeToSet An object that has the parameters that describe styling for the stroke.
 * @param {integer} animationId The serial number of the current animation.
 * @param {boolean} isGradient If 'true', then this stroke has a gradient shading.
 */
function setShapeStrokes(shapesGroup, strokeToSet, animationId, isGradient) {
  for (let i = 0; i < shapesGroup.length; i++) {
    if (shapesGroup[i]._isShape) {
      document.getElementById(`${animationId}_shape${shapesGroup[i]._shape}`).setAttribute('stroke', strokeToSet.color);
      document
        .getElementById(`${animationId}_shape${shapesGroup[i]._shape}`)
        .setAttribute('stroke-width', strokeToSet.width);
      document
        .getElementById(`${animationId}_shape${shapesGroup[i]._shape}`)
        .setAttribute('stroke-linecap', strokeToSet.lineCap);
      document
        .getElementById(`${animationId}_shape${shapesGroup[i]._shape}`)
        .setAttribute('stroke-linejoin', strokeToSet.lineJoin);
      document
        .getElementById(`${animationId}_shape${shapesGroup[i]._shape}`)
        .setAttribute('stroke-opacity', strokeToSet.opacity);
      if (strokeToSet.lineJoin == 1) {
        document
          .getElementById(`${animationId}_shape${shapesGroup[i]._shape}`)
          .setAttribute('stroke-miterlimit', strokeToSet.miterLimit);
      }
    }
  }
}

/**
 * Set the color for a group of shapes.
 * 
 * @param {JSON} shapesGroup An array of shapes.
 * @param {string} colorToSet A valid color value for the 'color' property defined by SVG 1.1.
 * @param {integer} animationId The serial number of the current animation.
 * @param {boolean} isGradient If 'true', then the color defintion is for a gradient.
 * @param {boolean} isMasked If 'true', then the color attribute is for a mask.
 */
function setShapeColors(shapesGroup, colorToSet, animationId, isGradient, isMasked) {
  for (let i = 0; i < shapesGroup.length; i++) {
    if (shapesGroup[i]._isShape && typeof colorToSet !== 'undefined') {
      document.getElementById(`${animationId}_shape${shapesGroup[i]._shape}`).setAttribute('fill', colorToSet);
      document.getElementById(`${animationId}_shape${shapesGroup[i]._shape}`).setAttribute('fill-opacity', 1);
    }
  }
}


function getTrim(shapeObj, animationId, depth, shapeGroup) {
  if (shapeObj.e.k.length > 1 && shapeObj.e.k.hasOwnProperty('s')) {
    shapeObj = extrapolateOffsetKeyframe(shapeObj, 'e', false, animationId, -1, shapeObj, depth);
  }
  if (shapeObj.s.k.length > 1 && shapeObj.s.k.hasOwnProperty('s')) {
    shapeObj = extrapolateOffsetKeyframe(shapeObj, 's', false, animationId, -1, shapeObj, depth);
  }

  return shapeObj;
}

/*
p1,
c1,
c2,
p2,
fromT,
toT,
isLayer,
animationId,
refKey,
addTransformation,
objectId,
depth,
customFlag,

export function extrapolateOffsetKeyframe(
  offsetKeyframeObj,
  refKey,
  isLayer,
  animationId,
  addTransformation,
  objectId,
  depth,
  */


function getSegment(p1, c1, c2, p2, t0, t1) {
  let u0 = 1.0 - t0;
  let u1 = 1.0 - t1;

  let qxa = (p1[0] * u0 * u0) + (c1[0] * 2 * t0 * u0) + (c2[0] * t0 * t0);
  let qxb = (p1[0] * u1 * u1) + (c1[0] * 2 * t1 * u1) + (c2[0] * t1 * t1);
  let qxc = (c1[0] * u0 * u0) + (c2[0] * 2 * t0 * u0) + (p2[0] * t0 * t0);
  let qxd = (c1[0] * u1 * u1) + (c2[0] * 2 * t1 * u1) + (p2[0] * t1 * t1);

  let qya = (p1[1] * u0 * u0) + (c1[1] * 2 * t0 * u0) + (c2[1] * t0 * t0);
  let qyb = (p1[1] * u1 * u1) + (c1[1] * 2 * t1 * u1) + (c2[1] * t1 * t1);
  let qyc = (c1[1] * u0 * u0) + (c2[1] * 2 * t0 * u0) + (p2[1] * t0 * t0);
  let qyd = (c1[1] * u1 * u1) + (c2[1] * 2 * t1 * u1) + (p2[1] * t1 * t1);

  let segment = [];
  segment.push( [(qxa * u0) + (qxc * t0), (qya * u0) + (qyc * t0)] );

  segment.push( [(qxa * u1) + (qxc * t1), (qya * u1) + (qyc * t1)] );

  segment.push( [(qxb * u0) + (qxd * t0), (qyb * u0) + (qyd * t0)] );

  segment.push( [(qxb * u1) + (qxd * t1), (qyb * u1) + (qyd * t1)] );

  return segment;
}

function setTrim(shapesGroup, trimToSet, animationId, depth) {
  panda.log("entered");
  for (let i = 0; i < shapesGroup.length; i++) {
    if (shapesGroup[i].ty == 'gr') {
      panda.log("entering group");
      setTrim(shapesGroup[i].it, trimToSet, animationId);
  } else {
      if (shapesGroup[i]._isShape) {
        panda.log("started");
        let bezierLength = 0;
        if (shapesGroup[i].ty == 'sh' && shapesGroup[i].ks.k.hasOwnProperty('v') && shapesGroup[i].ks.k.length > 1) {
          for (let j = 0; j < shapesGroup[i].ks.k.v.length; j++) {
            returnedKeyframeObj = bezierCurve(
              shapesGroup[i].ks.k.v[j],
              shapesGroup[i].ks.k.o[j],
              shapesGroup[i].ks.k.i[j + 1],
              shapesGroup[i].ks.k.v[j + 1],
              1,
              20,
              false,
              animationId,
              's',
              -1,
              shapesGroup[i].ks.k,
              depth,
              'length',
            );
            shapesGroup[i].ks.k.v[j]._l = arcLength(returnedKeyframeObj[0].s, returnedKeyframeObj[1].s) * 22;
            bezierLength = bezierLength + shapesGroup[i].ks.k.v[j]._l;
          }

          let minT;
          let maxT;
          if (trimToSet.s.k.length > 1) {
            minT = trimToSet.s.k[0].t;
          }
          if (trimToSet.s.k[0].t < minT) {
            minT = trimToSet.s.k[0].t;
          }
          if (trimToSet.e.k.length > 1) {
            maxT = trimToSet.e.k[trimToSet.s.k.length - 1].t;
          }
          if (trimToSet.e.k[trimToSet.e.k.length - 1].t > maxT) {
            maxT = trimToSet.e.k[trimToSet.e.k.length - 1].t;
          }

          let sIndex = -1;
          let eIndex = -1;
          let lastSL = -1;
          let lastEL = -1;
          let curSL;
          let curEL;
          let startShapeIndex = -1;
          let endShapeIndex = -1;
          let vList = [];
          let tDelta;
          for (let t = minT; t <= maxT; t++) {
            let tempK = Object.assign({}, shapeGroup[i].ks.k);
            if (trimToSet.s.k.length > 1 && sIndex < trimToSet.s.k.length - 1 && trimToSet.s.k[0].t >= t) {
              sIndex++;
            }
            if (trimToSet.e.k.length > 1 && eIndex < trimToSet.e.k.length - 1 && trimToSet.e.k[0].t >= t) {
              eIndex++;
            }
            let startSegment;
            let endSegment;
            let sourceK = {'i': [], 'o': [], 'v': []};
            if (trimToSet.s.k[sIndex].t == t) {
              curSL = trimToSet.s.k[sIndex].s[0];
              tDelta = trimToSet.s.k[sIndex + 1].t - trimToSet.s.k[sIndex].t;
              let tSeg = 1 / tDelta;
              for (let j = 0; j < tempK.v.length - 1; j++) {
                if (curSL < tempK.v[j]._l) {
                  startShapeIndex = j;
                  let ratio = curlSL / tempK.v[j]._l;
                  startSegment = getSegment(tempK.v[j], tempK.o[j], tempK.i[j + 1], tempK.v[j + 1], tSeg, 0.99);
                  break;
                } else {
                  curSL = curSL - tempK.v[j]._l;
                }
              }
            }

            if (trimToSet.e.k[eIndex].t == t) {
              curEL = trimToSet.e.k[eIndex].s[0];
              tDelta = trimToSet.e.k[eIndex + 1].t - trimToSet.e.k[eIndex].t;
              let tSeg = 1 / tDelta;
              for (let j = tempK.v.length - 2; j > 0; j--) {
                if (curEL < tempK.v[j]._l) {
                  endShapeIndex = j;
                  let ratio = curlEL / tempK.v[j]._l;
                  endSegment = getSegment(tempK.v[j], tempK.o[j], tempK.i[j + 1], tempK.v[j + 1], 0.01, tSeg);
                  break;
                } else {
                  curEL = curEL - tempK.v[j]._l;
                }
              }
            }

            if (startShapeIndex > -1) {
              sourceK.i.push(tempK.i[startShapeIndex]);
              sourceK.o.push(startSegment[1]);
              sourceK.v.push(startSegment[0]);
            }

            if ((eIndex - 1) - (sIndex + 1) >= 0) {
              for (let j = sIndex + 1; j < eIndex; j ++) {
                sourceK.i.push(tempK.i[j]);
                sourceK.o.push(tempK.o[j]);
                sourceK.v.push(tempK.v[j]);
              }
            }

            if (endShapeIndex > -1) {
              sourceK.i.push(tempK.i[endShapeIndex]);
              sourceK.o.push(endSegment[1]);
              sourceK.v.push(endSegment[0]);
            }

            let transforms = setDataString(animationId, sourceK, shapesGroup[i]._shape, false, t);

            panda.log("before adding");
            if (t > exports.animation[animationId]._totalFrames || t < 0) {
              break;
            }
            panda.log("adding");
            exports.animation[animationId]._scene[parseInt(t)]._transform.push(transforms);
    
            //shapeGroup[i]._shape
          }

        }
      }
    }
  }



  /*
  let tempEnd = {length:{}};
  let tempStart = {length:{}};
  tempEnd.length = shapeObj.e;
  tempStart.length = shapeObj.s;
  tempEnd = extrapolateOffsetKeyframe(tempEnd, 'length', false, animationId, -1, tempEnd, depth);
  */
}

/**
 * Iterate through the shapes in a shape group ('gr') object, prepare the required DOM elements, and trigger the creation of shapes, attributes and transformations.
 * 
 * @param {string} elementId The 'id' attribute of the DOMElement 'elementObj'.
 * @param {integer} animationId The serial number of this animation.
 * @param {JSON} layerObj The JSON object whose root to be scoured for shape items.
 * @param {JSON} referrer The JSON object that contained the 'layerObj' passed in here.
 * @param {string} refGroup The 'id' of the <g> that corresponds to the calling JSON object (pointed to by the 'referrer').
 * @param {boolean} isMasked If 'true', then this group of shapes are masked.
 * @param {integer} depth The level of iteration of precompositions (1 if this is the root layers and their corresponding shape groups).
 * @returns 
 */
function getShapesGr(elementId, animationId, layerObj, referrer, refGroup, isMasked, depth) {
  let currentColor;
  let currentStroke;
  let currentTrim;
  let stroked = false;
  let trimmed = false;
  for (let i = 0; i < layerObj.it.length; i++) {
    layerObj._isGradient = false;
    exports.animation[animationId].shapeCount++;
    if (layerObj.tt > 0) {
      isMasked = layerObj.td;
    }
    if (layerObj.it[i].ty == 'gr') { // Shape group
      layerObj.it[i]._group = exports.animation[animationId].shapeCount;
      const newGroup = document.createElementNS(xmlns, 'g');
      newGroup.setAttribute('id', `${animationId}_group${exports.animation[animationId].shapeCount}`);
      exports.animation[animationId]._currentShapeGroup = exports.animation[animationId].shapeCount;
      referrer.prepend(newGroup);
      layerObj.it[i] = getShapesGr(
        elementId,
        animationId,
        layerObj.it[i],
        newGroup,
        `${animationId}_group${exports.animation[animationId].shapeCount}`,
        refGroup,
        isMasked,
        depth,
      );
    } else {
      layerObj.it[i]._shape = exports.animation[animationId].shapeCount;
      layerObj.it[i] = prepShape(layerObj.it[i], referrer, animationId, isMasked);
      if (layerObj.it[i].ty == 'tr') { // Transformations
        layerObj.it[i]._trIndex = i;
        if (layerObj.it[i].p.hasOwnProperty('k')) {
          if (layerObj.it[i].p.k.length > 1) {
            if (layerObj.it[i].hasOwnProperty('a')) {
              document
                .getElementById(refGroup)
                .setAttribute(
                  'transform',
                  `translate(${layerObj.it[i].p.k[0] - layerObj.it[i].a.k[0]},${
                    layerObj.it[i].p.k[1] - layerObj.it[i].a.k[1]
                  })`,
                );
            } else {
              document
                .getElementById(refGroup)
                .setAttribute('transform', `translate(${layerObj.it[i].p.k[0]},${layerObj.it[i].p.k[1]})`);
            }
          }
        }
      }
      if (layerObj.it[i].ty == 'fl') { // Fill shape
        if (layerObj.it[i].c.k.length > 1) {
          currentColor = getColorString(layerObj.it[i].c.k[0], layerObj.it[i].c.k[1], layerObj.it[i].c.k[2]);
        }
      }
      if (layerObj.it[i].ty == 'st') { // Stroke shape
        if (layerObj.it[i].c.k.length > 1) {
          currentStroke = getStrokeString(
            layerObj.it[i],
            animationId,
            depth,
            layerObj.it,
          );
          stroked = true;
        }
      }
      if (layerObj.it[i].ty == 'tm') { // Stroke shape
        //if (layerObj.it[i].c.k.length > 1) {
          currentTrim = getTrim(
            layerObj.it[i],
            animationId,
            depth,
            layerObj.it,
          );
          layerObj.it[i] = currentTrim;
          trimmed = true;
        //}
      }
      if (layerObj.it[i].ty == 'gf') { // Gradient fill shape
        layerObj._isGradient = true;
        currentColor = createGradientDef(
          layerObj.it[i].s,
          layerObj.it[i].e,
          layerObj.it[i].o,
          layerObj.it[i].g,
          layerObj.it[i].r,
          animationId,
          depth,
        );
      }
    }
  }
  setShapeColors(layerObj.it, currentColor, animationId, layerObj._isGradient, isMasked); // Set the color for this group of shapes.
  if (stroked) {
    setShapeStrokes(layerObj.it, currentStroke, animationId); // Set the stroke for this group of shapes.
  }
  if (trimmed) {
    setTrim(layerObj.it, currentTrim, animationId); // Set the trim for this group of shapes.
  }
  return layerObj;
}

/**
 * Iterate through the shapes in a layer object, prepare the required DOM elements, and trigger the creation of shapes, attributes and transformations.
 * 
 * @param {string} elementId The 'id' attribute of the DOMElement 'elementObj'.
 * @param {integer} animationId The serial number of this animation.
 * @param {JSON} layerObj The JSON object whose root to be scoured for shape items.
 * @param {JSON} referrer The JSON object that contained the 'layerObj' passed in here.
 * @param {string} refGroup The 'id' of the <g> that corresponds to the calling JSON object (pointed to by the 'referrer').
 * @param {boolean} isMasked If 'true', then this group of shapes are masked.
 * @param {integer} depth The level of iteration of precompositions (1 if this is the root layers and their corresponding shape groups).
 * @returns 
 */
function getShapes(elementId, animationId, layerObj, referrer, refGroup, isMasked, depth) {
  let currentColor;
  let currentStroke;
  let currentTrim;
  let stroked = false;
  let trimmed = false;
  for (let i = 0; i < layerObj.shapes.length; i++) {
    layerObj._isGradient = false;
    exports.animation[animationId].shapeCount++;
    if (layerObj.tt > 0) {
      isMasked = layerObj.td;
    }
    if (layerObj.shapes[i].ty == 'gr') { // Shape group
      layerObj.shapes[i]._group = exports.animation[animationId].shapeCount;
      const newGroup = document.createElementNS(xmlns, 'g');
      newGroup.setAttribute('id', `${animationId}_group${exports.animation[animationId].shapeCount}`);
      newGroup.setAttribute('opacity', 1);
      exports.animation[animationId]._currentShapeGroup = exports.animation[animationId].shapeCount;
      referrer.prepend(newGroup);
      layerObj.shapes[i] = getShapesGr(
        elementId,
        animationId,
        layerObj.shapes[i],
        newGroup,
        `${animationId}_group${exports.animation[animationId].shapeCount}`,
        refGroup,
        isMasked,
        depth,
      );

    } else {
      layerObj.shapes[i]._shape = exports.animation[animationId].shapeCount;
      layerObj.shapes[i] = prepShape(layerObj.shapes[i], referrer, animationId, isMasked);
      if (layerObj.shapes[i].ty == 'tr') { // Transformation
        layerObj.shapes[i]._trIndex = i;
        if (layerObj.shapes[i].p.hasOwnProperty('k')) {
          if (layerObj.shapes[i].p.k > 1) {
            document
              .getElementById(`${animationId}_${depth}_layerGroup${layerObj._layer}`)
              .setAttribute('transform', `translate(${layerObj.shapes[i].p.k[0]},${layerObj.shapes[i].p.k[1]})`);
          }
        }
      }
      if (layerObj.shapes[i].ty == 'fl') { // Fill shape
        if (layerObj.shapes[i].c.k.length > 1) {
          currentColor = getColorString(
            layerObj.shapes[i].c.k[0],
            layerObj.shapes[i].c.k[1],
            layerObj.shapes[i].c.k[2],
          );
        }
      }
      if (layerObj.shapes[i].ty == 'st') { // Stroke shape
        if (layerObj.shapes[i].c.k.length > 1) {
          currentStroke = getStrokeString(
            layerObj.shapes[i],
            animationId,
            depth,
            layerObj.shapes,
          );
          stroked = true;
        }
      }
      if (layerObj.shapes[i].ty == 'tm') { // Stroke shape
        //if (layerObj.shapes[i].c.k.length > 1) {
          currentTrim = getTrim(
            layerObj.shapes[i],
            animationId,
            depth,
            layerObj.shapes,
          );
          layerObj.shapes[i] = currentTrim;
          trimmed = true;
        //}
      }
      if (layerObj.shapes[i].ty == 'gf') { // Gradient fill shape
        layerObj._isGradient = true;
        currentColor = createGradientDef(
          layerObj.shapes[i].s,
          layerObj.shapes[i].e,
          layerObj.shapes[i].o,
          layerObj.shapes[i].g,
          layerObj.shapes[i].r,
          animationId,
          depth,
        );
      }
    }
  }
  setShapeColors(layerObj.shapes, currentColor, animationId, layerObj._isGradient, isMasked); // Set the color for this group of shapes.
  if (stroked) {
    setShapeStrokes(layerObj.shapes, currentStroke, animationId); // Set the stroke for this group of shapes.
  }
  if (trimmed) {
    setTrim(layerObj.shapes, currentTrim, animationId); // Set the trim for this group of shapes.
  }
  return layerObj;
}

function findChildren(passedObj) {

}

/**
 * Create forward-linking to children of the layer item passed to this function, and create the child containers within the parent's.
 * 
 * @param {integer} animationId The serial number of the current animation.
 * @param {integer} layerId The serial number of the current layer item to be processed.
 * @param {integer} lastMaskId The serial number of the last mask layer that was discovered.
 * @param {JSON} passedObj The JSON object that holds the group of layer items to peruse.
 * @param {string} passedKey The key that describes the array in 'passedObj' that holds a group of layer items.
 * @param {integer} depth An integer that describes the depth of the current layer group (1 for no iterations).
 * @returns 
 */
function resolveParents(animationId, layerId, lastMaskId, passedObj, passedKey, depth, level, addArray, passedLevel) {
  let newGroup;
  let newTranslateGroup;
  let newLayer;

  for (let j = 0; j < passedObj[passedKey].length; j++) {
    if (passedObj[passedKey][j].ind == passedObj[passedKey][layerId].parent) {
      if (passedObj[passedKey][j].tt > 0) {
        for (let k = j - 1; k >= 0; k--) {
          if (passedObj[passedKey][k].td > 0) {
            passedObj[passedKey][j]._mask = `_${animationId}_${depth}_layerMask${passedObj[passedKey][k].ind}`;
            passedObj[passedKey][j]._isMasked = true;
            break;
          }
        }
      }
      addArray.push({"item": layerId, "level": passedLevel});

      if (!passedObj[passedKey][j]._addedToDom) {
        resolveParents(animationId, j, lastMaskId, passedObj, passedKey, depth, level + 1, addArray, passedLevel + 1);
      }
      exports.animation[animationId].layerCount++;
      passedObj[passedKey][layerId]._parent = passedObj[passedKey][j]._layer;
      passedObj[passedKey][layerId]._parentIdx = j;
      //if (!passedObj[passedKey][j]._addedToDom) {
        passedObj[passedKey][layerId].domObj = {};
        
        passedObj[passedKey][layerId].domObj.newLayer = document.createElementNS(xmlns, 'g');
        passedObj[passedKey][layerId].domObj.newLayer.setAttribute('id', `${animationId}_${depth}_layer${passedObj[passedKey][layerId]._layer}`);
        passedObj[passedKey][layerId].domObj.newLayer.setAttribute('mask', lastMaskId);
        passedObj[passedKey][layerId].domObj.newLayer.setAttribute('opacity', 1);

        //document
        //  .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][layerId]._parent}`)
        //  .append(newLayer);
        //passedObj[passedKey][j].domObj.newTranslateGroup.prepend(newLayer);
        passedObj[passedKey][layerId].domObj.newTranslateGroup = document.createElementNS(xmlns, 'g');
        passedObj[passedKey][layerId].domObj.newTranslateGroup.setAttribute(
          'id',
          `${animationId}_${depth}_layerTranslate${passedObj[passedKey][layerId]._layer}`,
        );
        passedObj[passedKey][layerId].domObj.newTranslateGroup.setAttribute('opacity', 1);
        passedObj[passedKey][layerId].domObj.newLayer.prepend(newTranslateGroup);

        if (passedObj[passedKey][layerId].w > 0) {
          passedObj[passedKey][layerId].domObj.newLayer.style.width = passedObj[passedKey][layerId].w;
        }
        if (passedObj[passedKey][layerId].h > 0) {
          passedObj[passedKey][layerId].domObj.newLayer.style.height = passedObj[passedKey][layerId].h;
        }
        passedObj[passedKey][layerId].domObj.newGroup = document.createElementNS(xmlns, 'g');
        passedObj[passedKey][layerId].domObj.newGroup.setAttribute('id', `${animationId}_${depth}_layerGroup${passedObj[passedKey][layerId]._layer}`);
        passedObj[passedKey][layerId].domObj.newGroup.setAttribute('opacity', 1);
        passedObj[passedKey][layerId].domObj.newTranslateGroup.prepend(newGroup);

        passedObj[passedKey][layerId]._addedToDom = true;
        passedObj[passedKey][layerId].domObj.level = level;
        passedObj[passedKey][layerId].processed = false;

        // Push the child's 'id' into this item's ._child[] and the serial number of the child into ._childId[]
        passedObj[passedKey][j]._child.push(`_layerGroup${passedObj[passedKey][layerId].parent}`);
        passedObj[passedKey][j]._childId.push(layerId);

      //}

      return;
    }
  }
}

/**
 * Iterate through the layers of the animation, prepare the scaffolding needed to process the items in each one, and then trigger the respective functions to do the processing.
 * 
 * @param {string} elementId The 'id' attribute of the DOMElement 'elementObj'.
 * @param {integer} animationId The serial number of this animation.
 * @param {DOMElement} elementObj The DOMElement describing the first Lottie layer element in the animation.
 * @param {JSON} passedObj The object that has 'layers', shapes group ('gr'), or 'assets'.
 * @param {string} passedKey The name of the array, in 'passedObj', that lists the target layer objects.
 * @param {integer} depth The depth of the current iteration of layer objects.
 * @returns 
 */
function getLayers(elementId, animationId, elementObj, passedObj, passedKey, depth) {
  if (passedObj[passedKey] === undefined || passedObj[passedKey].length < 1) {
    return;
  }
  exports.animation[animationId].depth++;
  depth = exports.animation[animationId].depth;
  let newLayer;
  let newGroup;
  let newMask;
  let newTranslateGroup;
  let posX;
  let posY;
  let lastMaskId = '';

  //passedObj.myDepth = depth;
  //if (depth < 1) {
    for (var i = 0; i < passedObj[passedKey].length; i++) {
      if (passedObj[passedKey][i].w > exports.animation[animationId].w) {
        exports.animation[animationId]._maxWidth = passedObj[passedKey][i].w;
      }
      if (passedObj[passedKey][i].h > exports.animation[animationId].h) {
        exports.animation[animationId]._maxHeight = passedObj[passedKey][i].h;
      }
      passedObj.layerCount++;
      passedObj[passedKey][i]._layer = passedObj[passedKey][i].ind;
      passedObj[passedKey][i]._child = [];
      passedObj[passedKey][i]._childId = [];
      if (passedObj[passedKey][i].parent > 0) {
      } else {
        if (passedObj[passedKey][i].td > 0) {
          passedObj[passedKey][i]._isMask = true;
          newMask = document.createElementNS(xmlns, 'mask');
          lastMaskId = `_${animationId}_${depth}_layerMask${passedObj[passedKey][i].ind}`;
          newMask.setAttribute('id', lastMaskId);
          newMask.setAttribute('mask-type', 'alpha');
          newMask.setAttribute('opacity', 1);
          exports.animation[animationId].defs.prepend(newMask);

          newLayer = document.createElementNS(xmlns, 'g');
          newLayer.setAttribute('id', `${animationId}_${depth}_layer${passedObj[passedKey][i].ind}`);
          newLayer.setAttribute('style', 'display: block;');
          newLayer.setAttribute('opacity', 1);
          newMask.prepend(newLayer);
        } else {
          newLayer = document.createElementNS(xmlns, 'g');
          newLayer.setAttribute('id', `${animationId}_${depth}_layer${passedObj[passedKey][i].ind}`);
          newLayer.setAttribute('opacity', 1);
          elementObj.prepend(newLayer);
          if (passedObj[passedKey][i].tt > 0) {
            passedObj[passedKey][i]._mask = lastMaskId;
            passedObj[passedKey][i]._isMasked = true;
          }
        }
        passedObj[passedKey][i]._addedToDom = true;

        newTranslateGroup = document.createElementNS(xmlns, 'g');
        newTranslateGroup.setAttribute('id', `${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._layer}`);
        newTranslateGroup.setAttribute('opacity', 1);
        newLayer.prepend(newTranslateGroup);
        if (passedObj[passedKey][i].w > 0) {
          newLayer.style.width = passedObj[passedKey][i].w;
        }
        if (passedObj[passedKey][i].h > 0) {
          newLayer.style.height = passedObj[passedKey][i].h;
        }
        newGroup = document.createElementNS(xmlns, 'g');
        newGroup.setAttribute('id', `${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`);
        newGroup.setAttribute('opacity', 1);
        newTranslateGroup.prepend(newGroup);

        passedObj[passedKey][i].processed = true;
      }
    }

    let addArray = [];
    let currentLevel = 1;
    for (var i = 0; i < passedObj[passedKey].length; i++) {
      passedObj.layerCount = passedObj[passedKey][i]._layer;
      if (passedObj[passedKey][i].parent > 0) {
        for (let j = 0; j < passedObj.layers.length; j++) {
          if (passedObj[passedKey][j].ind == passedObj[passedKey][i].parent) {
            if (passedObj[passedKey][i].tt > 0) {
              for (let k = i - 1; k >= 0; k--) {
                if (passedObj[passedKey][k].td > 0) {
                  passedObj[passedKey][i]._mask = `_${animationId}_${depth}_layerMask${passedObj[passedKey][k].ind}`;
                  break;
                }
              }
            }
            passedObj.layerCount++;
            addArray.push({"item": i, "level": currentLevel});

            if (!passedObj[passedKey][j]._addedToDom) {
              resolveParents(animationId, j, lastMaskId, passedObj, passedKey, depth, 1, addArray, currentLevel + 1);
            }
            passedObj[passedKey][i]._parent = passedObj[passedKey][j]._layer;
            passedObj[passedKey][i]._parentIdx = j;
            //if (passedObj[passedKey][i]._addedToDom != true) {
              passedObj[passedKey][i].domObj = {};
              passedObj[passedKey][i].domObj.newLayer = document.createElementNS(xmlns, 'g');
              passedObj[passedKey][i].domObj.newLayer.setAttribute('id', `${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`);
              passedObj[passedKey][i].domObj.newLayer.setAttribute('opacity', 1);
      
              //document
              //  .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._parent}`)
              //  .prepend(newLayer);
              passedObj[passedKey][i].domObj.newTranslateGroup = document.createElementNS(xmlns, 'g');
              passedObj[passedKey][i].domObj.newTranslateGroup.setAttribute(
                'id',
                `${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._layer}`,
              );
              passedObj[passedKey][i].domObj.newTranslateGroup.setAttribute('opacity', 1);
              //newLayer.prepend(newTranslateGroup);
              if (passedObj[passedKey][i].w > 0) {
                passedObj[passedKey][i].domObj.newLayer.style.width = passedObj[passedKey][i].w;
              }
              if (passedObj[passedKey][i].h > 0) {
                passedObj[passedKey][i].domObj.newLayer.style.height = passedObj[passedKey][i].h;
              }
              passedObj[passedKey][i].domObj.newGroup = document.createElementNS(xmlns, 'g');
              passedObj[passedKey][i].domObj.newGroup.setAttribute('id', `${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`);
              passedObj[passedKey][i].domObj.newGroup.setAttribute('opacity', 1);
              //newTranslateGroup.prepend(newGroup);

              passedObj[passedKey][i].domObj.newLayer.prepend(passedObj[passedKey][i].domObj.newTranslateGroup);
              passedObj[passedKey][i].domObj.newTranslateGroup.prepend(passedObj[passedKey][i].domObj.newGroup);
              //document
              //  .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._parent}`)
              //  .prepend(passedObj[passedKey][i].domObj.newLayer);

              passedObj[passedKey][i]._addedToDom = true;
              passedObj[passedKey][i].domObj.level = 1;
              passedObj[passedKey][i].processed = false;

              passedObj[passedKey][j]._child.push(`${animationId}_${depth}_layerGroup${passedObj[passedKey][i].parent}`);
              passedObj[passedKey][j]._childId.push(i);

            //}
          }
        }
      }
    }

    let itemsThisLevel = 1;
    let tempLevel = 1;
    while (itemsThisLevel > 0) {
      itemsThisLevel = 0;
      let tempArray = [];
      for (let j = 0; j < addArray.length; j++) {
        if (addArray[j].level == tempLevel) {
          tempArray.push(addArray[j].item);
          itemsThisLevel++;
        }
      }
      tempLevel++;
      tempArray.sort(function(a, b){return a-b});
      
      /*
      let tempHalf1 = [];
      let tempHalf2 = [];
      for (let i = 0; i < tempArray.length; i++) {
        if (passedObj[passedKey][tempArray[i]].ind <= passedObj[passedKey][passedObj[passedKey][tempArray[i]]._parentIdx].ind) {
          tempHalf1.push(tempArray[i]);
        } else {
          tempHalf2.push(tempArray[i]);
        }
      }
      tempHalf2.sort(function(a, b){return b-a});
      tempArray = [];
      tempArray = tempArray.concat(tempHalf1, tempHalf2);
      //tempArray.concat(tempHalf2);
      */
      
      if (itemsThisLevel > 0) {
        tempArray.forEach(i => {
            if (passedObj[passedKey][passedObj[passedKey][i]._parentIdx].hasOwnProperty('domObj')) {
              if (passedObj[passedKey][i].ind > passedObj[passedKey][passedObj[passedKey][i]._parentIdx].ind) {
                passedObj[passedKey][passedObj[passedKey][i]._parentIdx].domObj.newTranslateGroup.prepend(passedObj[passedKey][i].domObj.newLayer);
              } else {
                passedObj[passedKey][passedObj[passedKey][i]._parentIdx].domObj.newTranslateGroup.append(passedObj[passedKey][i].domObj.newLayer);
              }
            } else {
              if (passedObj[passedKey][i].ind >= passedObj[passedKey][i]._parent) {
                document
                  .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._parent}`)
                  .prepend(passedObj[passedKey][i].domObj.newLayer);
              } else {
                document
                  .getElementById(`${animationId}_${depth}_layerTranslate${passedObj[passedKey][i]._parent}`)
                  .append(passedObj[passedKey][i].domObj.newLayer);
              }
            }
          }
        );
      }
    }

    for (var i = 0; i < passedObj[passedKey].length; i++) {
      if (passedObj[passedKey][i].hasOwnProperty('domObj')) {
        delete passedObj[passedKey][i].domObj;
      }
    }

  //}


  for (var i = 0; i < passedObj.layers.length; i++) {
    passedObj[passedKey][i]._inPoint = -1;
    passedObj[passedKey][i]._outPoint = -1;
    if (passedObj[passedKey][i].hasOwnProperty('ip') && passedObj[passedKey][i].ip >= 0) {
      passedObj[passedKey][i]._inPoint = passedObj[passedKey][i].ip;
    }
    if (passedObj[passedKey][i].hasOwnProperty('op') && passedObj[passedKey][i].op > 0) {
      passedObj[passedKey][i]._outPoint = passedObj[passedKey][i].op;
      if (passedObj[passedKey][i]._outPoint > passedObj._totalFrames) {
        passedObj[passedKey][i]._outPoint = passedObj._totalFrames;
      }
    } else {
      passedObj[passedKey][i]._outPoint = passedObj._totalFrames;
    }
    stageSequence(
      animationId,
      `${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`,
      passedObj[passedKey][i]._inPoint,
      passedObj[passedKey][i]._outPoint,
    );

    passedObj.layerCount = passedObj[passedKey][i]._layer;
    newLayer = document.getElementById(`${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`);
    newGroup = document.getElementById(`${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`);
    if (passedObj[passedKey][i].tt > 0) {
      document
        .getElementById(`${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`)
        .setAttribute('mask', `url(#${passedObj[passedKey][i]._mask})`);
      document
        .getElementById(`${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`)
        .setAttribute('style', 'display: block;');
    }
    passedObj._currentLayer = { _layer: '', _inPoint: '', _outPoint: '' };
    //passedObj._currentLayer = passedObj[passedKey][i]._layer;
    passedObj._currentLayer._layer = passedObj[passedKey][i]._layer;
    passedObj._currentLayer._inPoint = passedObj[passedKey][i]._inPoint;
    passedObj._currentLayer._outPoint = passedObj[passedKey][i]._outPoint;
    if (passedObj[passedKey][i].hasOwnProperty('refId')) {
      let tempRef = -1;
      for (let m = 0; m < exports.animation[animationId].assets.length; m++) {
        if (exports.animation[animationId].assets[m].id == passedObj[passedKey][i].refId) {
          tempRef = m;
          break;
        }
      }
      if (tempRef >= 0) {
        var tempDepth = depth;
        exports.animation[animationId].assets[tempRef] = getLayers(
          elementId,
          animationId,
          newGroup,
          exports.animation[animationId].assets[tempRef],
          'layers',
          depth,
        );
        //animation[animationId].depth--;
        depth = tempDepth;
      }
    }

    if (passedObj[passedKey][i].hasOwnProperty('shapes')) {
      passedObj._currentLayerGroup = { _layer: 0, _inPoint: '', _outPoint: '' };
      //passedObj._currentLayerGroup = passedObj[passedKey][i]._layer;
      passedObj._currentLayerGroup._layer = passedObj[passedKey][i]._layer;
      passedObj._currentLayerGroup._inPoint = passedObj[passedKey][i]._inPoint;
      passedObj._currentLayerGroup._outPoint = passedObj[passedKey][i]._outPoint;
      passedObj[passedKey][i] = getShapes(
        elementId,
        animationId,
        passedObj[passedKey][i],
        newGroup,
        `${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`,
        false,
        passedObj[passedKey][i].td,
        depth,
      );
      if (passedObj[passedKey][i].hasOwnProperty('shapes')) {
        passedObj._boundingX = newGroup.getBoundingClientRect().width / 2;
        passedObj._boundingY = newGroup.getBoundingClientRect().height / 2;
      }
    } else if (passedObj[passedKey][i]._inPoint > 0) {
      // console.log("layer: " + i);
      // newLayer.style.display = 'none';
    }

    if (passedObj[passedKey][i].hasOwnProperty('ks')) {
      if (passedObj[passedKey][i].ks.hasOwnProperty('a')) {
        if (passedObj[passedKey][i].ks.a.hasOwnProperty('k')) {
          if (passedObj[passedKey][i].ks.a.k.length > 1) {
            passedObj[passedKey][i]._anchorX = passedObj[passedKey][i].ks.a.k[0];
            passedObj[passedKey][i]._anchorY = passedObj[passedKey][i].ks.a.k[1];
          }
        }
      }

      if (passedObj[passedKey][i].ks.hasOwnProperty('p')) {
        passedObj[passedKey][i].ks = getPosition(
          passedObj[passedKey][i].ks,
          null,
          'p',
          true,
          animationId,
          1,
          passedObj[passedKey][i],
          depth,
        );
        if (passedObj[passedKey][i].ks.p.hasOwnProperty('k')) {
          if (passedObj[passedKey][i].ks.p.k.length > 1) {
            if (passedObj[passedKey][i].ks.p.k[0].hasOwnProperty('s')) {
            } else {
              if (passedObj[passedKey][i]._anchorX != 0) {
                posX = passedObj[passedKey][i].ks.p.k[0] - passedObj[passedKey][i]._anchorX;
              } else {
                posX = passedObj[passedKey][i].ks.p.k[0]; // passedObj._boundingX;
              }
              if (passedObj[passedKey][i]._anchorY != 0) {
                posY = passedObj[passedKey][i].ks.p.k[1] - passedObj[passedKey][i]._anchorY;
              } else {
                posY = passedObj[passedKey][i].ks.p.k[1]; // passedObj._boundingY;
              }
              if (passedObj[passedKey][i].td > 0) {
                document
                  .getElementById(`${animationId}_${depth}_layerGroup${passedObj[passedKey][i]._layer}`)
                  .setAttribute('transform', `translate(${posX},${posY})`);
                  //.setAttribute('transform', `matrix(1,0,0,1,${posX},${posY})`);
              } else {
                document
                  .getElementById(`${animationId}_${depth}_layer${passedObj[passedKey][i]._layer}`)
                  .setAttribute('transform', `translate(${posX},${posY})`);
                  //.setAttribute('transform', `matrix(1,0,0,1,${posX},${posY})`);
              }
              passedObj[passedKey][i]._posX = posX;
              passedObj[passedKey][i]._posY = posY;
            }
          }
        }
      }

      if (passedObj[passedKey][i].ks.hasOwnProperty('r')) {
        if (passedObj[passedKey][i].ks.r.k.length > 1) {
          if (passedObj[passedKey][i].ks.r.k[0].hasOwnProperty('s')) {
            passedObj[passedKey][i].ks = getPosition(
              passedObj[passedKey][i].ks,
              null,
              'r',
              true,
              animationId,
              1,
              passedObj[passedKey][i],
              depth,
            );
          }
        }
      }
      if (passedObj[passedKey][i].ks.hasOwnProperty('s')) {
        if (passedObj[passedKey][i].ks.s.k.length > 1) {
          if (passedObj[passedKey][i].ks.s.k[0].hasOwnProperty('s')) {
            passedObj[passedKey][i].ks = getPosition(
              passedObj[passedKey][i].ks,
              null,
              's',
              true,
              animationId,
              1,
              passedObj[passedKey][i],
              depth,
            );
          }
        }
      }
      if (passedObj[passedKey][i].ks.hasOwnProperty('o')) {
        if (passedObj[passedKey][i].ks.o.k.length > 1) {
          if (passedObj[passedKey][i].ks.o.k[0].hasOwnProperty('s')) {
            passedObj[passedKey][i].ks = getPosition(
              passedObj[passedKey][i].ks,
              null,
              'o',
              true,
              animationId,
              1,
              passedObj[passedKey][i],
              depth,
            );
          }
        }
      }
    }
  }
  return passedObj;
}

/**
 * Scale layer objects relative to the animation window size - needed because some layers have much bigger defined window dimensions.
 * 
 * @param {string} elementId The 'id' attribute of the DOMElement 'elementObj'.
 * @param {integer} animationId The serial number of this animation.
 * @param {DOMElement} elementObj The DOMElement describing the first Lottie layer element in the animation.
 * @param {JSON} passedObj The object that has 'layers', shapes group ('gr'), or 'assets'.
 * @param {string} passedKey The name of the array, in 'passedObj', that lists the target layer objects.
 * @param {integer} depth The depth of the current iteration of layer objects.
 */
function scaleLayers(elementId, animationId, elementObj, passedObj, passedKey, depth) {
  var currentObj;
  //alert(animation[animationId].currScale);
  for (var i = 0; i < passedObj[passedKey].length; i++) {
    if (passedObj[passedKey][i].parent > 0) {
    } else {
      if (passedObj[passedKey][i].td > 0) {
      } else {
        if (passedObj[passedKey][i].hasOwnProperty("parent")) {
        } else {
          //alert(animationId + "_" + depth + "_layer" + passedObj[passedKey][i]._layer);
          currentObj = document.getElementById(animationId + "_" + depth + "_layer" + passedObj[passedKey][i]._layer);
          //currentObj.setAttributeNS(null, 'viewBox', `0 0 ${animation[animationId]._maxWidth} ${animation[animationId]._maxHeight}`);
          currentObj.setAttribute("transform", "scale(" + exports.animation[animationId]._currScale + ")");
        }
      }
    }
  }
}

/**
 * Initializes all the parameters for animation[animationId], which will contain the scene graph for this Lottie animation, before and after calling getLayers().
 * 
 * @param {*} elementId The 'id' attribute of the DOMElement 'elementObj'.
 * @param {*} animationId The serial number of this animation.
 * @param {*} elementObj The DOMElement in which the animation should be rendered.
 * @param {*} autoplay If 'true', then start playing the animation upon being loaded.
 * @param {*} loop If 'true', then the animation keeps looping.
 * @param {*} customName A custom name given to this Lottie animation - for future use.
 */
function buildGraph(elementId, animationId, elementObj, autoplay, loop, customName) {
  exports.animation[animationId]._loaded = false;
  //try {
    exports.animation[animationId].depth = 0;
    exports.animation[animationId].shapeCount = 0;
    exports.animation[animationId].layerCount = 0;
    exports.animation[animationId]._removed = false;
    exports.animation[animationId]._totalFrames = parseInt(exports.animation[animationId].op - exports.animation[animationId].ip);
    exports.animation[animationId]._frameTime = (1 / exports.animation[animationId].fr) * 1000;
    exports.animation[animationId]._currentFrame = -1;
    exports.animation[animationId]._lastTime = Date.now();
    exports.animation[animationId]._autoplay = autoplay;
    exports.animation[animationId]._loop = loop;
    exports.animation[animationId]._customName = customName;
    exports.animation[animationId]._paused = false;
    exports.animation[animationId]._maxWidth = 0;
    exports.animation[animationId]._maxHeight = 0;
    exports.animation[animationId]._skewW = 0;
    exports.animation[animationId]._skewH = 0;
    exports.animation[animationId]._currScale = 1;
    exports.animation[animationId]._lastFrame = 0;
    //animation[animationId]._nextInterval = animation[animationId]._frameTime;
    //animation[animationId]._timeout = 0;

    if (smallestFrameTime > exports.animation[animationId]._frameTime) {
      smallestFrameTime = exports.animation[animationId]._frameTime;
    }

    //for debugging
    exports.animation[animationId]._debugTimeElapsed = 0;
    exports.animation[animationId]._debugContainer = '';
    //////

    //elementObj.style.width = animation[animationId].w;
    //elementObj.style.height = animation[animationId].h;
    //elementObj.setAttribute('width', animation[animationId].w);
    //elementObj.setAttribute('height', animation[animationId].h);

    const newSVG = document.createElementNS(xmlns, 'svg');
    newSVG.setAttribute('xmlns', xmlns);
    // newSVG.setAttributeNS(null, 'width', animation[animationId].w);
    // newSVG.setAttributeNS(null, 'height', animation[animationId].h);
    newSVG.setAttributeNS(null, 'viewBox', `0 0 ${exports.animation[animationId].w} ${exports.animation[animationId].h}`);
    newSVG.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
    newSVG.style.width = '100%';
    newSVG.style.height = '100%';
    newSVG.setAttributeNS(null, 'id', `_svg${animationId}`);
    elementObj.prepend(newSVG);

    exports.animation[animationId].defs = document.createElementNS(xmlns, 'defs');
    exports.animation[animationId].defs.setAttributeNS(null, 'id', `_defs${animationId}`);
    exports.animation[animationId].gradientCount = 0;
    exports.animation[animationId].maskCount = 0;
    newSVG.prepend(exports.animation[animationId].defs);

    const newLayer = document.createElementNS(xmlns, 'g');
    newLayer.setAttributeNS(null, 'id', `_lanim${animationId}`);
    newSVG.append(newLayer);

    const newCompute = document.createElementNS(xmlns, 'g');
    newCompute.setAttributeNS(null, 'id', `_compute${animationId}`);
    newCompute.style.display = 'none';
    newLayer.prepend(newCompute);

    exports.animation[animationId]._scene = new Array(exports.animation[animationId]._totalFrames + 10)
      .fill(null)
      .map(() => ({ _transform: [] }));
    exports.animation[animationId]._instated = {};
    exports.animation[animationId]._refObj = [];
    exports.animation[animationId]._objSize = {};

    const clipPath = document.createElementNS(xmlns, 'clipPath');
    clipPath.setAttributeNS(null, 'id', `_clip${animationId}`);
    exports.animation[animationId].defs.prepend(clipPath);
    const clipPathRect = document.createElementNS(xmlns, 'rect');
    clipPathRect.setAttribute('x', 0);
    clipPathRect.setAttribute('y', 0);
    clipPathRect.setAttribute('width', exports.animation[animationId].w);
    clipPathRect.setAttribute('height', exports.animation[animationId].h);
    clipPath.append(clipPathRect);

    exports.animation[animationId] = getLayers(elementId, animationId, newLayer, exports.animation[animationId], 'layers', 0);

    if (exports.animation[animationId]._maxWidth > 0 || exports.animation[animationId]._maxHeight > 0) {
      var scaleW = exports.animation[animationId].w / exports.animation[animationId]._maxWidth;
      var scaleH = exports.animation[animationId].h / exports.animation[animationId]._maxHeight;
      //animation[animationId]._skewW = animation[animationId]

      //clipPathRect.setAttribute('x', 0);
      //clipPathRect.setAttribute('y', 0);
      //clipPathRect.setAttribute('width', animation[animationId]._maxWidth);
      //clipPathRect.setAttribute('height', animation[animationId]._maxHeight);
    
      if (scaleW > scaleH) {
        exports.animation[animationId]._currScale = scaleW;
      } else {
        exports.animation[animationId]._currScale = scaleH;
      }

      //newSVG.setAttributeNS(null, 'viewBox', `0 0 ${animation[animationId]._maxWidth} ${animation[animationId]._maxHeight}`);

      //newLayer.setAttribute("transform", "scale(" + animation[animationId]._currScale + ")");

      scaleLayers(elementId, animationId, newLayer, exports.animation[animationId], 'layers', 1);
    }

    newLayer.setAttributeNS(null, 'clip-path', `url(#_clip${animationId})`);
    exports.animation[animationId]._buildDone = true;
    animationLoading -= 1;
    exports.animation[animationId]._loaded = true;
    if (!exports.animation[animationId]._autoplay) {
      goToAndStop(1, '', exports.animation[animationId]._elementId);
    } else {
      loadFrame(animationId, 1);
    }
  /*} catch (e) {
		//console.error(`Failed to load animation.${e}`);
		animationCount = animationCount - 1;
		//elementObj.style.height = 0;
		//elementObj.style.width = 0;
		elementObj.innerHTML = "";
		animation.splice(animationId, 1);
    dispatchEvent(new CustomEvent("onLoadError", {bubbles: true, detail:{"error": e} }));
	}*/
}

/**
 * Load a Lottie JSON file from a URL and then pass to buildGraph().
 * 
 * @param {string} src A URL that points to a Lottie JSON file.
 * @param {DOMElement} domElement The DOMElement object in which the Lottie animation will be animated.
 * @param {string} elementId The 'id' of the DOMElement pointed to by 'domElement'.
 * @param {boolean} _autoplay If 'true', then start playing the animation upon being loaded.
 * @param {boolean} _loop If 'true', then the animation keeps looping.
 * @param {boolean} _debugAnimation If 'true', then display debug information.
 * @param {DOMElement} _debugContainer The DOMElement in which debug information is to be displayed.
 */
function getJson(
  src,
  domElement,
  elementId,
  _autoplay,
  _loop,
  _debugAnimation,
  _debugContainer,
) {
  const http = new XMLHttpRequest();
  http.open('GET', src, true);
  http.setRequestHeader('Access-Control-Allow-Origin', '*');
  http.withCredentials = false;
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      let received = http.responseText;
      if (received.search(/(^("|'))|(("|')$)/g) > -1) {
        received = received.replace(/(^("|'))|(("|')$)/g, "");
        received = received.replace(/\\"/g, '"');
      }
      exports.animationCount += 1;
      const currentAnimation = exports.animationCount;
      exports.animation[currentAnimation] = JSON.parse(received);
      exports.animation[currentAnimation]._elementId = elementId;

      if (_debugAnimation && typeof _debugContainer === 'object') {
        exports.animation[currentAnimation]._debugAnimation = _debugAnimation;
        exports.animation[currentAnimation]._debugContainer = _debugContainer;
        exports.animation[currentAnimation]._curFPS = 0;
        exports.animation[currentAnimation]._timeElapsed = 0;
        exports.animation[currentAnimation]._debugObj = document.createElement('div');
        exports.animation[currentAnimation]._debugObj.setAttribute('id', `__dbg__${currentAnimation}`);
        exports.animation[currentAnimation]._debugObj.style.display = 'block';
        _debugContainer.prepend(exports.animation[currentAnimation]._debugObj);
      }

      buildGraph(elementId, currentAnimation, domElement, _autoplay, _loop);
    }
  };
  http.send();
}

/// ////////// CONTROL

// var animationManager = (function () {
const jlottie = {};

/**
 * Destroys and unloads the animation indicated by 'name'.
 * 
 * @param {string} name The 'id' value of the container of this Lottie animation.
 */
function destroy(name) {
  if (exports.animationCount < 0) {
    return;
  }
  if (name === undefined) {
    const elements = [];
    for (var i = 0; i <= exports.animationCount; i++) {
      elements.push(exports.animation[i]._elementId);
    }
    exports.animation = [];
    for (var i = 0; i <= elements; i++) {
      document.getElementById(elements[i]).innerHTML = '';
      exports.animationCount -= 1;
    }
  } else {
    name.toString();
    name = name.replace(/#/g, '');
    for (var i = 0; i <= exports.animationCount; i++) {
      if (exports.animation[i]._elementId == name || exports.animation[i]._customName == name) {
        exports.animation.splice(i, 1);
        document.getElementById(name).innerHTML = '';
        exports.animationCount -= 1;
        break;
      }
    }
  }
}

/**
 * Plays the animation indicated by 'name'.
 * 
 * @param {string} name The 'id' value of the container of this Lottie animation.
 */
function play(name) {
  if (exports.animationCount < 0) {
    return;
  }
  if (name === undefined) {
    for (var i = 0; i <= exports.animationCount; i++) {
      exports.animation[i]._paused = false;
    }
  } else {
    name.toString();
    name = name.replace(/#/g, '');
    for (var i = 0; i <= exports.animationCount; i++) {
      if (exports.animation[i]._elementId == name || exports.animation[i]._customName == name) {
        exports.animation[i]._paused = false;
        break;
      }
    }
  }
}

/**
 * Pauses the animation indicated by 'name'.
 * 
 * @param {string} name The 'id' value of the container of this Lottie animation.
 */
 function pause(name) {
  if (name === undefined) {
    for (var i = 0; i <= exports.animationCount; i++) {
      exports.animation[i]._paused = true;
    }
  } else {
    name.toString();
    name = name.replace(/#/g, '');
    for (var i = 0; i <= exports.animationCount; i++) {
      if (exports.animation[i]._elementId == name || exports.animation[i]._customName == name) {
        exports.animation[i]._paused = true;
        break;
      }
    }
  }
}

/**
 * Stops the animation indicated by 'name'.
 * 
 * @param {string} name The 'id' value of the container of this Lottie animation.
 */
function stop(name) {
  goToAndStop(1, '', name);
}

/**
 * Stops the animation, goes to the specified frame and freezes there.
 * 
 * @param {integer} _frame The frame number.
 * @param {boolean} isFrame Indicates whether '_frame' represents time in number of frames (true) or milliseconds (false) - this is currently not implemented.
 * @param {string} name The 'id' value of the container of this Lottie animation.
 * 
 */
function goToAndStop(_frame, isFrame, name) {
  if (exports.animationCount < 0) {
    return;
  }
  if (name === undefined) {
    for (var i = 0; i <= exports.animationCount; i++) {
      exports.animation[i]._paused = true;
      exports.animation[i]._currentFrame = _frame;
      loadFrame(i, _frame);
    }
  } else {
    name.toString();
    name = name.replace(/#/g, '');
    for (var i = 0; i <= exports.animationCount; i++) {
      if (exports.animation[i]._elementId == name || exports.animation[i]._customName == name) {
        exports.animation[i]._paused = true;
        exports.animation[i]._currentFrame = _frame;
        loadFrame(i, _frame);
        break;
      }
    }
  }
}

/** 
  * Lottie animation loader for jlottie.
  *
  * @param {JSON} obj Includes parameters that dictate how a Lottie is loaded.
  * @param {DOMElement} obj.container A DOMElement object that will be used as the container for the Lottie animation.
  * @param {boolean} obj.autoplay Instructs jlottie to immediately play the Lottie after it is loaded.
  * @param {boolean} obj.loop Instructs jlottie to keep looping this animation.
  * @param {boolean} obj.debugAnimation Instructs jlottie to display debug information (currently limited to just FPS data).
  * @param {boolean} obj.debugContainer A DOMElement in which the debug data will be displayed.
  *
  */
function loadAnimation(obj) {
  if (obj.container === undefined && obj.path === undefined && obj.animationData === undefined) {
    return;
  }
  let autoplay = true;
  let loop = true;
  let debugAnimation = false;
  let debugContainer;


  if (!(obj.autoplay === undefined)) {
    if (obj.autoplay === true || obj.autoplay === false) {
      autoplay = obj.autoplay;
    }
  }

  if (!(obj.loop === undefined)) {
    if (obj.loop === true || obj.loop === false) {
      loop = obj.loop;
    }
  }

  if (!(obj.debug === undefined)) {
    if (obj.debug === true) {
      if (typeof obj.debugContainer != 'undefined') {
        debugAnimation = true;
        debugContainer = obj.debugContainer;
      }
    }
  }

  if (!(obj.animationData === undefined) && obj.animationData.length > 0) {
    exports.animationCount += 1;
    const currentAnimation = exports.animationCount;
    exports.animation[currentAnimation] = JSON.parse(obj.animationData);
    exports.animation[currentAnimation]._elementId = elementId;
    buildGraph(elementId, currentAnimation, obj.container, autoplay, loop);
  } else if (!(obj.path === undefined) && obj.path) {
    getJson(
      obj.path,
      obj.container,
      obj.container.id,
      autoplay,
      loop,
      debugAnimation,
      debugContainer,
    );
  }
  if (!playStarted) {
    playStarted = true;
    window.requestAnimationFrame(lottiemate);
  }
}

exports.addGroupPositionTransform = addGroupPositionTransform;
exports.arcLength = arcLength;
exports.bezierCurve = bezierCurve;
exports.buildGraph = buildGraph;
exports.createGradientDef = createGradientDef;
exports.destroy = destroy;
exports.extrapolateOffsetKeyframe = extrapolateOffsetKeyframe;
exports.extrapolatePathPosition = extrapolatePathPosition;
exports.extrapolateValueKeyframe = extrapolateValueKeyframe;
exports.findChildren = findChildren;
exports.findExistingTransform = findExistingTransform;
exports.getColorString = getColorString;
exports.getEmptyFillTransform = getEmptyFillTransform;
exports.getEmptyStageTransform = getEmptyStageTransform;
exports.getEmptyTransform = getEmptyTransform;
exports.getJson = getJson;
exports.getLayers = getLayers;
exports.getPosition = getPosition;
exports.getShapes = getShapes;
exports.getShapesGr = getShapesGr;
exports.getStrokeString = getStrokeString;
exports.goToAndStop = goToAndStop;
exports.loadAnimation = loadAnimation;
exports.loadFrame = loadFrame;
exports.lottiemate = lottiemate;
exports.pause = pause;
exports.play = play;
exports.prepDataString = prepDataString;
exports.prepShape = prepShape;
exports.prepShapeEl = prepShapeEl;
exports.prepShapeElKeyframe = prepShapeElKeyframe;
exports.prepShapeRc = prepShapeRc;
exports.prepShapeRcKeyframe = prepShapeRcKeyframe;
exports.prepShapeSh = prepShapeSh;
exports.prepShapeShKeyframe = prepShapeShKeyframe;
exports.prepShapeSr = prepShapeSr;
exports.prepShapeSrKeyframe = prepShapeSrKeyframe;
exports.resolveParents = resolveParents;
exports.scaleLayers = scaleLayers;
exports.setShapeColors = setShapeColors;
exports.setShapeStrokes = setShapeStrokes;
exports.stageSequence = stageSequence;
exports.stop = stop;
//# sourceMappingURL=jlottie.cjs.js.map
