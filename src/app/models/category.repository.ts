import { Category } from "./category";

export class CategoryRepository {
    private categories: Category[];

    constructor() {
        this.categories = [
            {
                id: 1,
                title: 'macera',
                subtitle: 'Macera ve aksiyon filmleri',
                isActive: true,
              },
              {
                id: 2,
                title: 'romantik',
                subtitle: 'Romantik filmler',
                isActive: false,
              },
              {
                id: 3,
                title: 'dram',
                subtitle: 'Dram filmleri',
                isActive: false,
              },
              {
                id: 4,
                title: 'bilim kurgu',
                subtitle: 'Bilim Kurgu filmleri',
                isActive: false,
              },
              {
                id: 5,
                title: 'Disabled category',
                subtitle: 'Disabled category',
                isActive: false,
              },
        ]
    }

    getCategories(): Category[] {
        return this.categories
    }

    getCategoryById(id: number): Category | undefined {
        return this.categories.find(category => category.id === id)
    }
}