export default class TimeRangeService implements Service<RawTimeRange> {
  public readonly tableName = "TimeRanges";

  public spreadsheet;
  public sheet!: GoogleAppsScript.Spreadsheet.Sheet;

  public constructor() {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = this.spreadsheet.getSheetByName(this.tableName);
    if (!sheet) throw new Error("Sheet not found");
  }

  public getAll(): RawTimeRange[] {
    const data = this.sheet.getDataRange().getValues();
    const items = data.slice(1).map(this.buildData);

    return items;
  }

  public get(id: string): RawTimeRange | null {
    const matchCell = this.sheet
      .getRange("A:A")
      .createTextFinder(id)
      .findNext();
    if (!matchCell) return null;

    const rowIndex = matchCell.getRowIndex();
    const row = this.sheet.getRange(`${rowIndex}:${rowIndex}`);
    return this.buildData(row.getValues()[0]);
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
