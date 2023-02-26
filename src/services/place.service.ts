export default class PlaceService implements Service<RawPlace> {
  protected readonly TABLE_NAME = "Places";

  public spreadsheet;
  public sheet!: GoogleAppsScript.Spreadsheet.Sheet;

  public constructor() {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = this.spreadsheet.getSheetByName(this.TABLE_NAME);
    if (!sheet) throw new Error("Sheet not found");
  }

  public getAll(): RawPlace[] {
    const data = this.sheet.getDataRange().getValues();
    const items = data.slice(1).map(this.buildData);

    return items;
  }

  public get(id: string): RawPlace | null {
    const matchCell = this.sheet
      .getRange("A:A")
      .createTextFinder(id)
      .findNext();
    if (!matchCell) return null;

    const rowIndex = matchCell.getRowIndex();
    const row = this.sheet.getRange(`${rowIndex}:${rowIndex}`);
    return this.buildData(row.getValues()[0]);
  }

  public buildData(data: string[]): RawPlace {
    const [id, name, parentId] = data;
    const parent = parentId ? this.get(parentId) : null;

    return { id, name, parent };
  }
}
