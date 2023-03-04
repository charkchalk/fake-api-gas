import Service from "./service";

export default class DateRangeService extends Service<RawDateRange> {
  public constructor() {
    super("DateRanges");
  }

  public matches(data: string[], value: string): boolean {
    return (
      data[1].toLowerCase().includes(value.toLowerCase()) ||
      data[2].toLowerCase().includes(value.toLowerCase()) ||
      data[3].toLowerCase().includes(value.toLowerCase()) ||
      data[4].toLowerCase().includes(value.toLowerCase())
    );
  }

  public isDataValid(data: string[]): boolean {
    return data.every(value => value !== "");
  }

  public buildData(data: string[]): RawDateRange {
    const [id, name, description, start, end] = data;

    return {
      id,
      name,
      description,
      start,
      end,
    };
  }
}
