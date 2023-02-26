import Service from "./service";

export default class OrganizationService extends Service<RawOrganization> {
  public constructor() {
    super("Organizations");
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
