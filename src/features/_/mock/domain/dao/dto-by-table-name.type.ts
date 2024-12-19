import {
  GroupPicture,
  Klass,
  Picture,
  Product,
  ProductTemplates,
  Project,
  ProjectProduct,
  School,
  Student,
  StudentPicture,
  Template,
  TemplateLayer,
} from './tables';

export type DtoByTableName = {
  pictures: Picture;
  studentPictures: StudentPicture;
  groupPictures: GroupPicture;
  schools: School;
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
};

export type TableName = keyof DtoByTableName;
