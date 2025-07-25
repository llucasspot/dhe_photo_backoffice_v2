import { AvailableCurrency, ProjectDto } from '@domain/modules';

import { Dto } from '#core/domain';

export class Photographer extends Dto<Photographer> {
  id!: string;
  email!: string;
  password!: string;
}

export class Picture extends Dto<Picture> {
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
  projectId!: string;
  name!: string;
}

export class Product extends Dto<Product> {
  id!: string;
  description!: string;
  name!: string;
}

export class Project extends Dto<Project> {
  id!: string;
  schoolId!: string;
  messageForClients?: string;
  name!: string;
  orderEndDate!: Date;
  shotDate!: Date;
  state!: ProjectDto['state'];
}

// schools

export class School extends Dto<School> {
  id!: string;
  name!: string;
  currency!: AvailableCurrency;
  city!: string;
}

export class SchoolBankAccount extends Dto<SchoolBankAccount> {
  schoolId!: string;
  bankAccountId!: string;
}

// students

export class Student extends Dto<Student> {
  id!: string;
  klassId!: string;
  code!: string;
}

export class ProjectProduct extends Dto<ProjectProduct> {
  id!: string;
  productId!: string;
  projectId!: string;
  price!: number;
}

export class Template extends Dto<Template> {
  id!: string;
  height!: number;
  width!: number;
}

export class TemplateLayer extends Dto<TemplateLayer> {
  id!: string;
  templateId!: string;
  height!: number;
  width!: number;
  x!: number;
  y!: number;
}

export class ProductTemplates extends Dto<ProductTemplates> {
  id!: string;
  productId!: string;
  templateId!: string;
}

export class Customer extends Dto<Customer> {
  id!: string;
  email!: string;
}

export class BankAccount extends Dto<BankAccount> {
  id!: string;
  iban!: string;
  bic!: string;
}
