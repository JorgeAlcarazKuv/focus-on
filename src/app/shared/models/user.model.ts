export class User {
  public username: string;
  public token: string;

  constructor(params: { username?: string; token?: string } = {}) {
    this.username = params.username || '';
    this.token = params.token || '';
  }
}
