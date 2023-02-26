import CoursesPersonsRelationService from "./relation-services/courses-persons.relation-service";
import DateRangeService from "./services/date-range.service";
import OrganizationService from "./services/organization.service";
import PersonService from "./services/person.service";
import PlaceService from "./services/place.service";
import RelationService from "./relation-services/relation-service";
import TagService from "./services/tag.service";
import TimeRangeService from "./services/time-range.service";
import CoursesPlacesRelationService from "./relation-services/courses-places.relation-service";
import CoursesTimeRangesRelationService from "./relation-services/courses-timeRanges.relation-service";

export default class ServiceManager {
  public services: Service[] = [];
  public relationServices: RelationService[] = [];

  public constructor() {
    this.services.push(new DateRangeService());
    this.services.push(new OrganizationService());
    this.services.push(new PersonService());
    this.services.push(new PlaceService());
    this.services.push(new TagService());
    this.services.push(new TimeRangeService());

    this.relationServices.push(new CoursesPersonsRelationService());
    this.relationServices.push(new CoursesPlacesRelationService());
    this.relationServices.push(new CoursesTimeRangesRelationService());
  }

  public getService<T>(name: string): Service<T> {
    const service = this.services.find(service =>
      service.tableName.includes(name),
    );
    if (!service) throw new Error("Service not found");
    return service as Service<T>;
  }

  public getRelationService(name: string): RelationService {
    const service = this.relationServices.find(service =>
      service.tableName.includes(name),
    );
    if (!service) throw new Error("Service not found");
    return service as RelationService;
  }
}
