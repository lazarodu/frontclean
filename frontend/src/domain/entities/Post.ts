import type { User } from "./User"

export class Post {
  public readonly id: string = ''
  public readonly title: string = ''
  public readonly description: string = ''
  public readonly content: string = ''
  public readonly user_id: string = ''
  public readonly date: Date = new Date()
  public readonly user?: User = undefined;

  constructor(id: string, title: string, description: string, content: string, user_id: string, date: Date, user?: User) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.content = content;
    this.user_id = user_id;
    this.date = date;
    this.user = user;
  }
}
