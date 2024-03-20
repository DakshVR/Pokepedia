export function convertHeightToFeetAndInches(height) {
  const totalInches = height * 3.93701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet} ft ${inches} in`;
}

export function convertWeightToPounds(weight) {
  return Math.round(weight * 0.220462);
}

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getTypeColor = (type) => {
  const typeColors = {
    fire: "#FDDFDF",
    water: "#DEF3FD",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    psychic: "#EAEDA1",
    normal: "#F5F5F5",
    dragon: "#97b3e6",
    fairy: "#f7c6ef",
    fighting: "#8b5d5a",
    rock: "#867d7d",
    ground: "orange",
    bug: "#b8f870",
    poison: "#cea5f7",
    ghost: "#866db6",
    ice: "#6ac6de",
    flying: "lightblue",
  };
  return typeColors[type.toLowerCase()] || "#F5F5F5";
};