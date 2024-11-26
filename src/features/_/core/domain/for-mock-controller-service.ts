export abstract class ForMockControllerService {
  protected delay(seconds: number = 0.1): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
}
