export enum SchoolType {
  Public = 'public',
  Private = 'private',
}

export enum SchoolStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface SchoolDto {
  id: string;
  name: string;
  location: string;
  type: SchoolType;
  studentCount: number;
  status: SchoolStatus;
}
