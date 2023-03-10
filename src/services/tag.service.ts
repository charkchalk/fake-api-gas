import Service from "./service";

export default class TagService extends Service<RawTag> {
  public constructor() {
    super("Tags");
  }

  public matches(data: string[], value: string): boolean {
    return (
      data[1].toLowerCase().includes(value.toLowerCase()) ||
      data[2].toLowerCase().includes(value.toLowerCase())
    );
  }

  public buildData(data: string[]): RawTag {
    const [uuid, name, description] = data;

    return {
      uuid,
      name,
      description,
    };
  }
}
