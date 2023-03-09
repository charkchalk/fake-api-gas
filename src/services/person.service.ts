import Service from "./service";

export default class PersonService extends Service<RawPerson> {
  public constructor() {
    super("Persons");
  }

  public matches(data: string[], value: string): boolean {
    return (
      data[1].toLowerCase().includes(value.toLowerCase()) ||
      data[2].toLowerCase().includes(value.toLowerCase())
    );
  }

  public buildData(data: string[]): RawPerson {
    const [uuid, name, description, link] = data;

    return { uuid, name, description, link };
  }
}
