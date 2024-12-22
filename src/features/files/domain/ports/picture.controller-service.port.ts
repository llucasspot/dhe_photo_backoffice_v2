export abstract class PictureControllerServicePort {
  abstract getPictureById(pictureId: string): Promise<{ blob: Blob }>;

  abstract uploadPicture(
    pictureId: string,
    file: File,
  ): Promise<{ pictureId: string }>;
}
