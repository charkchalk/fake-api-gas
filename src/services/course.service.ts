import ServiceManager from "../service.manager";
import Service from "./service";

export default class CourseService extends Service<RawCourse> {
  public constructor(private serviceManager: ServiceManager) {
    super("Courses");
  }

  public isDataValid(data: string[]): boolean {
    return data[2] !== "";
  }

  public buildData(data: string[]): RawCourse {
    const [
      id,
      code,
      name,
      description,
      typeId,
      credit,
      organizationId,
      dateRangeId,
      link,
    ] = data;

    const type = this.serviceManager.getService<RawTag>("Tags").get(typeId);
    const organization = this.serviceManager
      .getService<RawOrganization>("Organizations")
      .get(organizationId);
    const dateRange = this.serviceManager
      .getService<RawDateRange>("DateRanges")
      .get(dateRangeId);
    const hosts = this.getHosts(id);
    const places = this.getPlaces(id);
    const timeRanges = this.getTimeRanges(id);

    return {
      id,
      code,
      name,
      description,
      type,
      credit: parseInt(credit, 10),
      organization,
      dateRange,
      link,
      hosts,
      places,
      timeRanges,
    };
  }

  private getHostIds(courseId: string): string[] {
    const keys = this.serviceManager
      .getRelationService("Courses-Persons")
      .getBy("Course", courseId);

    return keys.map(key => key.Person);
  }

  public getHosts(courseId: string): RawPerson[] {
    const personService = this.serviceManager.getService<RawPerson>("Persons");
    const personIds = this.getHostIds(courseId);
    const persons = personIds
      .map(personId => personService.get(personId))
      .filter(person => !!person);

    return persons as RawPerson[];
  }

  private getPlaceIds(courseId: string): string[] {
    const keys = this.serviceManager
      .getRelationService("Courses-Places")
      .getBy("Course", courseId);

    return keys.map(key => key.Place);
  }

  public getPlaces(courseId: string): RawPlace[] {
    const placeService = this.serviceManager.getService<RawPlace>("Places");
    const placeIds = this.getPlaceIds(courseId);
    const places = placeIds
      .map(placeId => placeService.get(placeId))
      .filter(place => !!place);

    return places as RawPlace[];
  }

  public getTimeRangeIds(courseId: string): string[] {
    const keys = this.serviceManager
      .getRelationService("Courses-TimeRanges")
      .getBy("Course", courseId);

    return keys.map(key => key.TimeRange);
  }

  public getTimeRanges(courseId: string): RawTimeRange[] {
    const timeRangeService =
      this.serviceManager.getService<RawTimeRange>("TimeRanges");
    const timeRangeIds = this.getTimeRangeIds(courseId);
    const timeRanges = timeRangeIds
      .map(timeRangeId => timeRangeService.get(timeRangeId))
      .filter(timeRange => !!timeRange);

    return timeRanges as RawTimeRange[];
  }
}
