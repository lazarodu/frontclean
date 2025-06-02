import { SArticle } from "./styles";

export interface PostDetailProps {
  id?: string;
  title: string;
  description: string;
  content: string;
  autor: string;
  data: string;
}
export function PostDetails({
  title,
  description,
  content,
  autor,
  data,
}: PostDetailProps) {
  return (
    <SArticle>
      <header>
        <h3>{title}</h3>
        <div>
          <h6>{autor}</h6>, <h6>{data}</h6>
        </div>
      </header>
      <h4>{description}</h4>
      <section>
        <p>{content}</p>
      </section>
    </SArticle>
  );
}
