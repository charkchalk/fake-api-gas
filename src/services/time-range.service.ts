import Service from "./service";

export default class TimeRangeService extends Service<RawTimeRange> {
  public constructor() {
    super("TimeRanges");
  }

  public matches(data: string[], value: string): boolean {
    return (
      data[1].toLowerCase().includes(value.toLowerCase()) ||
      data[2].toLowerCase().includes(value.toLowerCase()) ||
      data[3].toLowerCase().includes(value.toLowerCase())
    );
  }

  public isDataValid(data: string[]): boolean {
    return data.every(value => value !== "");
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
