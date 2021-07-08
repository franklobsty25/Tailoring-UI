import { Review } from "./review";

export interface Product {
    _id: string;
    name: string;
    image: string;
    images: [];
    fabric: string;
    color: string;
    discount: number;
    quantity: number;
    price: number;
    total: number;
    category: string;
    description: string;
    delivery: number;
    duration: number;
    reviews: [Review];
    xsmallSize: number;
    smallSize: number;
    mediumSize: number;
    largeSize: number;
    xlargeSize: number;
    xxlargeSize: number;
    termCondition: boolean;
    tailorId: string;
}
