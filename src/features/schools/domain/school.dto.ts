export interface SchoolDto {
  id: string;
  name: string;
  location: string;
  type: 'public' | 'private';
  studentCount: number;
  status: 'active' | 'inactive';
}