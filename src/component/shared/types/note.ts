export interface NoteType {
  id: string;
  title: string;
  content: string;
  tags: TagType[];
}

export interface TagType {
  id: string;
  content: string;
}
