export class User {
  constructor(
    public _id: string,
    public name: string,
    public username: string,
    public password: string,
    public role: string,
    public phone: string,
    public email: string,
    public address: string
  ) {}
}
