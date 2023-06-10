export interface BookType {
  id: string;
  title: string;
  author: string;
  img: string;
  status: string;
  finished: string | null;
  owner: string;
  created_at: string;
  updated_at: string;
  favorite: boolean;
}
