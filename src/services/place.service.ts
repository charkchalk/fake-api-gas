import Service from "./service";

export default class PlaceService extends Service<RawPlace> {
  public constructor() {
    super("Places");
  }

  public matches(data: string[], value: string): boolean {
    return data[1].toLowerCase().includes(value.toLowerCase());
  }

  public buildData(data: string[]): RawPlace {
    const [uuid, name, parentId] = data;
    const parent = parentId ? this.get(parentId) : null;

    return { uuid, name, parent };
  }
}
