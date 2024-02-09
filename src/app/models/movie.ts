export interface Movie {
    id: string;
    title: string;
    description: string;
    img: string;
    isPopular: boolean;
    createdAt: Date;
    categoryId: number;
}