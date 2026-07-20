#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const data = require("./piece-descriptions-fr.js");

function parseFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const re = /const piecesData\s*=\s*(\[[\s\S]*?\]);/;
  const m = code.match(re);
  if (!m) throw new Error("piecesData introuvable: " + filePath);
  const piecesData = eval(m[1]);
  const before = code.slice(0, m.index);
  const after = code.slice(m.index + m[0].length);
  return { piecesData, before, after };
}

function toJsLiteral(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (obj === null) return "null";
  if (Array.isArray(obj)) {
    if (obj.length && typeof obj[0] === "number") return JSON.stringify(obj);
    if (obj.length && Array.isArray(obj[0])) {
      return "[\n" + obj.map((row) => padIn + JSON.stringify(row)).join(",\n") + "\n" + pad + "]";
    }
    return JSON.stringify(obj);
  }
  if (typeof obj === "object") {
    const keys = Object.keys(obj);
    const lines = keys.map((k) => padIn + k + ": " + toJsLiteral(obj[k], indent + 1));
    return "{\n" + lines.join(",\n") + "\n" + pad + "}";
  }
  return JSON.stringify(obj);
}

function normalizeImage(img, isVgb) {
  if (!img) return img;
  if (isVgb) return img.replace(/^public\/images\//, "/images/");
  return img.replace(/^\/images\//, "public/images/");
}

function applyFile(filePath, isVgb) {
  const { piecesData, before, after } = parseFile(filePath);

  for (const piece of piecesData) {
    const key = piece.nameKey;
    if (data.descriptions[key]) {
      let desc = data.descriptions[key].trim();
      if (data.abilities[key]) desc += " " + data.abilities[key].trim();
      piece.description = desc;
    }
    if (data.abilities[key]) {
      piece.abilityDesc = data.abilities[key];
      piece.abilityKey = key + "-ability";
    }
    if (data.uniqueRoleUpdates[key]) {
      Object.assign(piece, data.uniqueRoleUpdates[key]);
    }
    piece.image = normalizeImage(piece.image, isVgb);
  }

  const bowser = piecesData.find((p) => p.nameKey === "bowser");
  if (bowser) {
    bowser.image = isVgb
      ? "/images/nintendo/characters/bowser-placeholder.png"
      : "public/images/nintendo/characters/bowser-placeholder.png";
  }
  const egg = piecesData.find((p) => p.nameKey === "dr-robotnik");
  if (egg) {
    egg.image = isVgb
      ? "/images/sega/characters/dr.robotnik-placeholder.png"
      : "public/images/sega/characters/dr.robotnik-placeholder.png";
  }

  if (!piecesData.some((p) => p.nameKey === "pikachu")) {
    const pika = Object.assign({}, data.pikachuNewPiece);
    pika.description = data.descriptions.pikachu.trim() + " " + data.abilities.pikachu.trim();
    pika.image = isVgb
      ? "/images/nintendo/characters/pikachu-placeholder.png"
      : "public/images/nintendo/characters/pikachu-placeholder.png";
    const idx = piecesData.findIndex((p) => p.nameKey === "mewtwo");
    if (idx >= 0) piecesData.splice(idx + 1, 0, pika);
    else piecesData.push(pika);
  }

  const body = "const piecesData = " + toJsLiteral(piecesData) + ";\n";
  fs.writeFileSync(filePath, before + body + after.replace(/^\s*;?\s*/, ""));
  console.log("OK", filePath, piecesData.length);
}

const root = path.join(__dirname, "..");
applyFile(path.join(root, "public/data/pieces.js"), false);
applyFile(path.join(root, "vgb/public/data/pieces.js"), true);
