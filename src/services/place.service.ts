import Service from "./service";

export default class PlaceService extends Service<RawPlace> {
  public constructor() {
    super("Places");
  }

  public buildData(data: string[]): RawPlace {
    const [id, name, parentId] = data;
    const parent = parentId ? this.get(parentId) : null;

    return { id, name, parent };
  }
}
