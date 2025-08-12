import { Category } from "./types";

export default class CategoryModel implements Category {
  name: string;
  color: string

  constructor(name: string, color: string) {
    this.name = name
    this.color = color
  }
  static fromJson(json: any): Category {
    if (typeof json !== "object" || json === null) throw new Error("Invalid JSON: not an object");
    if (typeof json.name !== "string") throw new Error("Invalid JSON: 'name' must be a string");
    if (typeof json.color !== "string") throw new Error("Invalid JSON: 'color' must be a string");

    return new CategoryModel(json.name, json.color);
  }
}
