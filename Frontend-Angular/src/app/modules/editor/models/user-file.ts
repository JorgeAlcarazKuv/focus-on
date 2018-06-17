export class UserFile {
  public id: number;
  public fileName: string;
  public user: string;
  public content: string;
  public format: string;

  constructor(
    params: {
      id?: number;
      fileName?: string;
      user?: string;
      content?: string;
      format?: string;
    } = {}
  ) {
    this.id = params.id || null;
    this.fileName = params.fileName || 'Untitled file';
    this.user = params.user || '';
    this.content = params.content || '';
    this.format = params.format || 'typescript';
  }
}
