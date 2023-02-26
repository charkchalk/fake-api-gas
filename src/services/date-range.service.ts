export default class DateRangeService implements Service<RawDateRange> {
  public readonly tableName = "DateRanges";

  public spreadsheet;
  public sheet!: GoogleAppsScript.Spreadsheet.Sheet;

  public constructor() {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = this.spreadsheet.getSheetByName(this.tableName);
    if (!sheet) throw new Error("Sheet not found");
  }

  public getAll(): RawDateRange[] {
    const data = this.sheet.getDataRange().getValues();
    const items = data.slice(1).map(this.buildData);

    return items;
  }

  public get(id: string): RawDateRange | null {
    const matchCell = this.sheet
      .getRange("A:A")
      .createTextFinder(id)
      .findNext();
    if (!matchCell) return null;

    const rowIndex = matchCell.getRowIndex();
    const row = this.sheet.getRange(`${rowIndex}:${rowIndex}`);
    return this.buildData(row.getValues()[0]);
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
