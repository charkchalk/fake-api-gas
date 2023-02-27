export default abstract class RelationService {
  public spreadsheet;
  public sheet: GoogleAppsScript.Spreadsheet.Sheet;

  public constructor(public readonly tableName: string) {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = this.spreadsheet.getSheetByName(this.tableName);
    if (!sheet) throw new Error("Sheet not found");
    this.sheet = sheet;
  }

  public getBy(key: string, id: string): Relation[] {
    const matched = this.sheet.getRange("1:1").createTextFinder(key).findNext();
    if (!matched) {
      Logger.log(
        "No matched key found in relation %s in %s",
        key,
        this.tableName,
      );
      return [];
    }

    const header = this.sheet.getRange("1:1").getDisplayValues()[0];

    const matchedColumn = matched.getA1Notation().slice(0, -1);

    Logger.log(
      "Searching relation of %s in %s column of %s",
      id,
      matchedColumn,
      this.tableName,
    );
    const matchedCells = this.sheet
      .getRange(`${matchedColumn}:${matchedColumn}`)
      .createTextFinder(id)
      .findAll();

    Logger.log("Matched cells: %s", matchedCells.length);

    const related: Relation[] = matchedCells.map(cell => {
      const rowIndex = cell.getRowIndex();
      const row = this.sheet
        .getRange(`${rowIndex}:${rowIndex}`)
        .getDisplayValues()[0];

      const rowObject: Relation = {};

      header.forEach((key, index) => {
        rowObject[key] = row[index];
      });

      return rowObject;
    });

    return related;
  }
}

interface Relation {
  [key: string]: string;
}
