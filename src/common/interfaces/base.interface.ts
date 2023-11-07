export interface IBase<CreatedBy = any> {
  createdBy?: CreatedBy;
  createdById?: number | null;
  updatedBy?: CreatedBy;
  updatedById?: number | null;
}
