
export class Comment {
  public readonly id: string = ''
  public readonly postId: string = ''
  public readonly userId: string = ''
  public readonly comment: string = ''
  public readonly date: string = ''

  constructor(id: string, postId: string, userId: string, comment: string, date: string) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.comment = comment;
    this.date = date;
  }
}
