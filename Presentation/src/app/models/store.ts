import { Product } from './product';


export interface Store {
    _id: string;
    id_store: string;
    name: string;
    description: string;
    address: string;
    lat: string;
    long: string;
    img: string;
    phone: string;
    rating: string;
    schedule: string;
    website: string;
    products: Product[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
