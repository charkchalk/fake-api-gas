interface RawCourse {
  /** 系統流水號 */
  uuid: string;
  /** 選課代號（如果適用） */
  code: string;
  /** 課程名稱 */
  name: string;
  /** 課程敘述 */
  description: string;
  /** 修課類型 */
  type: RawTag | null;
  tags: RawTag[];
  /** 學分數 */
  credit: number;
  /** 開課單位 */
  organization: RawOrganization | null;
  /** 講師、負責人 */
  hosts: RawPerson[];
  /** 上課地點 */
  places: RawPlace[];
  /** 日期範圍 */
  dateRange: RawDateRange | null;
  /** 時間範圍 */
  timeRanges: RawTimeRange[];
  /** 原系統頁面 */
  link: string;
}
