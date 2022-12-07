export default class Pokemon{
  constructor(name, entry, areaIndex) {
    this.name = name || "Missingno";
    this.entry = entry || "";
    this.areaIndex = areaIndex || -1;
  }
}
