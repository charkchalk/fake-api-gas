import Service from "./service";

export default class OrganizationService extends Service<RawOrganization> {
  public constructor() {
    super("Organizations");
  }

  public matches(data: string[], value: string): boolean {
    return (
      data[1].toLowerCase().includes(value.toLowerCase()) ||
      data[2].toLowerCase().includes(value.toLowerCase())
    );
  }

  public buildData(data: string[]): RawOrganization {
    const [uuid, name, description, parentId] = data;
    const parent = parentId ? this.get(parentId) : null;

    return {
      uuid,
      name,
      description,
      parent,
    };
  }
}
