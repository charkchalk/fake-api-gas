import Service from "./service";

export default class TimeRangeService extends Service<RawTimeRange> {
  public constructor() {
    super("TimeRanges");
  }

  public buildData(data: string[]): RawTimeRange {
    const [id, weekday, start_time, end_time] = data;
    const day = weekday as Weekday;

    return {
      id,
      day,
      start_time,
      end_time,
    };
  }
}
