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

  public isDataValid(data: string[]): boolean {
    return data[1] !== "";
  }

  public buildData(data: string[]): RawPerson {
    const [id, name, description, link] = data;

    return { id, name, description, link };
  }
}
