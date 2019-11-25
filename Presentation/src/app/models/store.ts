import { Product } from './product';

export interface Store {
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
}
