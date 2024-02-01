export interface IProductProps {
  categoryId: string;
  categoryName: string;
  createdAt: string;
  currency: string;
  details: string;
  id: string;
  image: string;
  name: string;
  price: string;
  [key: string]: any;
}

export interface ICategoriesProps {
  createdAt:string
  id:string;
  name: string
  [key: string]: any;
}
