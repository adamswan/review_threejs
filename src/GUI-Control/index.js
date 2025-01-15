import * as dat from "dat.gui";
import { AmbientLight } from "three";

const basicType = {
  // 颜色
  color: {
    method: "addColor",
    getValue: function (item) {
      return item.color.getStyle();
    },
    setValue: function (item, value) {
      item.color.setStyle(value);
    },
  },

  // 光照强度
  intensity: {
    // method: "add",
    extends: [0, 10],
    getValue: function (item) {
      return item.intensity;
    },
    setValue: function (item, value) {
      item.intensity = Number(value);
    },
  },

  // 光源到光源结束的距离
  distance: {
    // method: "add",
    extends: [0, 2],
    getValue: function (item) {
      return item.distance;
    },
    setValue: function (item, value) {
      item.distance = Number(value);
    },
  },

  // 光源散射角度
  angle: {
    // method: "add",
    extends: [0, Math.PI / 2],
    getValue: function (item) {
      return item.angle;
    },
    setValue: function (item, value) {
      item.angle = Number(value);
    },
  },

  // 沿光照距离的衰退量
  exponent: {
    // method: "add",
    extends: [0, 20],
    getValue: function (item) {
      return item.exponent;
    },
    setValue: function (item, value) {
      item.exponent = Number(value);
    },
  },
};

const itemTypes = {
  SpotLight: ["color", "intensity", "distance", "angle"], // 点光源
  AmbientLight: ["color"], // 环境光
};

export function initGUIControl(item) {
  const typeList = itemTypes[item.type];

  const controls = {};

  if (typeList.length === 0) {
    return;
  }

  const GUI = new dat.GUI();


  for (let i = 0; i < typeList.length; i++) {
    let child = basicType[typeList[i]];

    if (child) {
      controls[typeList[i]] = child.getValue(item);

      const childExtends = child.extends || [];
        console.log('child.method', child.method)
      GUI[child.method || "add"](
        controls,
        typeList[i],
        ...childExtends
      ).onChange(function (value) {
        child.setValue(item, value);
      });
    }
  }
}
