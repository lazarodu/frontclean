
export class Comment {
  public readonly id: string = ''
  public readonly post_id: string = ''
  public readonly user_id: string = ''
  public readonly comment: string = ''
  public readonly date: Date = new Date()

  constructor(id: string, post_id: string, user_id: string, comment: string, date: Date) {
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.comment = comment;
    this.date = date;
  }
}
