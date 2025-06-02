
export class Post {
  public readonly id: string = ''
  public readonly title: string = ''
  public readonly description: string = ''
  public readonly content: string = ''
  public readonly autor: string = ''
  public readonly data: string = ''

  constructor(id: string, title: string, description: string, content: string, autor: string, data: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.content = content;
    this.autor = autor;
    this.data = data;
  }
}
