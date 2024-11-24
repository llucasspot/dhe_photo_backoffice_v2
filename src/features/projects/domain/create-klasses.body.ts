export type CreateKlassesBody = {
  projectId: string;
  klasses: {
    name: string;
    studentPicture: {
      fileName: string;
      file: File;
    };
  }[];
};
