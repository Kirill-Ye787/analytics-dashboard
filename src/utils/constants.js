export const CATEGORIES = [
  { id: 'electronics', label: 'Електроніка', color: '#3b82f6' },
  { id: 'home', label: 'Дім і побут', color: '#10b981' },
  { id: 'clothing', label: 'Одяг', color: '#a78bfa' },
  { id: 'books', label: 'Книги', color: '#f59e0b' },
];
export const REGIONS = ['Київ', 'Одеса', 'Львів', 'Дніпро'];
export const PERIODS = [
  { id: 'today', label: 'Сьогодні' },
  { id: 'week', label: 'Тиждень' },
  { id: 'month', label: 'Місяць' },
  { id: 'year', label: 'Рік' },
];
export const SECTIONS = [
  { id: 'overview', label: 'Огляд', icon: 'overview', description: 'Ключові показники та останні події' },
  { id: 'sales', label: 'Продажі', icon: 'sales', description: 'Нові продажі та найпопулярніші продукти' },
  { id: 'users', label: 'Користувачі', icon: 'users', description: 'Ваша аудиторія, активність і нові реєстрації' },
  { id: 'analytics', label: 'Аналітика', icon: 'analytics', description: 'Порівняння періодів та поглиблені дані' },
];
export const STATUSES = [
  { id: 'pending', label: 'Очікує' },
  { id: 'processing', label: 'Обробляється' },
  { id: 'completed', label: 'Виконано' },
  { id: 'cancelled', label: 'Скасовано' },
];
export const MAX_PRICE = 60000;
export const PAGE_SIZE = 12;
export const DEFAULT_FILTERS = {
  categories: CATEGORIES.map(item => item.id),
  maxPrice: MAX_PRICE,
  regions: REGIONS,
};
export const EMPTY_ACTION_STATE = { success: false, message: '', error: '', errors: {} };
