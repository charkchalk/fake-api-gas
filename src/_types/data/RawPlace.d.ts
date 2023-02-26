interface RawPlace {
  /** 系統流水號 */
  id: string;
  /** 地點名稱 */
  name: string;
  /** 上層地點 */
  parent?: RawPlace | null;
}
