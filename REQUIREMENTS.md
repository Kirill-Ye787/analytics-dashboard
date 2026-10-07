# Соответствие прикреплённому заданию

| № | Задание | Реализация |
|---|---|---|
| 1 | ThemeContext с use() | `src/contexts/ThemeContext.jsx`: light/dark, localStorage, data-theme и класс body, без useTheme |
| 2 | LiveSearch с useDeferredValue | `LiveSearch.jsx`, `useDeferredSearch.js`, memo `SearchResults.jsx`, подсветка `Highlight.jsx` |
| 3 | OrdersTable с useOptimistic | `OrdersTable.jsx`, `useOptimisticOrder.js`: статус, архив, pending, commit и автоматический rollback |
| 4 | SalesChart с useTransition | `SalesChart.jsx`: реальные mock-данные, легенда категорий, opacity 0.5, защита от устаревших ответов |
| 5 | SalesForm с useActionState | `SalesForm.jsx`, `salesActions.js`: валидация, pending/success/error, обновление общих данных |
| 6 | AsyncDataWidget с use() | `AsyncDataWidget.jsx`, `useDataLoader.js`: Promise из кеша DataContext, Suspense, reload |
| 7 | UsersTable со сложной фильтрацией | `UsersTable.jsx`: 120 пользователей, deferred search, radio-фильтры, сортировка и пагинация |
| 8 | UserForm с useActionState | `UserForm.jsx`, `userActions.js`: async проверка email, валидация, pending, очистка после успеха |
| 9 | StatsCard с useId | `StatsCard.jsx`: titleId, valueId, ARIA, стрелки и цвета positive/negative/neutral |
| 10 | Mock API | `src/utils/api.js`: updateOrderStatus, loadChartData, checkEmailExists и остальные операции |
| 11 | Dashboard | `Dashboard.jsx` и провайдеры в `App.jsx`: header, sidebar, main, четыре раздела |
| 12 | Overview | `Overview.jsx`: четыре карточки, LiveSearch, OrdersTable и SalesChart |
| 13 | Pagination с useId | `Pagination.jsx`: уникальная подпись nav, доступные кнопки, disabled на границах |
| 14 | Error Boundary | `ErrorBoundary.jsx`: class, getDerivedStateFromError, componentDidCatch, fallback и retry |
| 15 | ThemeToggle | `ThemeToggle.jsx`: use(ThemeContext), солнце/луна, aria-label, aria-pressed, анимация |

## Дополнительные функции из файла

| Требование | Где |
|---|---|
| Header: название, Today/Week/Month/Year, refresh, theme, loading | `Header.jsx` |
| Sidebar: четыре раздела, категории, цена, multi-select регионов | `Sidebar.jsx`, `FilterPanel.jsx` |
| 50+ заказов, 30+ продуктов, 100+ пользователей | 84 / 36 / 120 записей в `src/data` |
| 10–15 заказов на странице | `PAGE_SIZE = 12`, общий `Pagination` |
| Топ-10, количество, доход, progress и сортировка | `TopProducts.jsx` |
| Оптимистические лайки и комментарии | `FavoriteButton`, `ProductComments` в `TopProducts.jsx` |
| Архивирование/восстановление записей | `OrdersTable.jsx`, `archiveOrder()` |
| ThemeContext, FilterContext, DataContext | `src/contexts`, чтение через `use()` |
| Условное чтение контекста | `MainContent.jsx` |
| Кеширование Promise | `DataContext.jsx`: Map, стабильный Promise на ключ |
| Отображение ошибок и загрузки | `ErrorMessage`, `LoadingSpinner`, `ErrorBoundary`, формы и таблицы |
| Responsive и обе темы | `src/styles/dashboard.css`, `widgets.css`, `themes.css` |
| Общие данные после добавления | `DataProvider`: commitSale, commitUser, commitOrder, commitProduct |

Структура из условия является рекомендованной. В проекте она сохранена с
добавлением `Icon.jsx`, `Highlight.jsx`, тестов и документации.
`Overview.jsx` назван без случайного обратного слеша из вставленного текста.
ThemeProvider размещён в App над всем Dashboard, чтобы тема была доступна также
Header и Sidebar. Файл `mockSalesData.js` включает daily/weekly/monthly/yearly,
а используемый графиком API пересчитывает наборы по общим данным и фильтрам.
