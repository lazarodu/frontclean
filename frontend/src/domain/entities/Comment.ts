
export class Comment {
  public readonly id: string = ''
  public readonly postId: string = ''
  public readonly userId: string = ''
  public readonly comment: string = ''
  public readonly autor: string = ''
  public readonly data: string = ''

  constructor(id: string, postId: string, userId: string, comment: string, autor: string, data: string) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.comment = comment;
    this.autor = autor;
    this.data = data;
  }
}
