import { REGIONS } from '../utils/constants.js';

const firstNames = ['Олександр', 'Марія', 'Іван', 'Олена', 'Андрій', 'Наталія', 'Дмитро', 'Софія', 'Максим', 'Анна', 'Богдан', 'Катерина'];
const lastNames = ['Коваленко', 'Петренко', 'Шевченко', 'Мельник', 'Бондаренко', 'Ткаченко', 'Кравченко', 'Поліщук', 'Савченко', 'Романенко'];
const now = Date.now();

export const mockUsers = Array.from({ length: 120 }, (_, index) => ({
  id: index + 1,
  name: `${firstNames[index % firstNames.length]} ${lastNames[Math.floor(index / firstNames.length)]}`,
  email: index === 0 ? 'admin@example.com' : `user${index + 1}@example.com`,
  role: index % 12 === 0 ? 'admin' : 'user',
  isActive: index % 4 !== 0,
  registeredAt: new Date(now - index * 3 * 86400000).toISOString(),
  lastActivity: new Date(now - (index % 4 === 0 ? 50 + index % 40 : index % 6) * 86400000).toISOString(),
  region: REGIONS[index % REGIONS.length],
}));
