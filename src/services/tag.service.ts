import Service from "./service";

export default class TagService extends Service<RawTag> {
  public constructor() {
    super("Tags");
  }

  public isDataValid(data: string[]): boolean {
    return data[1] !== "";
  }

  public buildData(data: string[]): RawTag {
    const [id, name, description] = data;

    return {
      id,
      name,
      description,
    };
  }
}
