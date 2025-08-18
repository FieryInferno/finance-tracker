import { Category } from "./types";

export default class CategoryModel implements Category {
  name: string;
  color: string
  id_category: string;

  constructor(id_category: string, name: string, color: string) {
    this.id_category = id_category;
    this.name = name
    this.color = color
  }
  static fromJson(json: any): Category {
    if (typeof json !== "object" || json === null) throw new Error("Invalid JSON: not an object");
    if (typeof json.name !== "string") throw new Error("Invalid JSON: 'name' must be a string");
    if (typeof json.color !== "string") throw new Error("Invalid JSON: 'color' must be a string");
    if (typeof json.id_category !== "string") throw new Error("Invalid JSON: 'id_category' must be a string");

    return new CategoryModel(json.id_category, json.name, json.color);
  }
}
