import ServiceManager from "../service.manager";
import Service from "./service";

export default class CourseService extends Service<RawCourse> {
  public constructor(private serviceManager: ServiceManager) {
    super("Courses");
  }

  public getAll(
    pagination: CanPaginate,
    postData: QueryItem[],
  ): (RawCourse | null)[] {
    const data = this.sheet.getDataRange().getDisplayValues();
    const courses = data.slice(1).map((values, index) => {
      if (index < (pagination.page - 1) * pagination.size) return null;
      if (index >= pagination.page * pagination.size) return null;

      const data = this.buildData(values, postData);

      return data;
    });

    return courses;
  }

  public isDataValid(data: string[]): boolean {
    return data[2] !== "";
  }

  public isMatch(
    data: string | string[],
    method: "=" | "!=",
    queries: QueryItem[],
    compareMethod: (data: string | string[], query: string) => boolean,
  ): boolean {
    for (const query of queries) {
      const matches = query.value.map(value => compareMethod(data, value));
      switch (method) {
        case "=":
          if (!matches.includes(true)) return false;
          break;
        case "!=":
          if (matches.includes(true)) return false;
          break;
      }
    }
    return true;
  }

  public buildData(data: string[], postData: QueryItem[]): RawCourse | null {
    const [
      courseId,
      code,
      name,
      description,
      typeId,
      credit,
      organizationId,
      dateRangeId,
      link,
    ] = data;

    const keywordQueries = postData.filter(query => query.key === "keyword");
    if (
      keywordQueries.length > 0 &&
      !this.isMatch(name, "=", keywordQueries, (data, query) =>
        data.includes(query),
      )
    )
      return null;

    const organizationQueries = postData.filter(
      query => query.key === "organization",
    );
    if (
      organizationQueries.length > 0 &&
      !this.isMatch(
        organizationId,
        "=",
        organizationQueries,
        (data, query) => data === query,
      )
    )
      return null;

    const dateRangeQueries = postData.filter(
      query => query.key === "dateRange",
    );
    if (
      dateRangeQueries.length > 0 &&
      !this.isMatch(
        dateRangeId,
        "=",
        dateRangeQueries,
        (data, query) => data === query,
      )
    )
      return null;

    const type = this.serviceManager.getService<RawTag>("Tags").get(typeId);
    const organization = this.serviceManager
      .getService<RawOrganization>("Organizations")
      .get(organizationId);
    const dateRange = this.serviceManager
      .getService<RawDateRange>("DateRanges")
      .get(dateRangeId);

    const hostIds = this.getHostIds(courseId);
    const hostQueries = postData.filter(query => query.key === "host");
    if (
      hostQueries.length > 0 &&
      !this.isMatch(hostIds, "=", hostQueries, (data, query) =>
        data.includes(query),
      )
    )
      return null;

    const hosts = this.getHosts(hostIds);
    const places = this.getPlaces(courseId);
    const timeRanges = this.getTimeRanges(courseId);

    return {
      id: courseId,
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

  public getHosts(personIds: string[]): RawPerson[] {
    const personService = this.serviceManager.getService<RawPerson>("Persons");
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
