import { REGIONS } from '../utils/constants.js';

const catalog = [
  ['Ноутбук Dell XPS 15', 'electronics', 35000],
  ['Смартфон Samsung Galaxy', 'electronics', 24000],
  ['Навушники Sony WH-1000XM5', 'electronics', 12000],
  ['Монітор LG UltraWide', 'electronics', 16500],
  ['Планшет Lenovo Tab', 'electronics', 9800],
  ['Клавіатура Logitech MX', 'electronics', 4200],
  ['Миша Logitech Master', 'electronics', 2800],
  ['Годинник Garmin', 'electronics', 15000],
  ['Колонка JBL Flip', 'electronics', 5500],
  ['Вебкамера Logitech', 'electronics', 2600],
  ['Зовнішній SSD Samsung', 'electronics', 3900],
  ['Повербанк Anker', 'electronics', 1900],
  ['Кавоварка DeLonghi', 'home', 14500],
  ['Настільна лампа', 'home', 1200],
  ['Робот-пилосос Xiaomi', 'home', 11000],
  ['Набір посуду', 'home', 2500],
  ['Офісне крісло', 'home', 6200],
  ['Плед із бавовни', 'home', 850],
  ['Електрочайник Bosch', 'home', 1800],
  ['Органайзер для столу', 'home', 450],
  ['Футболка базова', 'clothing', 600],
  ['Кросівки для бігу', 'clothing', 3200],
  ['Куртка демісезонна', 'clothing', 4500],
  ['Джинси прямого крою', 'clothing', 1800],
  ['Худі з бавовни', 'clothing', 1600],
  ['Рюкзак міський', 'clothing', 2100],
  ['Сорочка лляна', 'clothing', 1400],
  ['Шапка в’язана', 'clothing', 400],
  ['Чистий код', 'books', 850],
  ['React: практичний посібник', 'books', 720],
  ['Python для початківців', 'books', 650],
  ['Атомні звички', 'books', 420],
  ['Мистецтво навчатися', 'books', 380],
  ['Дизайн звичних речей', 'books', 560],
  ['Алгоритми: теорія і практика', 'books', 980],
  ['SQL: повний посібник', 'books', 620],
];

export const mockProducts = catalog.map(([name, category, price], index) => {
  const salesCount = 240 - index * 5;
  return {
    id: index + 1, name, category, price,
    stock: 12 + (index * 7) % 48, salesCount, revenue: salesCount * price,
    region: REGIONS[index % REGIONS.length], liked: false, comments: [],
  };
});
