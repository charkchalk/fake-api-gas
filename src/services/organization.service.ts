import Service from "./service";

export default class OrganizationService extends Service<RawOrganization> {
  public constructor() {
    super("Organizations");
  }

  public isDataValid(data: string[]): boolean {
    return data[1] !== "";
  }

  public buildData(data: string[]): RawOrganization {
    const [id, name, description] = data;

    return {
      id,
      name,
      description,
    };
  }
}
