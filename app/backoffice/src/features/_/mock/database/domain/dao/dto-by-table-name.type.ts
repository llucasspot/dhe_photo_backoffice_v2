import {
  BankAccount,
  Customer,
  GroupPicture,
  Klass,
  Photographer,
  Picture,
  Product,
  ProductTemplates,
  Project,
  ProjectProduct,
  School,
  SchoolBankAccount,
  Student,
  StudentPicture,
  Template,
  TemplateLayer,
} from './tables';

export type DtoByTableName = {
  photographers: Photographer;
  pictures: Picture;
  studentPictures: StudentPicture;
  groupPictures: GroupPicture;
  // bank accounts
  bankAccounts: BankAccount;
  // schools
  schools: School;
  schoolBankAccounts: SchoolBankAccount;
  // klasses
  klasses: Klass;
  products: Product;
  projectProducts: ProjectProduct;
  projects: Project;
  students: Student;
  // couche de coordination
  coord_product_templates: ProductTemplates;
  // template
  tmplt_templates: Template;
  tmplt_layers: TemplateLayer;
  // customer
  customers: Customer;
};

export type TableName = keyof DtoByTableName;
