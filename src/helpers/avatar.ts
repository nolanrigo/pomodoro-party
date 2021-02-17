import {
  Avatar,
  AvatarAccessories,
  AvatarClothe,
  AvatarClotheColor,
  AvatarEye,
  AvatarEyebrow,
  AvatarFacialHair,
  AvatarFacialHairColor,
  AvatarGraphic,
  AvatarHairColor,
  AvatarMouth,
  AvatarSkinColor,
  AvatarStyle,
  AvatarTop,
} from "../models/participant";

export function generateAvatar(): Avatar {
  return {
    style: AvatarStyle.Transparent,
    top: randomRecord(AvatarTop),
    accessories: randomRecord(AvatarAccessories),
    hairColor: randomRecord(AvatarHairColor),
    facialHair: randomRecord(AvatarFacialHair),
    facialHairColor: randomRecord(AvatarFacialHairColor),
    clothe: randomRecord(AvatarClothe),
    clotheColor: randomRecord(AvatarClotheColor),
    graphic: randomRecord(AvatarGraphic),
    eye: randomRecord(AvatarEye),
    eyebrow: randomRecord(AvatarEyebrow),
    mouth: randomRecord(AvatarMouth),
    skinColor: randomRecord(AvatarSkinColor),
  };
}

function randomRecord<V>(record: Record<any, V>): V {
  const values = Object.values(record);

  return values[Math.floor(Math.random() * values.length)];
}
