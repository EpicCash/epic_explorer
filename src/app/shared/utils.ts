export class Utils {
  constructor(public document) {}

  public removeLoader(): void {
    this.document.getElementById('loader')
      ? this.document.getElementById('loader').remove()
      : '';
  }
}
