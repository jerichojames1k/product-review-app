export interface IILike {
  id: string;
  liked: boolean;
  likes: string;
}

export interface IReviewProps {
  avatar?: string;
  content?: string;
  createdAt?: string;
  email?: string;
  id?: string;
  likes: string;
  name?: string;
  productId?: string;
  rating: number;
  title?: string;
  verified: string;
}

export interface IProductProps {
  id?:string,
  categoryId?: string
  categoryName?: string
  createdAt?: string
  currency?:string
  details?: string
  image?: string
  name?: string
  price?: string
  reviews?:IReviewProps[]
}
