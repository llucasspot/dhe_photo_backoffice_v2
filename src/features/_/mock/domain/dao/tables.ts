import { Dto } from '#core/domain';
import { ProjectState } from '#features/projects/domain';
import { AvailableCurrency } from '#features/schools/domain';

export class Picture extends Dto<Picture> {
  //properties
  id!: string;
}

export class StudentPicture extends Dto<StudentPicture> {
  id!: string;
  pictureId!: string;
  studentId!: string;
}

export class GroupPicture extends Dto<GroupPicture> {
  id!: string;
  pictureId!: string;
  klassId!: string;
}

export class Klass extends Dto<Klass> {
  id!: string;
  name!: string;
  projectId!: string;
}

export class Product extends Dto<Product> {
  id!: string;
  name!: string;
  description!: string;
  longSize!: number;
  shortSize!: number;
}

export class Project extends Dto<Project> {
  id!: string;
  schoolId!: string;
  name!: string;
  shotDate!: Date;
  orderEndDate!: Date;
  messageForClients?: string;
  state!: ProjectState;
}

export class School extends Dto<School> {
  id!: string;
  name!: string;
  currency!: AvailableCurrency;
  city!: string;
}

export class Student extends Dto<Student> {
  id!: string;
  code!: string;
  klassId!: string;
}

export class ProjectProduct extends Dto<ProjectProduct> {
  id!: string;
  projectId!: string;
  productId!: string;
  price!: number;
}
