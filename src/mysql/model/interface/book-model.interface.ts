interface IBookModel {
  id?: number;
  title: string;
  description?: string;
  author?: string;
  publicationDate: Date;
  edition: number;
}

export {IBookModel};
