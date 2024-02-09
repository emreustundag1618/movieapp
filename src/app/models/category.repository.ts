import { Category } from './category';

export class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [
      {
        id: "1",
        title: 'macera',
        subtitle: 'Macera ve aksiyon filmleri',
      },
      {
        id: "2",
        title: 'romantik',
        subtitle: 'Romantik filmler',
      },
      {
        id: "3",
        title: 'dram',
        subtitle: 'Dram filmleri',
      },
      {
        id: "4",
        title: 'bilim kurgu',
        subtitle: 'Bilim Kurgu filmleri',
      },
      {
        id: "5",
        title: 'Disabled category',
        subtitle: 'Disabled category',
      },
    ];
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find((category) => category.id === id);
  }
}
