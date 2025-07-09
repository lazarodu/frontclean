
export class Comment {
  public readonly id: string = ''
  public readonly post_id: string = ''
  public readonly userId: string = ''
  public readonly comment: string = ''
  public readonly date: string = ''

  constructor(id: string, post_id: string, userId: string, comment: string, date: string) {
    this.id = id;
    this.post_id = post_id;
    this.userId = userId;
    this.comment = comment;
    this.date = date;
  }
}
