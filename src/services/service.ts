export default abstract class Service<T = unknown> {
  public spreadsheet;
  public sheet: GoogleAppsScript.Spreadsheet.Sheet;

  public constructor(public readonly tableName: string) {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = this.spreadsheet.getSheetByName(this.tableName);
    if (!sheet) throw new Error("Sheet not found");
    this.sheet = sheet;
  }

  public getAll(pagination: CanPaginate): (T | null)[] {
    const data = this.sheet.getDataRange().getDisplayValues();
    const courses = data.slice(1).map((values, index) => {
      if (index < (pagination.page - 1) * pagination.size) return null;
      if (index > pagination.page * pagination.size) return null;

      return this.buildData(values);
    });

    return courses;
  }

  public get(id: string): T | null {
    if (!id) return null;
    const matchCell = this.sheet
      .getRange("A:A")
      .createTextFinder(id)
      .findNext();
    if (!matchCell) return null;

    const rowIndex = matchCell.getRowIndex();
    const row = this.sheet.getRange(`${rowIndex}:${rowIndex}`);
    return this.buildData(row.getDisplayValues()[0]);
  }

  public abstract buildData(data: string[]): T;
}
