export interface Product {
    imdbId: string;
    name: string;
    price: number;
    description: string;
    photos: string[];
    availability: boolean;
    productTypes: string[];
}