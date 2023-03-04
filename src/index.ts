import * as Route from "route-parser";
import ServiceManager from "./service.manager";

global.doGet = function (
  event: GoogleAppsScript.Events.DoGet,
): GoogleAppsScript.Content.TextOutput {
  const serviceManager = new ServiceManager();
  const routes: RouteHandler[] = [
    {
      route: "course/:id",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
        urlParams: { [k: string]: string },
      ): RawCourse | null => {
        const service = serviceManager.getService<RawCourse>("Courses");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "range/date/:id",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
        urlParams: { [k: string]: string },
      ): RawDateRange | null => {
        const service = serviceManager.getService<RawDateRange>("DateRange");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "range/date",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
      ): (RawDateRange | null)[] => {
        const service = serviceManager.getService<RawDateRange>("DateRange");
        const items = service.getAll(pagination, params);
        return items;
      },
    },
    {
      route: "organization/:id",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
        urlParams: { [k: string]: string },
      ): RawOrganization | null => {
        const service =
          serviceManager.getService<RawOrganization>("Organization");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "organization",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
      ): (RawOrganization | null)[] => {
        const service =
          serviceManager.getService<RawOrganization>("Organization");
        const items = service.getAll(pagination, params);
        return items;
      },
    },
    {
      route: "person/:id",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
        urlParams: { [k: string]: string },
      ): RawPerson | null => {
        const service = serviceManager.getService<RawPerson>("Persons");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "person",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
      ): (RawPerson | null)[] => {
        const service = serviceManager.getService<RawPerson>("Persons");
        const items = service.getAll(pagination, params);
        return items;
      },
    },
    {
      route: "place/:id",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
        urlParams: { [k: string]: string },
      ): RawPlace | null => {
        const service = serviceManager.getService<RawPlace>("Places");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "place",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
      ): (RawPlace | null)[] => {
        const service = serviceManager.getService<RawPlace>("Places");
        const items = service.getAll(pagination, params);
        return items;
      },
    },
    {
      route: "tag/:id",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
        urlParams: { [k: string]: string },
      ): RawTag | null => {
        const service = serviceManager.getService<RawTag>("Tags");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "tag",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
      ): (RawTag | null)[] => {
        const service = serviceManager.getService<RawTag>("Tags");
        const items = service.getAll(pagination, params);
        return items;
      },
    },
    {
      route: "range/time/:id",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
        urlParams: { [k: string]: string },
      ): RawTimeRange | null => {
        const service = serviceManager.getService<RawTimeRange>("TimeRange");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "range/time",
      handler: (
        pagination: CanPaginate,
        params: Record<string, string>,
      ): (RawTimeRange | null)[] => {
        const service = serviceManager.getService<RawTimeRange>("TimeRange");
        const items = service.getAll(pagination, params);
        return items;
      },
    },
  ];

  for (const route of routes) {
    const match = new Route(route.route).match(event.parameter.path);
    if (!match) continue;

    const size = parseInt(event.parameter.size ?? 10);
    const page = parseInt(event.parameter.page ?? 1);

    const result = route.handler({ size, page }, event.parameter, match);
    if (!result) {
      return ContentService.createTextOutput(
        JSON.stringify({
          code: "404",
          description: "No corresponding data found in collection.",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const total = Array.isArray(result) ? Math.ceil(result.length / size) : 1;

    const response: StandardResponse = {
      content: Array.isArray(result)
        ? result.filter(value => value !== null)
        : result,
      pagination: { total, current: page },
    };

    return ContentService.createTextOutput(
      JSON.stringify(response),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    JSON.stringify({
      code: "404",
      description: "No any route matched.",
      data: event.pathInfo,
    }),
  ).setMimeType(ContentService.MimeType.JSON);
};

global.doPost = function (
  event: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput {
  const serviceManager = new ServiceManager();
  const routes = [
    {
      route: "course/search",
      handler: (
        pagination: CanPaginate,
        postData: unknown,
      ): (RawCourse | null)[] => {
        const service = serviceManager.getService<RawCourse>("Courses");
        const items = service.getAll(pagination, postData);
        return items;
      },
    },
  ];

  for (const route of routes) {
    const match = new Route(route.route).match(event.parameter.path);
    if (!match) continue;

    const size = parseInt(event.parameter.size ?? 10);
    const page = parseInt(event.parameter.page ?? 1);
    const postData = JSON.parse(event.postData.contents);

    const result = route.handler({ size, page }, postData);
    if (!result) {
      return ContentService.createTextOutput(
        JSON.stringify({
          code: "404",
          description: "No corresponding data found in collection.",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const total = Array.isArray(result) ? Math.ceil(result.length / size) : 1;

    const response: StandardResponse = {
      content: Array.isArray(result)
        ? result.filter(value => value !== null)
        : result,
      pagination: { total, current: page },
    };

    // Logger.log(response);
    return ContentService.createTextOutput(
      JSON.stringify(response),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    JSON.stringify({
      code: "404",
      description: "No any route matched.",
      data: event.pathInfo,
    }),
  ).setMimeType(ContentService.MimeType.JSON);
};
