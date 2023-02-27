import * as Route from "route-parser";
import ServiceManager from "./service.manager";

global.doGet = function (
  event: GoogleAppsScript.Events.AppsScriptHttpRequestEvent,
): void {
  Logger.log("Starting...");

  const serviceManager = new ServiceManager();
  const routes = [
    {
      route: "/course/:id",
      handler: (
        params: { [key: string]: string[] },
        urlParams: { [k: string]: string },
      ): RawCourse | null => {
        const service = serviceManager.getService<RawCourse>("Courses");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "/course",
      handler: (): RawCourse[] => {
        const service = serviceManager.getService<RawCourse>("Courses");
        const items = service.getAll();
        return items;
      },
    },
    {
      route: "/range/date/:id",
      handler: (
        params: { [key: string]: string[] },
        urlParams: { [k: string]: string },
      ): RawDateRange | null => {
        const service = serviceManager.getService<RawDateRange>("DateRange");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "/range/date",
      handler: (): RawDateRange[] => {
        const service = serviceManager.getService<RawDateRange>("DateRange");
        const items = service.getAll();
        return items;
      },
    },
    {
      route: "/organization/:id",
      handler: (
        params: { [key: string]: string[] },
        urlParams: { [k: string]: string },
      ): RawOrganization | null => {
        const service =
          serviceManager.getService<RawOrganization>("Organization");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "/organization",
      handler: (): RawOrganization[] => {
        const service =
          serviceManager.getService<RawOrganization>("Organization");
        const items = service.getAll();
        return items;
      },
    },
    {
      route: "/person/:id",
      handler: (
        params: { [key: string]: string[] },
        urlParams: { [k: string]: string },
      ): RawPerson | null => {
        const service = serviceManager.getService<RawPerson>("Persons");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "/person",
      handler: (): RawPerson[] => {
        const service = serviceManager.getService<RawPerson>("Persons");
        const items = service.getAll();
        return items;
      },
    },
    {
      route: "/place/:id",
      handler: (
        params: { [key: string]: string[] },
        urlParams: { [k: string]: string },
      ): RawPlace | null => {
        const service = serviceManager.getService<RawPlace>("Places");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "/place",
      handler: (): RawPlace[] => {
        const service = serviceManager.getService<RawPlace>("Places");
        const items = service.getAll();
        return items;
      },
    },
    {
      route: "/tag/:id",
      handler: (
        params: { [key: string]: string[] },
        urlParams: { [k: string]: string },
      ): RawTag | null => {
        const service = serviceManager.getService<RawTag>("Tags");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "/tag",
      handler: (): RawTag[] => {
        const service = serviceManager.getService<RawTag>("Tags");
        const items = service.getAll();
        return items;
      },
    },
    {
      route: "/range/time/:id",
      handler: (
        params: { [key: string]: string[] },
        urlParams: { [k: string]: string },
      ): RawTimeRange | null => {
        const service = serviceManager.getService<RawTimeRange>("TimeRange");
        const item = service.get(urlParams.id);
        return item;
      },
    },
    {
      route: "/range/time",
      handler: (): RawTimeRange[] => {
        const service = serviceManager.getService<RawTimeRange>("TimeRange");
        const items = service.getAll();
        return items;
      },
    },
  ];

  for (const route of routes) {
    const match = new Route(route.route).match(event.pathInfo);
    if (!match) continue;

    const result = route.handler(event.parameters, match);
    Logger.log("Result: %s", JSON.stringify(result));
    if (!result) {
      ContentService.createTextOutput(
        JSON.stringify({ code: "404" }),
      ).setMimeType(ContentService.MimeType.JSON);
      return;
    }

    const rowPerPage = parseInt(event.parameter.size ?? 20);
    const total = Array.isArray(result) ? result.length / rowPerPage : 1;
    const current = parseInt(event.parameter.page ?? 1);

    const response: StandardResponse = {
      content: Array.isArray(result)
        ? result.slice(
            rowPerPage * (current - 1),
            rowPerPage * current + rowPerPage,
          )
        : result,
      pagination: { total, current },
    };

    ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
      ContentService.MimeType.JSON,
    );
    return;
  }

  ContentService.createTextOutput(JSON.stringify({ code: "404" })).setMimeType(
    ContentService.MimeType.JSON,
  );
};
