// Types and Interfaces

export interface Book {
  name: string;
  id?: string;
  _id?: ObjectId | string;
  description: string;
  imageUrl: string;
}
