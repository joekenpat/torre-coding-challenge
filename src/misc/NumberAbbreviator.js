export default function NumberAbbreviator(number) {
  let SI_SYMBOL = ["", "k+", "M", "G", "T", "P", "E"];
  let tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier === 0) return number;
  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);
  let scaled = number / scale;
  return scaled.toFixed(1) + suffix;
}
