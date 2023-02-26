import DateRangeService from "./services/date-range.service";
import OrganizationService from "./services/organization.service";
import PersonService from "./services/person.service";
import PlaceService from "./services/place.service";
import TagService from "./services/tag.service";
import TimeRangeService from "./services/time-range.service";

export default class ServiceManager {
  public services: Service[] = [];

  public constructor() {
    this.services.push(new DateRangeService());
    this.services.push(new OrganizationService());
    this.services.push(new PersonService());
    this.services.push(new PlaceService());
    this.services.push(new TagService());
    this.services.push(new TimeRangeService());
  }

  public getService<T>(name: string): Service<T> {
    const service = this.services.find(service =>
      service.tableName.includes(name),
    );
    if (!service) throw new Error("Service not found");
    return service as Service<T>;
  }
}
