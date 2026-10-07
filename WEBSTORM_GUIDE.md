# WebStorm 2026.2.3 — полный проект и весь код

Эта инструкция позволяет самостоятельно создать каждый файл в пустом проекте.
Сначала выполните шаги создания ниже, затем добавьте файлы из раздела «Полный код».
Названия и пути файлов должны точно совпадать; регистр букв важен.
Код каждого блока полностью заменяет содержимое соответствующего файла.

# Interactive Analytics Dashboard — React 19

Домашнее задание «Генерація унікальних ідентифікаторів з useId».
Реализовано полное задание из прикреплённого файла: четыре раздела, десять виджетов,
шесть API React, общие данные, фильтры, светлая и тёмная темы.

Проект предназначен для **WebStorm 2026.2.3**. Интерфейс — на украинском языке,
объяснения — на русском. Это учебное приложение с mock API; отдельный сервер не нужен.

## Создание проекта с нуля в WebStorm

1. Откройте WebStorm → **File → New → Project**.
2. Выберите **Empty Project**, задайте папку, например `D:\ReactProjects\analytics-dashboard`,
   и нажмите **Create**. Если ваша версия показывает другие шаблоны, создайте обычную
   пустую папку и откройте её через **File → Open**.
3. В панели Project создавайте папки через **New → Directory**, а файлы через **New → File**.
4. Создайте `package.json`, `index.html`, `vite.config.js`, `.gitignore` и папки
   `src`, `public`, `tests`. Все остальные файлы перечислены в `WEBSTORM_GUIDE.md`.
5. Вставьте код в соответствующие файлы. Можно последовательно использовать
   полный список кода из приложенной инструкции; готовые исходники в архиве служат
   таким же образцом.
6. В **Settings → Languages & Frameworks → JavaScript Runtime** проверьте путь
   к Node.js. В некоторых интерфейсах раздел называется **Node.js**. Нужен Node.js
   **22.12 или новее**; Node.js 24 подходит. Проверка в терминале:

   ```bash
   node -v
   npm -v
   ```

7. Откройте терминал WebStorm (`Alt + F12`). Убедитесь, что терминал находится в
   папке с `package.json`, затем выполните:

   ```bash
   npm install
   npm run dev
   ```

8. Откройте адрес, который напечатает Vite, обычно `http://127.0.0.1:5173/`.
   При занятом порте Vite выберет следующий. Для остановки нажмите `Ctrl + C`.

WebStorm сам не устанавливает зависимости проекта. `node_modules` и
`package-lock.json` появляются после `npm install`; вручную создавать их не нужно.
В готовом архиве `package-lock.json` уже включён.

Если PowerShell сообщает, что `npm.ps1` заблокирован, выполните те же команды
как `npm.cmd install` и `npm.cmd run dev`. Если команда не видит `package.json`,
перейдите в папку проекта. HTML-страница запускается по адресу Vite из терминала.

## Что реализовано

| API React | Где применяется | Что можно проверить |
|---|---|---|
| `useId` | `StatsCard`, `Pagination`, `Input`, `Select`, фильтры, график | Уникальные DOM ID, связи label/input, сообщения ошибок, ARIA |
| `useActionState` | Формы продаж, пользователей и комментариев | Валидация, pending, success/error, очистка после успеха |
| `useTransition` | График, сравнение периодов, навигация, фильтры, обновление данных | Нетерминовые обновления и индикатор pending |
| `useOptimistic` | Статусы, архив, лайки и комментарии | Мгновенная реакция, «збереження...», откат при ошибке |
| `useDeferredValue` | Поиск продуктов и пользователей | Ввод обновляется сразу, результаты используют отложенный запрос |
| `use()` | Три контекста и `AsyncDataWidget` | Чтение контекста, кешированный Promise, Suspense и Error Boundary |

Начальные данные: **84 заказа, 36 продуктов, 120 пользователей**.
Даты формируются относительно первого запуска, чтобы фильтры периодов работали.
Пагинация показывает по **12 записей**.

- **Огляд**: четыре карточки, live search, график и таблица заказов.
- **Продажі**: форма, топ-10 продуктов, лайки, комментарии и общая таблица заказов.
- **Користувачі**: live search, активность, сортировка, пагинация и форма добавления.
- **Аналітика**: сравнение двух периодов, async-виджет и график.
- Header: выбор периода, обновление данных, тема и loading.
- Sidebar: категории, максимальная цена продукта и выбор нескольких регионов.
- Тема и изменения mock-данных сохраняются в `localStorage`.
- Адаптивная верстка для компьютера, планшета и небольших экранов.

## Как понимать фильтры и показатели

Период в шапке применяется к заказам, финансовым показателям, новым пользователям
в карточке и аналитике. Таблица пользователей показывает все регистрации в
выбранных регионах; её собственные фильтры управляют именем и активностью.

Фильтры категорий и цены относятся к продуктам и связанным с ними заказам.
Регион применяется также к пользователям. Пустой набор категорий/регионов
означает отсутствие подходящих записей. Формы предлагают полный каталог,
чтобы можно было добавить запись независимо от текущего поиска.

«Тиждень» — последние 7 дней, «Місяць» — последние 30 дней,
«Рік» — текущий календарный месяц и 11 предыдущих месяцев.
Дохід и график учитывают выполненные, неархивные заказы.
Товары в наличии — текущая сумма остатков. Топ продуктов — рейтинг за всё время.
При нулевой базе сравнения процент роста не выдумывается: показывается «Немає бази».

Новая продажа создаётся со статусом `completed`, уменьшает остаток и увеличивает
счётчики продукта. Новые пользователи по умолчанию относятся к региону «Київ».
Если новая запись скрыта текущими фильтрами, нажмите **Скинути** и выберите подходящий период.

## Проверка в приложении

1. В «Огляд» введите `ноутбук` в live search. Найденный текст подсвечивается.
2. Смените период несколько раз подряд. Последний выбор должен определять график.
   Селекторы остаются доступны во время запроса.
3. Измените статус заказа. Он меняется сразу; до завершения запроса виден индикатор.
4. Включите **Імітувати помилку запиту**, измените статус и дождитесь сообщения.
   Предыдущий статус восстановится. Затем выключите флажок.
5. Нажмите **Архів** у заказа. В режиме **Показати архів** его можно восстановить.
6. В «Продажі» заполните форму, отправьте её и проверьте новое имя клиента в общей таблице.
   Для проверки ошибок попробуйте количество больше остатка или пустые поля.
7. Поставьте лайк продукту. Добавьте комментарий. Для отката комментария используйте
   флажок **Імітувати помилку коментаря**.
8. В «Користувачі» проверьте поиск, radio-фильтры, сортировку и переход страниц.
9. Добавьте пользователя с новым email. Повторите с тем же email или `admin@example.com`:
   появится ошибка, введённые поля сохранятся. Регистр email не влияет на уникальность.
10. В «Аналітика» включите **Імітувати помилку аналітики**, дождитесь Error Boundary,
    затем нажмите **Спробувати ще раз**. После Suspense данные восстановятся.
11. Смените тему и обновите страницу — выбор темы и сохранённые данные останутся.

Запросы изменения статуса, архива, лайка и комментария дополнительно имеют
**10% случайных ошибок**, как в условии. Флажки обеспечивают воспроизводимую ошибку.
Mock API использует задержки 0,5–1,4 секунды. `useDeferredValue` сам по себе
не является debounce или сетевым запросом: на этих небольших массивах его pending
может быть очень коротким. Мемоизация результатов отделяет их от срочного ввода.
`await` не блокирует браузер; transitions управляют приоритетом React-обновлений.
Поля форм контролируются состоянием. Автоматический нативный reset отменён
через `onReset`, а после успеха значения очищаются явно: это сохраняет ввод
при ошибке и позволяет повторить отправку с исправленными параметрами.

## Команды проверки

```bash
npm test
npm run build
npm run preview
```

`npm test` запускает восемь тестов: валидация, создание продажи и изменение
остатков, отказ API, дубликаты email, согласованность фильтров/графика/метрик,
размер тестовых данных и вычисление процентов. `npm run build` создаёт `dist`.

## Важное о useId

`useId` создаёт идентификатор **элемента интерфейса**, а не записи в базе.
Он вызывается на верхнем уровне компонента. Подписи соединены с полями через
`htmlFor`/`id`, описания и ошибки — через `aria-describedby`.
В карточках используются отдельные `titleId` и `valueId`. В пагинации скрытая
подпись имеет уникальный ID, а `nav` ссылается на неё через `aria-labelledby`.
Строки списков используют `key={item.id}` из данных, а не `useId`.

## Загрузка домашнего задания через сайт GitHub

1. Создайте репозиторий, например `interactive-analytics-dashboard`.
2. Откройте **Add file → Upload files**. Загрузите **содержимое** папки проекта:
   `src`, `public`, `tests`, `package.json`, `package-lock.json`, `index.html`,
   `vite.config.js`, `.gitignore`, `README.md`, `REQUIREMENTS.md`, `WEBSTORM_GUIDE.md`, `VERIFICATION.md`.
3. Для папок используйте перетаскивание в область загрузки: файл-диалог может
   не давать выбрать папку. Если перетаскивание папки недоступно, создайте файлы
   через **Add file → Create new file**, указывая путь, например `src/App.jsx`.
4. Нажмите **Commit changes**. Проверьте, что `package.json` находится в корне
   репозитория, а не внутри лишней вложенной папки.
5. Учителю отправьте ссылку на репозиторий.

Не загружайте `node_modules`, `dist`, `.idea` и сам ZIP вместо исходников.
При использовании Git они уже исключены в `.gitignore`; при ручной загрузке
через сайт самостоятельно выбирайте только нужные файлы.

## Документация

- https://react.dev/reference/react/useId
- https://react.dev/reference/react/useActionState
- https://react.dev/reference/react/useOptimistic
- https://react.dev/reference/react/useTransition
- https://react.dev/reference/react/useDeferredValue
- https://react.dev/reference/react/use

Actions в этой Vite SPA — обычные клиентские async-функции с mock API.
В задании такой вариант разрешён; настоящие серверные Actions требуют
соответствующего серверного фреймворка и здесь не выдаются за готовый бекенд.


# Полный код для ручного создания файлов

Не создавайте вручную `node_modules`, `dist` или `package-lock.json`. Их создают команды npm.

| Папка | Назначение |
|---|---|
| `src/contexts` | Тема, общие фильтры, данные и кеш |
| `src/hooks` | Отложенный поиск, оптимистические заказы, чтение Promise |
| `src/components/layout` | Header, Sidebar и MainContent |
| `src/components/widgets` | Десять виджетов дашборда |
| `src/components/ui` | Поля, кнопки, индикаторы и переключатель темы |
| `src/components/common` | Пагинация, результаты, фильтры, Error Boundary |
| `src/pages/Dashboard` | Dashboard и четыре раздела |
| `src/actions` | Асинхронные действия форм |
| `src/data` | Тестовые данные |
| `src/utils` | Mock API, валидация, расчёты и форматирование |
| `src/styles` | Цветовые темы и адаптивная верстка |
| `tests` | Восемь проверок логики |

## 1. `package.json`

```json
{
  "name": "interactive-analytics-dashboard",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "node --test tests/*.test.js"
  },
  "engines": { "node": ">=22.12.0" },
  "dependencies": {
    "react": "19.3.0",
    "react-dom": "19.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "6.1.2",
    "vite": "8.3.3"
  }
}
```

## 2. `index.html`

```html
<!doctype html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#3b82f6" />
    <meta name="description" content="Навчальний Analytics Dashboard: шість хуків React 19." />
    <title>Analytics Dashboard</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## 3. `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5173 },
});
```

## 4. `.gitignore`

```text
node_modules/
dist/
.idea/
.vscode/
.DS_Store
*.log
coverage/
```

## 5. `public/favicon.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#3b82f6"/><path d="M8 23V17M16 23V9M24 23V13" stroke="white" stroke-width="4" stroke-linecap="round"/></svg>
```

## 6. `src/App.jsx`

```jsx
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { FilterProvider } from './contexts/FilterContext.jsx';
import { DataProvider } from './contexts/DataContext.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <DataProvider><Dashboard /></DataProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
```

## 7. `src/actions/orderActions.js`

```javascript
export { updateOrderStatus, archiveOrder } from '../utils/api.js';
```

## 8. `src/actions/salesActions.js`

```javascript
import { createSale, getSnapshot } from '../utils/api.js';
import { validateSale } from '../utils/validation.js';

export async function submitSale(previousState, formData) {
  const values = Object.fromEntries(['customer', 'product', 'quantity', 'price']
    .map(key => [key, String(formData.get(key) ?? '')]));
  const errors = validateSale(values, getSnapshot().products);
  if (Object.keys(errors).length) return { success: false, error: 'Перевірте поля форми.', errors };
  try { return await createSale(values); }
  catch (error) { return { success: false, error: error.message, errors: {} }; }
}
```

## 9. `src/actions/userActions.js`

```javascript
import { checkEmailExists, createUser } from '../utils/api.js';
import { validateUser } from '../utils/validation.js';

export async function addUser(previousState, formData) {
  const values = Object.fromEntries(['name', 'email', 'role']
    .map(key => [key, String(formData.get(key) ?? '')]));
  const errors = validateUser(values);
  if (Object.keys(errors).length) return { success: false, error: 'Перевірте поля форми.', errors };
  try {
    if (await checkEmailExists(values.email)) return {
      success: false, error: 'Email вже зареєстрований.', errors: { email: 'Цей email уже використовується.' },
    };
    return await createUser(values);
  } catch (error) { return { success: false, error: error.message, errors: {} }; }
}
```

## 10. `src/components/common/ErrorBoundary.jsx`

```jsx
import { Component } from 'react';
import Button from '../ui/Button.jsx';

export default class ErrorBoundary extends Component {
  state = { hasError: false, message: '' };
  static getDerivedStateFromError(error) { return { hasError: true, message: error.message }; }
  componentDidCatch(error, info) { console.error('Analytics ErrorBoundary:', error, info.componentStack); }
  render() {
    if (this.state.hasError) return <div className="error-fallback" role="alert">
      <strong>Не вдалося завантажити дані</strong>
      <p>{this.state.message}</p>
      <Button onClick={this.props.onRetry}>Спробувати ще раз</Button>
    </div>;
    return this.props.children;
  }
}
```

## 11. `src/components/common/FilterPanel.jsx`

```jsx
import { use, useId } from 'react';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { CATEGORIES, MAX_PRICE, REGIONS } from '../../utils/constants.js';
import { currency } from '../../utils/formatters.js';
import Button from '../ui/Button.jsx';
import Select from '../ui/Select.jsx';

export default function FilterPanel() {
  const id = useId();
  const { draftFilters, updateFilters, resetFilters, isPending } = use(FilterContext);
  function toggleCategory(category) {
    const categories = draftFilters.categories.includes(category)
      ? draftFilters.categories.filter(item => item !== category) : [...draftFilters.categories, category];
    updateFilters({ categories });
  }
  return <section className="filter-panel" aria-labelledby={`${id}-title`}>
    <div className="sidebar-heading"><h2 id={`${id}-title`}>Фільтри</h2><Button variant="text" onClick={resetFilters}>Скинути</Button></div>
    <fieldset><legend>Категорії продуктів</legend>
      {CATEGORIES.map(category => <label className="check-label" key={category.id} htmlFor={`${id}-${category.id}`}>
        <input id={`${id}-${category.id}`} type="checkbox" checked={draftFilters.categories.includes(category.id)} onChange={() => toggleCategory(category.id)} />
        <span className="category-dot" style={{ background: category.color }} />{category.label}
      </label>)}
    </fieldset>
    <div className="price-filter">
      <label htmlFor={`${id}-price`}>Ціна продукту до <strong>{currency(draftFilters.maxPrice)}</strong></label>
      <input id={`${id}-price`} type="range" min="0" max={MAX_PRICE} step="500" value={draftFilters.maxPrice}
        aria-valuetext={currency(draftFilters.maxPrice)} onChange={event => updateFilters({ maxPrice: Number(event.target.value) })} />
      <div className="range-labels"><span>0 ₴</span><span>60 000 ₴</span></div>
    </div>
    <Select label="Регіони" multiple size="4" value={draftFilters.regions}
      hint="Кілька регіонів: Ctrl + клік (на Mac — Cmd)."
      onChange={event => updateFilters({ regions: Array.from(event.target.selectedOptions, option => option.value) })}>
      {REGIONS.map(region => <option value={region} key={region}>{region}</option>)}
    </Select>
    <p className="sidebar-note" role="status">{isPending ? 'Оновлення фільтрів...' : 'Фільтри застосовуються до даних дашборду.'}</p>
  </section>;
}
```

## 12. `src/components/common/Highlight.jsx`

```jsx
export default function Highlight({ text, query }) {
  const needle = query.trim().toLocaleLowerCase('uk-UA');
  if (!needle) return text;
  const source = text.toLocaleLowerCase('uk-UA');
  const parts = [];
  let cursor = 0;
  let position = source.indexOf(needle);
  while (position !== -1) {
    parts.push(text.slice(cursor, position));
    parts.push(<mark key={position}>{text.slice(position, position + needle.length)}</mark>);
    cursor = position + needle.length;
    position = source.indexOf(needle, cursor);
  }
  parts.push(text.slice(cursor));
  return <>{parts}</>;
}
```

## 13. `src/components/common/Pagination.jsx`

```jsx
import { useId } from 'react';
import Button from '../ui/Button.jsx';

export default function Pagination({ currentPage, totalPages, onPageChange, label = 'Пагінація' }) {
  const labelId = useId();
  const pages = Math.max(1, totalPages);
  return <nav className="pagination" aria-labelledby={labelId}>
    <span id={labelId} className="sr-only">{label}</span>
    <Button variant="secondary" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Попередня сторінка">←</Button>
    <span aria-live="polite">Сторінка <strong>{currentPage}</strong> з {pages}</span>
    <Button variant="secondary" disabled={currentPage >= pages} onClick={() => onPageChange(currentPage + 1)} aria-label="Наступна сторінка">→</Button>
  </nav>;
}
```

## 14. `src/components/common/SearchResults.jsx`

```jsx
import { memo, useMemo } from 'react';
import { currency } from '../../utils/formatters.js';
import Highlight from './Highlight.jsx';
import Icon from '../ui/Icon.jsx';

const SearchResults = memo(function SearchResults({ data, query }) {
  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('uk-UA');
    return data.filter(item => item.name.toLocaleLowerCase('uk-UA').includes(needle));
  }, [data, query]);
  return <>
    <p className="results-count">Знайдено: {matches.length}{matches.length > 8 && ' · показано перші 8'}</p>
    {matches.length === 0 ? <div className="empty-state">Нічого не знайдено</div> : <ul className="search-results">
      {matches.slice(0, 8).map(item => <li key={`${item.kind}-${item.id}`}>
        <span className="result-icon"><Icon name={item.kind === 'product' ? 'box' : 'users'} size={18} /></span>
        <div><strong><Highlight text={item.name} query={query} /></strong><small>{item.kind === 'product' ? `${item.stock} шт. у наявності · ${item.region}` : item.email}</small></div>
        <span className="result-meta">{item.kind === 'product' ? currency(item.price) : item.role === 'admin' ? 'Admin' : 'User'}</span>
      </li>)}
    </ul>}
  </>;
});
export default SearchResults;
```

## 15. `src/components/layout/Header.jsx`

```jsx
import { use } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { PERIODS } from '../../utils/constants.js';
import Button from '../ui/Button.jsx';
import Select from '../ui/Select.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import Icon from '../ui/Icon.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

export default function Header() {
  const { period, setPeriod, refreshData, isRefreshing, refreshError } = use(DataContext);
  return <>
    <header className="header">
      <a className="brand" href="#main-content"><span className="brand-symbol"><Icon name="analytics" size={25} /></span>
        <span>Analytics <strong>Dashboard</strong></span></a>
      <div className="header-actions">
        {isRefreshing && <LoadingSpinner compact />}
        <Select label="Період" className="header-period" value={period} onChange={event => setPeriod(event.target.value)}>
          {PERIODS.map(item => <option value={item.id} key={item.id}>{item.label}</option>)}
        </Select>
        <Button variant="secondary" onClick={refreshData} disabled={isRefreshing}>
          <Icon name="refresh" /><span>Оновити дані</span>
        </Button>
        <ThemeToggle />
      </div>
    </header>
    <ErrorMessage>{refreshError}</ErrorMessage>
  </>;
}
```

## 16. `src/components/layout/MainContent.jsx`

```jsx
import { use } from 'react';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { SECTIONS } from '../../utils/constants.js';

export default function MainContent({ children, activeSection, isPending, showFilterSummary = true }) {
  const section = SECTIONS.find(item => item.id === activeSection);
  let filterSummary = null;
  // use(), на відміну від useContext, дозволяє умовне читання контексту.
  if (showFilterSummary) {
    const { filters } = use(FilterContext);
    filterSummary = <span className="filter-summary">{filters.categories.length} категорії · {filters.regions.length} регіони</span>;
  }
  return <main className="main-content" id="main-content">
    <div className="page-heading"><div><p className="eyebrow">АНАЛІТИКА ВАШОГО БІЗНЕСУ</p><h1>{section.label}</h1><p>{section.description}</p></div>{filterSummary}</div>
    <div className="page-content" aria-busy={isPending} style={{ opacity: isPending ? 0.6 : 1 }}>{children}</div>
    <footer className="main-footer"><span>Analytics Dashboard</span><span>Демонстраційні дані · UAH / ₴</span></footer>
  </main>;
}
```

## 17. `src/components/layout/Sidebar.jsx`

```jsx
import { SECTIONS } from '../../utils/constants.js';
import FilterPanel from '../common/FilterPanel.jsx';
import Icon from '../ui/Icon.jsx';

export default function Sidebar({ activeSection, onSectionChange, isPending }) {
  return <aside className="sidebar">
    <p className="nav-caption">РОБОЧИЙ ПРОСТІР</p>
    <nav className="section-nav" aria-label="Розділи дашборду" aria-busy={isPending}>
      {SECTIONS.map(section => <button key={section.id} type="button"
        className={activeSection === section.id ? 'nav-item active' : 'nav-item'}
        aria-current={activeSection === section.id ? 'page' : undefined}
        onClick={() => onSectionChange(section.id)}>
        <Icon name={section.icon} /><span>{section.label}</span>
        {activeSection === section.id && <span className="active-dot" />}
      </button>)}
    </nav>
    <FilterPanel />
    <div className="sidebar-footer"><span className="live-dot" />Mock API підключено<br /><small>Навчальний проєкт · React 19</small></div>
  </aside>;
}
```

## 18. `src/components/ui/Button.jsx`

```jsx
export default function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  return <button type={type} className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}
```

## 19. `src/components/ui/ErrorMessage.jsx`

```jsx
export default function ErrorMessage({ children }) {
  return children ? <div className="message message-error" role="alert">{children}</div> : null;
}
```

## 20. `src/components/ui/Icon.jsx`

```jsx
const paths = {
  overview: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z', 'M14 14h7v7h-7z'],
  sales: ['M3 3v18h18', 'M7 16V11', 'M12 16V7', 'M17 16V4'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  analytics: ['M3 3v18h18', 'M6 15l4-5 4 3 6-8'],
  refresh: ['M20 7v5h-5', 'M4 17v-5h5', 'M6 7a7 7 0 0 1 11-2l3 3', 'M18 17a7 7 0 0 1-11 2l-3-3'],
  sun: ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8', 'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5'],
  moon: ['M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z'],
  search: ['M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15', 'M16 16l5 5'],
  money: ['M3 5h18v14H3z', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8', 'M6 12h.01M18 12h.01'],
  cart: ['M2 3h3l3 12h10l3-9H6', 'M9 19h.01M18 19h.01'],
  box: ['M12 2l10 5-10 5L2 7l10-5Z', 'M2 7v10l10 5 10-5V7', 'M12 12v10', 'M7 4.5l10 5'],
  plus: ['M12 5v14M5 12h14'],
  heart: ['M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z'],
};
export default function Icon({ name, size = 20, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {(paths[name] ?? paths.analytics).map((path, index) => <path key={index} d={path} />)}
  </svg>;
}
```

## 21. `src/components/ui/Input.jsx`

```jsx
import { useId } from 'react';

export default function Input({ label, hint, error, id: providedId, className = '', ...props }) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;
  return <div className={`field ${className}`}>
    <label htmlFor={id}>{label}</label>
    <input id={id} aria-describedby={describedBy} aria-invalid={Boolean(error)} {...props} />
    {hint && <small id={hintId} className="field-hint">{hint}</small>}
    {error && <small id={errorId} className="field-error">{error}</small>}
  </div>;
}
```

## 22. `src/components/ui/LoadingSpinner.jsx`

```jsx
export default function LoadingSpinner({ label = 'Завантаження...', compact = false }) {
  return <span className={`loading-spinner ${compact ? 'compact' : ''}`} role="status">
    <span className="spinner" aria-hidden="true" />{label}
  </span>;
}
```

## 23. `src/components/ui/Select.jsx`

```jsx
import { useId } from 'react';

export default function Select({ label, error, hint, children, id: providedId, className = '', ...props }) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  return <div className={`field ${className}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <select id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props}>{children}</select>
    {hint && <small id={`${id}-hint`} className="field-hint">{hint}</small>}
    {error && <small id={`${id}-error`} className="field-error">{error}</small>}
  </div>;
}
```

## 24. `src/components/ui/ThemeToggle.jsx`

```jsx
import { use } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';
import Icon from './Icon.jsx';
import Button from './Button.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = use(ThemeContext);
  return <Button variant="secondary" className="theme-toggle" onClick={toggleTheme}
    aria-label={theme === 'light' ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'}
    aria-pressed={theme === 'dark'}>
    <Icon name={theme === 'light' ? 'sun' : 'moon'} />
    <span>{theme === 'light' ? 'Світла' : 'Темна'}</span>
  </Button>;
}
```

## 25. `src/components/widgets/AsyncDataWidget.jsx`

```jsx
import { Suspense, use, useId, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import useDataLoader from '../../hooks/useDataLoader.js';
import { currency, number } from '../../utils/formatters.js';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorBoundary from '../common/ErrorBoundary.jsx';

function DataDisplay({ resourceKey, period, filters, forceError }) {
  const data = useDataLoader(resourceKey, period, filters, forceError);
  const maxRevenue = Math.max(...data.regions.map(item => item.revenue), 1);
  return <div className="async-content">
    <div className="analytics-metrics">
      <div><span>Середній чек</span><strong>{currency(data.averageOrder)}</strong><small>Виконані замовлення</small></div>
      <div><span>Частка виконаних</span><strong>{data.conversion.toFixed(1)}%</strong><small>Від усіх замовлень періоду</small></div>
      <div><span>Активні користувачі</span><strong>{number(data.activeUsers)}</strong><small>У вибраних регіонах</small></div>
    </div>
    <h3>Дохід за регіонами</h3>
    <ul className="region-metrics">{data.regions.map(item => <li key={item.region}><div><span>{item.region}</span><strong>{currency(item.revenue)}</strong></div><progress value={item.revenue} max={maxRevenue} aria-label={`Дохід у регіоні ${item.region}`} /></li>)}</ul>
    {data.regions.length === 0 && <div className="empty-state">Оберіть регіони у фільтрах</div>}
    <p className="field-hint">Оновлено: {new Date(data.updatedAt).toLocaleTimeString('uk-UA')}</p>
  </div>;
}
export default function AsyncDataWidget() {
  const id = useId();
  const { period, version } = use(DataContext);
  const { filters } = use(FilterContext);
  const [reload, setReload] = useState(0);
  const [forceError, setForceError] = useState(false);
  const resourceKey = JSON.stringify([period, filters, version, reload, forceError]);
  function retry() { setForceError(false); setReload(current => current + 1); }
  return <section className="widget async-widget">
    <div className="widget-heading"><div><h2>Поглиблена аналітика</h2><p>Асинхронні дані з mock API</p></div><Button variant="secondary" onClick={() => setReload(current => current + 1)}><Icon name="refresh" />Перезавантажити</Button></div>
    <label className="check-label demo-control" htmlFor={`${id}-fail`}><input id={`${id}-fail`} type="checkbox" checked={forceError} onChange={event => setForceError(event.target.checked)} />Імітувати помилку аналітики</label>
    <ErrorBoundary key={resourceKey} onRetry={retry}>
      <Suspense fallback={<div className="async-loading"><LoadingSpinner label="Завантаження аналітики..." /><p>Готуємо показники за обраний період</p></div>}>
        <DataDisplay resourceKey={resourceKey} period={period} filters={filters} forceError={forceError} />
      </Suspense>
    </ErrorBoundary>
  </section>;
}
```

## 26. `src/components/widgets/LiveSearch.jsx`

```jsx
import { use, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { filterProducts } from '../../utils/selectors.js';
import useDeferredSearch from '../../hooks/useDeferredSearch.js';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import SearchResults from '../common/SearchResults.jsx';

export default function LiveSearch() {
  const { products, users } = use(DataContext);
  const { filters } = use(FilterContext);
  const [type, setType] = useState('products');
  const { searchTerm, setSearchTerm, deferredSearchTerm, isPending } = useDeferredSearch();
  const data = useMemo(() => type === 'products'
    ? filterProducts(products, filters).map(item => ({ ...item, kind: 'product' }))
    : users.filter(user => filters.regions.includes(user.region)).map(item => ({ ...item, kind: 'user' })), [products, users, filters, type]);
  return <section className="widget live-search">
    <div className="widget-heading"><div><h2>Швидкий пошук</h2><p>Знайдіть потрібний продукт або користувача</p></div><span className="small-badge">LIVE</span></div>
    <div className="search-controls">
      <Input label="Пошук" type="search" placeholder="Введіть назву або ім’я..." value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
      <Select label="Шукати серед" value={type} onChange={event => setType(event.target.value)}><option value="products">Продуктів</option><option value="users">Користувачів</option></Select>
    </div>
    {isPending && <LoadingSpinner label="Завантаження результатів..." compact />}
    <div aria-busy={isPending} style={{ opacity: isPending ? 0.6 : 1 }}>
      <SearchResults data={data} query={deferredSearchTerm} />
    </div>
  </section>;
}
```

## 27. `src/components/widgets/OrdersTable.jsx`

```jsx
import { use, useId, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import useOptimisticOrder from '../../hooks/useOptimisticOrder.js';
import { PAGE_SIZE, STATUSES } from '../../utils/constants.js';
import { filterOrders } from '../../utils/selectors.js';
import { currency } from '../../utils/formatters.js';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import Pagination from '../common/Pagination.jsx';

export default function OrdersTable() {
  const id = useId();
  const { orders, products, period, commitOrder } = use(DataContext);
  const { filters } = use(FilterContext);
  const { optimisticOrders, changeStatus, changeArchive, isPending, error } = useOptimisticOrder(orders, commitOrder);
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [showArchive, setShowArchive] = useState(false);
  const [forceError, setForceError] = useState(false);
  const matching = useMemo(() => filterOrders(optimisticOrders, products, filters, period, { includeArchived: showArchive })
    .filter(order => Boolean(order.archived) === showArchive && (status === 'all' || order.status === status))
    .sort((a, b) => new Date(b.date) - new Date(a.date)), [optimisticOrders, products, filters, period, status, showArchive]);
  const totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = matching.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  return <section className="widget orders-widget">
    <div className="widget-heading"><div><h2>Останні замовлення</h2><p>Статуси зберігаються автоматично</p></div><span className="count-badge">{matching.length}</span></div>
    <div className="table-filters">
      <Select label="Статус" value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}>
        <option value="all">Усі статуси</option>{STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </Select>
      <label className="check-label" htmlFor={`${id}-archive`}><input id={`${id}-archive`} type="checkbox" checked={showArchive} onChange={event => { setShowArchive(event.target.checked); setPage(1); }} />Показати архів</label>
      <label className="check-label demo-control" htmlFor={`${id}-fail`}><input id={`${id}-fail`} type="checkbox" checked={forceError} onChange={event => setForceError(event.target.checked)} />Імітувати помилку запиту</label>
    </div>
    <ErrorMessage>{error}</ErrorMessage>
    {isPending && <LoadingSpinner label="Збереження змін..." compact />}
    <div className="table-scroll"><table className="data-table">
      <caption className="sr-only">Останні замовлення за обраний період</caption>
      <thead><tr><th scope="col">ID</th><th scope="col">Клієнт</th><th scope="col">Продукт</th><th scope="col">Сума</th><th scope="col">Статус</th><th scope="col">Дії</th></tr></thead>
      <tbody>{visible.map(order => <tr key={order.id} className={order.saving ? 'optimistic-saving' : ''}>
        <td className="order-id">#{order.id}</td><td>{order.customer}</td><td className="product-cell">{order.product}<small>{order.quantity} шт. · {order.region}</small></td><td className="amount-cell">{currency(order.amount)}</td>
        <td><Select className={`status-select ${order.status}`} aria-label={`Статус замовлення #${order.id}`} value={order.status} disabled={order.saving}
          onChange={event => changeStatus(order.id, event.target.value, forceError)}>
          {STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
        </Select>{order.saving && <small className="saving-text">збереження...</small>}</td>
        <td><Button variant="text" disabled={order.saving} aria-label={`${showArchive ? 'Відновити' : 'Архівувати'} замовлення #${order.id}`}
          onClick={() => changeArchive(order.id, !showArchive, forceError)}>{showArchive ? 'Відновити' : 'Архів'}</Button></td>
      </tr>)}</tbody>
    </table>{visible.length === 0 && <div className="empty-state">Замовлень за цими фільтрами немає</div>}</div>
    <div className="table-footer"><span>{visible.length} з {matching.length} записів</span><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} label="Сторінки замовлень" /></div>
  </section>;
}
```

## 28. `src/components/widgets/PeriodComparison.jsx`

```jsx
import { use, useEffect, useRef, useState, useTransition } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { loadPeriodComparison } from '../../utils/api.js';
import { PERIODS } from '../../utils/constants.js';
import { getMetrics } from '../../utils/selectors.js';
import { currency, number, percentChange } from '../../utils/formatters.js';
import Select from '../ui/Select.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

export default function PeriodComparison() {
  const data = use(DataContext);
  const { filters } = use(FilterContext);
  const [periodA, setPeriodA] = useState('week');
  const [periodB, setPeriodB] = useState('month');
  const [comparison, setComparison] = useState(() => [getMetrics(data, filters, 'week'), getMetrics(data, filters, 'month')]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const latestRequest = useRef(0);
  useEffect(() => {
    const requestId = ++latestRequest.current;
    setError('');
    startTransition(async () => {
      try {
        const next = await loadPeriodComparison(periodA, periodB, filters);
        if (latestRequest.current === requestId) startTransition(() => setComparison(next));
      } catch (requestError) {
        if (latestRequest.current === requestId) setError(requestError.message);
      }
    });
    return () => { latestRequest.current += 1; };
  }, [periodA, periodB, filters, data.version]);
  const metrics = [['revenue', 'Дохід', currency], ['orders', 'Замовлення', number], ['users', 'Нові користувачі', number], ['averageOrder', 'Середній чек', currency]];
  return <section className="widget">
    <div className="widget-heading"><div><h2>Порівняння періодів</h2><p>Зміна показників періоду B відносно A</p></div>{isPending && <LoadingSpinner compact label="Оновлення..." />}</div>
    <div className="form-row">
      <Select label="Період A" value={periodA} onChange={event => setPeriodA(event.target.value)}>{PERIODS.map(period => <option key={period.id} value={period.id}>{period.label}</option>)}</Select>
      <Select label="Період B" value={periodB} onChange={event => setPeriodB(event.target.value)}>{PERIODS.map(period => <option key={period.id} value={period.id}>{period.label}</option>)}</Select>
    </div>
    <ErrorMessage>{error}</ErrorMessage>
    <div className="table-scroll" aria-busy={isPending} style={{ opacity: isPending ? 0.5 : 1 }}><table className="data-table comparison-table"><caption className="sr-only">Показники двох періодів</caption>
      <thead><tr><th scope="col">Показник</th><th scope="col">Період A</th><th scope="col">Період B</th><th scope="col">Зміна B / A</th></tr></thead>
      <tbody>{metrics.map(([key, label, format]) => {
        const change = percentChange(comparison[1][key], comparison[0][key]);
        return <tr key={key}><th scope="row">{label}</th><td>{format(comparison[0][key])}</td><td>{format(comparison[1][key])}</td><td className={`stats-change ${change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral'}`}>
          {change === null ? 'Немає бази' : `${change > 0 ? '↑ +' : change < 0 ? '↓ ' : '→ '}${change}%`}
        </td></tr>;
      })}</tbody>
    </table></div>
    <p className="field-hint comparison-note">Тиждень — останні 7 днів, місяць — 30 днів, рік — 12 календарних місяців. Нульова база не дає визначеного відсотка зростання.</p>
  </section>;
}
```

## 29. `src/components/widgets/SalesChart.jsx`

```jsx
import { use, useEffect, useId, useRef, useState, useTransition } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { loadChartData } from '../../utils/api.js';
import { CATEGORIES, PERIODS } from '../../utils/constants.js';
import { buildChartData } from '../../utils/selectors.js';
import { currency } from '../../utils/formatters.js';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import Select from '../ui/Select.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

export default function SalesChart() {
  const titleId = useId();
  const descriptionId = useId();
  const data = use(DataContext);
  const { filters } = use(FilterContext);
  const [chartData, setChartData] = useState(() => buildChartData(data, filters, data.period));
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const latestRequest = useRef(0);
  useEffect(() => {
    const requestId = ++latestRequest.current;
    setError('');
    startTransition(async () => {
      try {
        const next = await loadChartData(data.period, filters);
        if (latestRequest.current === requestId) startTransition(() => setChartData(next));
      } catch (requestError) {
        if (latestRequest.current === requestId) setError(requestError.message);
      }
    });
    return () => { latestRequest.current += 1; };
  }, [data.period, data.version, filters]);
  const total = chartData.reduce((sum, point) => sum + point.total, 0);
  const maximum = Math.max(1000, Math.ceil(Math.max(...chartData.map(point => point.total), 1) / 5000) * 5000);
  const plot = { left: 66, top: 18, width: 580, height: 192 };
  const step = plot.width / chartData.length;
  const barWidth = Math.max(3, Math.min(32, step * 0.62));
  return <section className="widget sales-chart">
    <div className="widget-heading"><div><h2>Динаміка продажів</h2><p>Дохід від виконаних замовлень</p></div>
      <Select label="Період графіка" className="compact-field" value={data.period} onChange={event => data.setPeriod(event.target.value)}>
        {PERIODS.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </Select>
    </div>
    <div className="chart-summary"><strong>{currency(total)}</strong>{isPending && <LoadingSpinner compact label="Оновлення графіка..." />}</div>
    <ErrorMessage>{error}</ErrorMessage>
    <div aria-busy={isPending} style={{ opacity: isPending ? 0.5 : 1 }} className="chart-body">
      <svg viewBox="0 0 670 248" role="img" aria-labelledby={titleId} aria-describedby={descriptionId}>
        <title id={titleId}>Продажі за категоріями</title><desc id={descriptionId}>Загальний дохід {currency(total)}. Детальні суми доступні у підписах стовпчиків.</desc>
        {[0, 1, 2, 3, 4].map(tick => {
          const y = plot.top + plot.height - tick * plot.height / 4;
          return <g key={tick}><line x1={plot.left} x2={plot.left + plot.width} y1={y} y2={y} className="chart-grid" />
            <text x={plot.left - 12} y={y + 4} textAnchor="end" className="chart-label">{new Intl.NumberFormat('uk-UA', { notation: 'compact', maximumFractionDigits: 0 }).format(maximum * tick / 4)}</text></g>;
        })}
        {chartData.map((point, index) => {
          let accumulated = 0;
          const x = plot.left + index * step + (step - barWidth) / 2;
          return <g key={point.time}><title>{`${point.label}: ${currency(point.total)}`}</title>
            {CATEGORIES.map(category => {
              const height = point[category.id] / maximum * plot.height;
              const y = plot.top + plot.height - accumulated - height;
              accumulated += height;
              return <rect key={category.id} x={x} y={y} width={barWidth} height={height} fill={category.color} rx="2" />;
            })}
            {index % Math.ceil(chartData.length / 7) === 0 && <text x={x + barWidth / 2} y="236" textAnchor="middle" className="chart-label">{point.label}</text>}
          </g>;
        })}
      </svg>
      {total === 0 && <p className="chart-empty">За цей період немає виконаних замовлень</p>}
    </div>
    <ul className="chart-legend">{CATEGORIES.map(category => <li key={category.id}><span style={{ background: category.color }} />{category.label}</li>)}</ul>
  </section>;
}
```

## 30. `src/components/widgets/SalesForm.jsx`

```jsx
import { use, useActionState, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { submitSale } from '../../actions/salesActions.js';
import { EMPTY_ACTION_STATE } from '../../utils/constants.js';
import { currency } from '../../utils/formatters.js';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

const initialValues = { customer: '', product: '', quantity: '1', price: '' };
export default function SalesForm() {
  const { products, commitSale } = use(DataContext);
  const [values, setValues] = useState(initialValues);
  const [state, formAction, isPending] = useActionState(async (previousState, formData) => {
    const result = await submitSale(previousState, formData);
    if (result.success) { commitSale(result); setValues(initialValues); }
    return result;
  }, EMPTY_ACTION_STATE);
  const product = products.find(item => item.id === Number(values.product));
  const update = event => setValues(current => ({ ...current, [event.target.name]: event.target.value }));
  // Очищуємо керовані поля станом лише після успіху; автоматичний reset скасовуємо.
  return <section className="widget">
    <div className="widget-heading"><div><h2>Додати продаж</h2><p>Новий запис одразу потрапить до замовлень</p></div><span className="widget-icon"><Icon name="plus" /></span></div>
    <form action={formAction} noValidate className="data-form" aria-busy={isPending} onReset={event => event.preventDefault()}>
      <Input label="Клієнт" name="customer" value={values.customer} onChange={update} error={state.errors?.customer} placeholder="Ім’я та прізвище" required disabled={isPending} />
      <Select label="Продукт" name="product" value={values.product} required disabled={isPending} error={state.errors?.product}
        onChange={event => { const selected = products.find(item => item.id === Number(event.target.value)); setValues(current => ({ ...current, product: event.target.value, price: selected ? String(selected.price) : '' })); }}>
        <option value="">Оберіть продукт</option>{products.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </Select>
      <div className="form-row">
        <Input label="Кількість" name="quantity" type="number" min="1" step="1" value={values.quantity} onChange={update} required disabled={isPending} error={state.errors?.quantity} hint={product ? `У наявності: ${product.stock} шт.` : 'Кількість одиниць продукту'} />
        <Input label="Ціна, грн" name="price" type="number" min="0.01" step="0.01" value={values.price} onChange={update} required disabled={isPending} error={state.errors?.price} />
      </div>
      <div className="form-total"><span>Сума продажу</span><strong>{currency(Math.max(0, Number(values.price) * Number(values.quantity)) || 0)}</strong></div>
      <Button type="submit" disabled={isPending}><Icon name="plus" />{isPending ? 'Додавання...' : 'Додати продаж'}</Button>
      {isPending && <p className="field-hint" role="status">Зберігаємо продаж у mock API...</p>}
      <ErrorMessage>{state.error}</ErrorMessage>
      {state.success && <p className="message message-success" role="status">{state.message}</p>}
    </form>
  </section>;
}
```

## 31. `src/components/widgets/StatsCard.jsx`

```jsx
import { useId } from 'react';
import Icon from '../ui/Icon.jsx';

export default function StatsCard({ title, value, change, icon }) {
  const titleId = useId();
  const valueId = useId();
  const direction = change === null ? 'neutral' : change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
  const arrow = change > 0 ? '↑' : change < 0 ? '↓' : '→';
  return <div className="stats-card" role="region" aria-labelledby={titleId} aria-describedby={valueId}>
    <div className="stats-top"><h3 id={titleId}>{title}</h3><span className={`stats-icon ${icon}`}><Icon name={icon} /></span></div>
    <div id={valueId} className="stats-value">{value}</div>
    <div className="stats-bottom"><span className={`stats-change ${direction}`}>
      {change === null ? 'Немає бази порівняння' : `${arrow} ${change > 0 ? '+' : ''}${change}%`}
    </span><span>{icon === 'box' ? 'поточний залишок' : 'до попереднього періоду'}</span></div>
  </div>;
}
```

## 32. `src/components/widgets/TopProducts.jsx`

```jsx
import { use, useActionState, useId, useMemo, useOptimistic, useState, useTransition } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { createComment, setProductLike } from '../../utils/api.js';
import { filterProducts } from '../../utils/selectors.js';
import { currency, date, number } from '../../utils/formatters.js';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Icon from '../ui/Icon.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

function FavoriteButton({ product, commitProduct }) {
  const [liked, setOptimisticLike] = useOptimistic(product.liked);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  function toggleLike() {
    setError('');
    startTransition(async () => {
      const next = !liked;
      setOptimisticLike(next);
      try {
        const updated = await setProductLike(product.id, next);
        startTransition(() => commitProduct(updated));
      } catch (requestError) { setError(requestError.message); }
    });
  }
  return <div className="favorite-control"><Button variant="text" className={liked ? 'liked' : ''} disabled={isPending} onClick={toggleLike}
    aria-label={`${liked ? 'Прибрати вподобання' : 'Вподобати'}: ${product.name}`} aria-pressed={liked}>
    <Icon name="heart" fill={liked ? 'currentColor' : 'none'} size={18} />
  </Button>{isPending && <small className="saving-text">збереження...</small>}{error && <small className="field-error" role="alert">{error}</small>}</div>;
}

function ProductComments({ product, commitProduct }) {
  const id = useId();
  const [text, setText] = useState('');
  const [forceError, setForceError] = useState(false);
  const [comments, addOptimisticComment] = useOptimistic(product.comments, (current, comment) => [...current, comment]);
  const [state, formAction, isPending] = useActionState(async (previousState, formData) => {
    const value = String(formData.get('comment') ?? '').trim();
    if (value.length < 2 || value.length > 300) return { error: 'Коментар: від 2 до 300 символів.' };
    // form action вже є Action: додатковий startTransition тут не потрібен.
    addOptimisticComment({ id: `temporary-${crypto.randomUUID()}`, text: value, date: new Date().toISOString(), saving: true });
    try {
      // Режим помилки належить конкретній відправці форми.
      const updated = await createComment(product.id, value, { forceError: formData.get('forceError') === 'true' });
      commitProduct(updated);
      setText('');
      return { success: true, message: 'Коментар збережено.' };
    } catch (error) { return { error: error.message }; }
  }, {});
  return <div className="product-comments">
    <h3>Коментарі: {product.name}</h3>
    {comments.length === 0 ? <p className="muted">Коментарів поки немає</p> : <ul className="comment-list">
      {comments.map(comment => <li key={comment.id} className={comment.saving ? 'optimistic-saving' : ''}><p>{comment.text}</p><small>{comment.saving ? 'збереження...' : date(comment.date)}</small></li>)}
    </ul>}
    <form action={formAction} noValidate className="data-form" aria-busy={isPending} onReset={event => event.preventDefault()}>
      <Input label="Новий коментар" name="comment" value={text} onChange={event => setText(event.target.value)} maxLength="300" disabled={isPending} placeholder="Від 2 до 300 символів" />
      <label className="check-label demo-control" htmlFor={`${id}-error`}><input type="checkbox" name="forceError" value="true" id={`${id}-error`} checked={forceError} onChange={event => setForceError(event.target.checked)} disabled={isPending} />Імітувати помилку коментаря</label>
      <Button type="submit" variant="secondary" disabled={isPending}>{isPending ? 'Збереження...' : 'Додати коментар'}</Button>
      <ErrorMessage>{state.error}</ErrorMessage>
      {state.success && <p className="message message-success" role="status">{state.message}</p>}
    </form>
  </div>;
}

export default function TopProducts() {
  const { products, commitProduct } = use(DataContext);
  const { filters } = use(FilterContext);
  const [sortBy, setSortBy] = useState('salesCount');
  const [selectedId, setSelectedId] = useState('');
  const ranked = useMemo(() => filterProducts(products, filters).sort((a, b) => b[sortBy] - a[sortBy]).slice(0, 10), [products, filters, sortBy]);
  const maximum = Math.max(...ranked.map(product => product[sortBy]), 1);
  const selectedProduct = ranked.find(product => product.id === Number(selectedId)) ?? ranked[0];
  return <section className="widget">
    <div className="widget-heading"><div><h2>Топ продуктів</h2><p>10 лідерів за весь час · за поточними фільтрами</p></div>
      <Select label="Рейтинг за" className="compact-field" value={sortBy} onChange={event => setSortBy(event.target.value)}><option value="salesCount">Продажами</option><option value="revenue">Доходом</option></Select>
    </div>
    <ol className="top-products">{ranked.map((product, index) => <li key={product.id}>
      <span className="rank">{String(index + 1).padStart(2, '0')}</span><div className="product-ranking"><div><strong>{product.name}</strong><span>{currency(product.revenue)}</span></div>
        <small>{number(product.salesCount)} проданих одиниць</small><progress value={product[sortBy]} max={maximum} aria-label={`Рейтинг ${product.name}`} />
      </div><FavoriteButton product={product} commitProduct={commitProduct} />
    </li>)}</ol>
    {ranked.length === 0 ? <div className="empty-state">Немає продуктів за поточними фільтрами</div> : <>
      <Select label="Продукт для коментарів" value={selectedProduct.id} onChange={event => setSelectedId(event.target.value)}>{ranked.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}</Select>
      <ProductComments key={selectedProduct.id} product={selectedProduct} commitProduct={commitProduct} />
    </>}
  </section>;
}
```

## 33. `src/components/widgets/UserForm.jsx`

```jsx
import { use, useActionState, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { addUser } from '../../actions/userActions.js';
import { EMPTY_ACTION_STATE } from '../../utils/constants.js';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

const initialValues = { name: '', email: '', role: 'user' };
export default function UserForm() {
  const { commitUser } = use(DataContext);
  const [values, setValues] = useState(initialValues);
  const [state, formAction, isPending] = useActionState(async (previousState, formData) => {
    const result = await addUser(previousState, formData);
    if (result.success) { commitUser(result.user); setValues(initialValues); }
    return result;
  }, EMPTY_ACTION_STATE);
  const update = event => setValues(current => ({ ...current, [event.target.name]: event.target.value }));
  // Помилка зберігає введені значення. Очищення після успіху виконує setValues.
  return <section className="widget">
    <div className="widget-heading"><div><h2>Додати користувача</h2><p>Унікальність email перевіряється асинхронно</p></div><span className="widget-icon"><Icon name="users" /></span></div>
    <form action={formAction} noValidate className="data-form" aria-busy={isPending} onReset={event => event.preventDefault()}>
      <Input label="Ім’я" name="name" value={values.name} onChange={update} error={state.errors?.name} placeholder="Ім’я та прізвище" autoComplete="name" required disabled={isPending} />
      <Input label="Email" name="email" type="email" value={values.email} onChange={update} error={state.errors?.email} placeholder="name@example.com" autoComplete="email" required disabled={isPending}
        hint="Для перевірки помилки: admin@example.com або test@example.com." />
      <Select label="Роль" name="role" value={values.role} onChange={update} required disabled={isPending} error={state.errors?.role}><option value="user">User</option><option value="admin">Admin</option></Select>
      <Button type="submit" disabled={isPending}><Icon name="plus" />{isPending ? 'Перевірка та додавання...' : 'Додати користувача'}</Button>
      {isPending && <p className="field-hint" role="status">Перевіряємо email та зберігаємо дані...</p>}
      <ErrorMessage>{state.error}</ErrorMessage>
      {state.success && <p className="message message-success" role="status">{state.message}</p>}
    </form>
  </section>;
}
```

## 34. `src/components/widgets/UsersTable.jsx`

```jsx
import { memo, use, useId, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { PAGE_SIZE } from '../../utils/constants.js';
import { date } from '../../utils/formatters.js';
import useDeferredSearch from '../../hooks/useDeferredSearch.js';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import Pagination from '../common/Pagination.jsx';
import Highlight from '../common/Highlight.jsx';

const FilteredUsers = memo(function FilteredUsers({ users, query, activity, sortBy, page, setPage }) {
  const matching = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('uk-UA');
    return users.filter(user => user.name.toLocaleLowerCase('uk-UA').includes(needle)
      && (activity === 'all' || user.isActive === (activity === 'active')))
      .sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name, 'uk-UA') : new Date(b[sortBy]) - new Date(a[sortBy]));
  }, [users, query, activity, sortBy]);
  const totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = matching.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  return <>
    <p className="results-count">Знайдено користувачів: <strong>{matching.length}</strong></p>
    <div className="table-scroll"><table className="data-table users-table">
      <caption className="sr-only">Користувачі, відфільтровані за іменем та активністю</caption>
      <thead><tr><th scope="col">Ім’я / Email</th><th scope="col">Роль</th><th scope="col">Статус</th><th scope="col">Реєстрація</th><th scope="col">Активність</th></tr></thead>
      <tbody>{visible.map(user => <tr key={user.id}><td><div className="user-cell"><span className="avatar">{user.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span><div><strong><Highlight text={user.name} query={query} /></strong><small>{user.email}</small></div></div></td>
        <td><span className="role-badge">{user.role === 'admin' ? 'Admin' : 'User'}</span></td><td><span className={`status-badge ${user.isActive ? 'completed' : 'cancelled'}`}>{user.isActive ? 'Активний' : 'Неактивний'}</span></td><td>{date(user.registeredAt)}</td><td>{date(user.lastActivity)}</td>
      </tr>)}</tbody>
    </table>{visible.length === 0 && <div className="empty-state">Нічого не знайдено</div>}</div>
    <div className="table-footer"><span>{visible.length} з {matching.length} записів</span><Pagination label="Сторінки користувачів" currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} /></div>
  </>;
});
export default function UsersTable() {
  const id = useId();
  const { users } = use(DataContext);
  const { filters } = use(FilterContext);
  const regionalUsers = useMemo(() => users.filter(user => filters.regions.includes(user.region)), [users, filters.regions]);
  const { searchTerm, setSearchTerm, deferredSearchTerm, isPending } = useDeferredSearch();
  const [activity, setActivity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  return <section className="widget">
    <div className="widget-heading"><div><h2>Список користувачів</h2><p>Пошук, активність та історія реєстрацій</p></div><span className="count-badge">{regionalUsers.length}</span></div>
    <div className="search-controls"><Input label="Пошук за іменем" type="search" placeholder="Наприклад, Олександр..." value={searchTerm} onChange={event => { setSearchTerm(event.target.value); setPage(1); }} />
      <Select label="Сортування" value={sortBy} onChange={event => { setSortBy(event.target.value); setPage(1); }}><option value="name">Ім’я</option><option value="registeredAt">Дата реєстрації</option><option value="lastActivity">Активність</option></Select>
    </div>
    <fieldset className="activity-filters"><legend>Активність</legend>
      {[['all', 'Всі'], ['active', 'Активні'], ['inactive', 'Неактивні']].map(([value, label]) => <label key={value} htmlFor={`${id}-${value}`}>
        <input id={`${id}-${value}`} type="radio" name={`${id}-activity`} checked={activity === value} onChange={() => { setActivity(value); setPage(1); }} />{label}
      </label>)}
    </fieldset>
    {isPending && <LoadingSpinner label="Завантаження результатів..." compact />}
    <div aria-busy={isPending} style={{ opacity: isPending ? 0.6 : 1 }}><FilteredUsers users={regionalUsers} query={deferredSearchTerm} activity={activity} sortBy={sortBy} page={page} setPage={setPage} /></div>
  </section>;
}
```

## 35. `src/contexts/DataContext.jsx`

```jsx
import { createContext, useCallback, useMemo, useRef, useState, useTransition } from 'react';
import { fetchAnalyticsData, getSnapshot, loadDashboardData } from '../utils/api.js';

export const DataContext = createContext(null);
export function DataProvider({ children }) {
  const [data, setData] = useState(getSnapshot);
  const [period, setPeriod] = useState('month');
  const [version, setVersion] = useState(0);
  const [refreshError, setRefreshError] = useState('');
  const [isRefreshing, startTransition] = useTransition();
  const promiseCache = useRef(new Map());
  const bumpVersion = useCallback(() => setVersion(current => current + 1), []);
  const commitOrder = useCallback(order => {
    setData(current => ({ ...current, orders: current.orders.map(item => item.id === order.id ? order : item) }));
    bumpVersion();
  }, [bumpVersion]);
  const commitProduct = useCallback(product => {
    setData(current => ({ ...current, products: current.products.map(item => item.id === product.id ? product : item) }));
    bumpVersion();
  }, [bumpVersion]);
  const commitSale = useCallback(({ sale, product }) => {
    setData(current => ({ ...current, orders: [sale, ...current.orders],
      products: current.products.map(item => item.id === product.id ? product : item) }));
    bumpVersion();
  }, [bumpVersion]);
  const commitUser = useCallback(user => {
    setData(current => ({ ...current, users: [user, ...current.users] }));
    bumpVersion();
  }, [bumpVersion]);
  const getAnalyticsPromise = useCallback((key, selectedPeriod, filters, forceError) => {
    const cache = promiseCache.current;
    if (!cache.has(key)) {
      if (cache.size > 30) cache.clear();
      const promise = fetchAnalyticsData(selectedPeriod, filters, { forceError });
      // Зберігаємо саме початковий Promise; use() передає помилку ErrorBoundary.
      promise.catch(() => {});
      cache.set(key, promise);
    }
    return cache.get(key);
  }, []);
  const refreshData = useCallback(() => {
    setRefreshError('');
    startTransition(async () => {
      try {
        const snapshot = await loadDashboardData();
        startTransition(() => { setData(snapshot); promiseCache.current.clear(); bumpVersion(); });
      } catch (error) { setRefreshError(error.message); }
    });
  }, [bumpVersion]);
  const value = useMemo(() => ({
    ...data, period, setPeriod, version, isRefreshing, refreshError, refreshData,
    commitOrder, commitProduct, commitSale, commitUser, getAnalyticsPromise,
  }), [data, period, version, isRefreshing, refreshError, refreshData, commitOrder, commitProduct, commitSale, commitUser, getAnalyticsPromise]);
  return <DataContext value={value}>{children}</DataContext>;
}
```

## 36. `src/contexts/FilterContext.jsx`

```jsx
import { createContext, useMemo, useState, useTransition } from 'react';
import { DEFAULT_FILTERS } from '../utils/constants.js';

export const FilterContext = createContext(null);
export function FilterProvider({ children }) {
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isPending, startTransition] = useTransition();
  const value = useMemo(() => ({
    filters, draftFilters, isPending,
    updateFilters(patch) {
      const next = { ...draftFilters, ...patch };
      // Контролі оновлюються терміново; зміна даних — у transition.
      setDraftFilters(next);
      startTransition(() => setFilters(next));
    },
    resetFilters() {
      setDraftFilters(DEFAULT_FILTERS);
      startTransition(() => setFilters(DEFAULT_FILTERS));
    },
  }), [draftFilters, filters, isPending]);
  return <FilterContext value={value}>{children}</FilterContext>;
}
```

## 37. `src/contexts/ThemeContext.jsx`

```jsx
import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('analytics-dashboard-theme') === 'dark' ? 'dark' : 'light'; }
    catch { return 'light'; }
  });
  useEffect(() => {
    document.body.dataset.theme = theme;
    document.body.classList.toggle('theme-dark', theme === 'dark');
    try { localStorage.setItem('analytics-dashboard-theme', theme); } catch { /* Тема працює і без сховища. */ }
  }, [theme]);
  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme(current => current === 'light' ? 'dark' : 'light') }), [theme]);
  // useTheme не експортуємо: компоненти читають контекст через use().
  return <ThemeContext value={value}>{children}</ThemeContext>;
}
```

## 38. `src/data/mockOrders.js`

```javascript
import { mockProducts } from './mockProducts.js';
import { mockUsers } from './mockUsers.js';

const now = Date.now();
const statuses = ['completed', 'processing', 'completed', 'pending', 'completed', 'cancelled'];

export const mockOrders = Array.from({ length: 84 }, (_, index) => {
  const product = mockProducts[index % mockProducts.length];
  const quantity = 1 + index % 3;
  return {
    id: 1084 - index,
    customer: mockUsers[index % mockUsers.length].name,
    productId: product.id, product: product.name, quantity, price: product.price,
    amount: product.price * quantity, status: statuses[index % statuses.length],
    date: new Date(now - Math.floor(index / 3) * 6 * 86400000 - (index % 3) * 3600000).toISOString(),
    region: product.region, archived: false,
  };
});
```

## 39. `src/data/mockProducts.js`

```javascript
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
```

## 40. `src/data/mockSalesData.js`

```javascript
import { mockOrders } from './mockOrders.js';
import { mockProducts } from './mockProducts.js';
import { mockUsers } from './mockUsers.js';
import { DEFAULT_FILTERS } from '../utils/constants.js';
import { buildChartData } from '../utils/selectors.js';

const snapshot = { orders: mockOrders, products: mockProducts, users: mockUsers };
export const mockSalesData = {
  daily: buildChartData(snapshot, DEFAULT_FILTERS, 'today'),
  weekly: buildChartData(snapshot, DEFAULT_FILTERS, 'week'),
  monthly: buildChartData(snapshot, DEFAULT_FILTERS, 'month'),
  yearly: buildChartData(snapshot, DEFAULT_FILTERS, 'year'),
};
```

## 41. `src/data/mockUsers.js`

```javascript
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
```

## 42. `src/hooks/useDataLoader.js`

```javascript
import { use } from 'react';
import { DataContext } from '../contexts/DataContext.jsx';

export default function useDataLoader(key, period, filters, forceError = false) {
  const { getAnalyticsPromise } = use(DataContext);
  const dataPromise = getAnalyticsPromise(key, period, filters, forceError);
  // Promise стабільний для одного ключа. Компонент має бути в Suspense.
  return use(dataPromise);
}
```

## 43. `src/hooks/useDeferredSearch.js`

```javascript
import { useDeferredValue, useState } from 'react';

export default function useDeferredSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  return { searchTerm, setSearchTerm, deferredSearchTerm, isPending: searchTerm !== deferredSearchTerm };
}
```

## 44. `src/hooks/useOptimisticOrder.js`

```javascript
import { useOptimistic, useRef, useState, useTransition } from 'react';
import { archiveOrder, updateOrderStatus } from '../actions/orderActions.js';

export function optimisticOrderReducer(orders, { id, patch }) {
  return orders.map(order => order.id === id ? { ...order, ...patch, saving: true } : order);
}
export default function useOptimisticOrder(orders, commitOrder) {
  const [optimisticOrders, updateOptimisticOrders] = useOptimistic(orders, optimisticOrderReducer);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const inFlight = useRef(new Set());
  function mutate(id, patch, request) {
    if (inFlight.current.has(id)) return;
    inFlight.current.add(id);
    setError('');
    // Optimistic setter обов’язково всередині Action/transition.
    startTransition(async () => {
      updateOptimisticOrders({ id, patch });
      try {
        const updated = await request();
        // Оновлення після await теж явно позначаємо transition.
        startTransition(() => commitOrder(updated));
      } catch (requestError) {
        setError(requestError.message);
        // Базовий orders не змінено — React автоматично відкочує UI.
      } finally { inFlight.current.delete(id); }
    });
  }
  return {
    optimisticOrders, isPending, error,
    changeStatus: (id, status, forceError) => mutate(id, { status }, () => updateOrderStatus(id, status, { forceError })),
    changeArchive: (id, archived, forceError) => mutate(id, { archived }, () => archiveOrder(id, archived, { forceError })),
  };
}
```

## 45. `src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/themes.css';
import './styles/dashboard.css';
import './styles/widgets.css';

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
```

## 46. `src/pages/Dashboard/Analytics.jsx`

```jsx
import PeriodComparison from '../../components/widgets/PeriodComparison.jsx';
import AsyncDataWidget from '../../components/widgets/AsyncDataWidget.jsx';
import SalesChart from '../../components/widgets/SalesChart.jsx';

export default function Analytics() {
  return <div className="page-grid"><PeriodComparison /><AsyncDataWidget /><SalesChart /></div>;
}
```

## 47. `src/pages/Dashboard/Dashboard.jsx`

```jsx
import { useState, useTransition } from 'react';
import Header from '../../components/layout/Header.jsx';
import Sidebar from '../../components/layout/Sidebar.jsx';
import MainContent from '../../components/layout/MainContent.jsx';
import Overview from './Overview.jsx';
import Sales from './Sales.jsx';
import Users from './Users.jsx';
import Analytics from './Analytics.jsx';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isPending, startTransition] = useTransition();
  const pages = { overview: Overview, sales: Sales, users: Users, analytics: Analytics };
  const ActivePage = pages[activeSection];
  return <div className="dashboard">
    <a className="skip-link" href="#main-content">Перейти до вмісту</a>
    <Header />
    <div className="dashboard-body"><Sidebar activeSection={activeSection} onSectionChange={section => startTransition(() => setActiveSection(section))} isPending={isPending} />
      <MainContent activeSection={activeSection} isPending={isPending} showFilterSummary={activeSection !== 'users'}><ActivePage /></MainContent>
    </div>
  </div>;
}
```

## 48. `src/pages/Dashboard/Overview.jsx`

```jsx
import { use, useMemo } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { currency, number } from '../../utils/formatters.js';
import { getStats } from '../../utils/selectors.js';
import StatsCard from '../../components/widgets/StatsCard.jsx';
import LiveSearch from '../../components/widgets/LiveSearch.jsx';
import OrdersTable from '../../components/widgets/OrdersTable.jsx';
import SalesChart from '../../components/widgets/SalesChart.jsx';

export default function Overview() {
  const { orders, products, users, period } = use(DataContext);
  const { filters } = use(FilterContext);
  const stats = useMemo(() => getStats({ orders, products, users }, filters, period), [orders, products, users, filters, period]);
  return <div className="overview page-grid">
    <div className="stats-grid">
      <StatsCard title="Загальний дохід" value={currency(stats.revenue.value)} change={stats.revenue.change} icon="money" />
      <StatsCard title="Кількість замовлень" value={number(stats.orders.value)} change={stats.orders.change} icon="cart" />
      <StatsCard title="Нові користувачі" value={number(stats.users.value)} change={stats.users.change} icon="users" />
      <StatsCard title="Товари в наявності" value={number(stats.stock.value)} change={0} icon="box" />
    </div>
    <div className="overview-top-grid"><SalesChart /><LiveSearch /></div>
    <OrdersTable />
  </div>;
}
```

## 49. `src/pages/Dashboard/Sales.jsx`

```jsx
import SalesForm from '../../components/widgets/SalesForm.jsx';
import TopProducts from '../../components/widgets/TopProducts.jsx';
import OrdersTable from '../../components/widgets/OrdersTable.jsx';

export default function Sales() {
  return <div className="page-grid"><div className="split-grid"><SalesForm /><TopProducts /></div><OrdersTable /></div>;
}
```

## 50. `src/pages/Dashboard/Users.jsx`

```jsx
import UsersTable from '../../components/widgets/UsersTable.jsx';
import UserForm from '../../components/widgets/UserForm.jsx';

export default function Users() {
  return <div className="users-layout"><UsersTable /><UserForm /></div>;
}
```

## 51. `src/styles/dashboard.css`

```css
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, 'Segoe UI', Arial, sans-serif; font-size: 14px; color: var(--text-primary); background: var(--bg-primary); transition: color .2s, background .2s; }
button, input, select { font: inherit; }
button, a, input, select { -webkit-tap-highlight-color: transparent; }
button { cursor: pointer; }
button:disabled { cursor: not-allowed; opacity: .55; }
a { color: inherit; }
:focus-visible { outline: 3px solid var(--primary); outline-offset: 3px; }
h1, h2, h3, p { margin: 0; }
h1 { font-size: 29px; font-weight: 700; letter-spacing: -.7px; }
h2 { font-size: 17px; letter-spacing: -.25px; }
h3 { font-size: 14px; }
fieldset { border: 0; padding: 0; margin: 0; min-width: 0; }
.dashboard { display: flex; flex-direction: column; min-height: 100vh; }
.header { min-height: 86px; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 16px 32px; background: var(--bg-secondary); border-bottom: 1px solid var(--border); }
.brand { display: flex; align-items: center; gap: 12px; text-decoration: none; font-size: 19px; letter-spacing: -.4px; white-space: nowrap; }
.brand strong { font-weight: 650; }
.brand-symbol { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 11px; background: #3b82f6; color: white; }
.header-actions { display: flex; align-items: center; gap: 10px; }
.header-period { display: flex !important; flex-direction: row !important; align-items: center; gap: 10px !important; margin: 0; }
.header-period label { color: var(--text-secondary); font-weight: 400; }
.header-period select { min-width: 114px; }
.dashboard-body { display: flex; flex: 1; }
.sidebar { width: 248px; flex-shrink: 0; padding: 28px 18px 20px; background: var(--bg-secondary); border-right: 1px solid var(--border); display: flex; flex-direction: column; }
.nav-caption { font-size: 10px; letter-spacing: 1.4px; color: var(--text-muted); margin: 0 12px 14px; font-weight: 700; }
.section-nav { display: grid; gap: 6px; }
.nav-item { display: flex; align-items: center; gap: 12px; border: 0; background: transparent; padding: 13px 12px; color: var(--text-secondary); border-radius: 8px; text-align: left; font-weight: 550; }
.nav-item:hover { background: var(--bg-primary); color: var(--text-primary); }
.nav-item.active { background: var(--primary-soft); color: var(--primary); font-weight: 650; }
.active-dot { height: 6px; width: 6px; border-radius: 50%; background: var(--primary); margin-left: auto; }
.filter-panel { border-top: 1px solid var(--border); margin-top: 30px; padding: 24px 10px 0; }
.sidebar-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.sidebar-heading h2 { font-size: 13px; }
.filter-panel legend, .price-filter > label { font-size: 12px; font-weight: 600; display: block; margin-bottom: 12px; }
.check-label { display: flex; gap: 8px; align-items: center; cursor: pointer; font-size: 12px; color: var(--text-secondary); line-height: 1.5; }
.filter-panel .check-label { margin: 12px 0; }
input[type='checkbox'], input[type='radio'] { accent-color: var(--primary); width: 15px; height: 15px; flex-shrink: 0; margin: 0; cursor: pointer; }
.category-dot { width: 7px; height: 7px; flex-shrink: 0; border-radius: 50%; }
.price-filter { margin: 25px 0; }
.price-filter label strong { display: block; margin-top: 8px; color: var(--text-primary); font-size: 15px; }
input[type='range'] { width: 100%; accent-color: var(--primary); cursor: pointer; }
.range-labels { display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); margin-top: 6px; }
.filter-panel select[multiple] { padding: 4px; font-size: 12px; }
.filter-panel select[multiple] option { padding: 8px; border-radius: 4px; }
.sidebar-note { margin-top: 16px; color: var(--text-muted); font-size: 11px; line-height: 1.6; }
.sidebar-footer { margin: 36px 10px 0; padding-top: 22px; border-top: 1px solid var(--border); font-size: 11px; line-height: 1.9; color: var(--text-secondary); }
.sidebar-footer small { color: var(--text-muted); font-size: 10px; }
.live-dot { height: 6px; width: 6px; border-radius: 50%; display: inline-block; margin-right: 6px; background: #10b981; }
.main-content { flex: 1; min-width: 0; padding: 32px; background: var(--bg-primary); }
.page-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
.eyebrow { font-size: 10px; letter-spacing: 1.7px; color: var(--text-muted); font-weight: 600; margin-bottom: 9px; }
.page-heading h1 + p { margin-top: 8px; color: var(--text-secondary); font-size: 13px; }
.filter-summary { border: 1px solid var(--border); border-radius: 20px; padding: 8px 12px; font-size: 11px; color: var(--text-secondary); white-space: nowrap; background: var(--bg-secondary); }
.page-content { transition: opacity .2s; }
.page-grid { display: grid; gap: 24px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
.overview-top-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 24px; align-items: start; }
.split-grid { display: grid; grid-template-columns: minmax(300px, .8fr) minmax(380px, 1.2fr); gap: 24px; align-items: start; }
.users-layout { display: grid; grid-template-columns: minmax(0, 1fr) 310px; gap: 24px; align-items: start; }
.main-footer { display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.skip-link { position: fixed; left: 16px; top: -80px; z-index: 20; padding: 12px; background: var(--primary); color: white; }
.skip-link:focus { top: 16px; }
.muted { color: var(--text-secondary); font-size: 12px; }
@media (min-width: 1600px) { .main-content { padding: 36px 44px; } }
@media (max-width: 1250px) { .stats-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } .overview-top-grid { grid-template-columns: 1fr; } .users-layout { grid-template-columns: 1fr; } .users-layout > :last-child { max-width: 560px; } .header { padding: 16px 24px; } .main-content { padding: 28px 24px; } }
@media (max-width: 1000px) { .brand { font-size: 16px; } .header-actions { gap: 8px; } .header-actions > .loading-spinner { display: none; } .header-period label { display: none; } .sidebar { width: 215px; padding: 24px 12px; } .split-grid { grid-template-columns: 1fr; } .filter-summary { display: none; } }
@media (max-width: 760px) { .header { flex-wrap: wrap; gap: 16px; padding: 16px; } .header-actions { width: 100%; flex-wrap: wrap; } .header-actions .button { font-size: 12px; } .dashboard-body { flex-direction: column; } .sidebar { width: 100%; border-right: 0; border-bottom: 1px solid var(--border); padding: 18px 16px; } .nav-caption, .sidebar-footer { display: none; } .section-nav { grid-template-columns: repeat(4, minmax(0,1fr)); gap: 4px; } .nav-item { padding: 10px 4px; justify-content: center; gap: 5px; font-size: 11px; } .nav-item svg { width: 16px; } .active-dot { display: none; } .filter-panel { margin-top: 16px; padding-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; } .sidebar-heading { grid-column: 1/-1; margin: 0; } .price-filter { margin: 0; } .sidebar-note { margin: 0; } .filter-panel .field { margin: 0; } .main-content { padding: 24px 16px; } h1 { font-size: 25px; } .page-grid { gap: 18px; } .main-footer { gap: 15px; } }
@media (max-width: 420px) { .stats-grid { grid-template-columns: 1fr; } .nav-item { flex-direction: column; } .filter-panel { grid-template-columns: 1fr; } .header-actions .theme-toggle span { display: none; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; } }
```

## 52. `src/styles/themes.css`

```css
:root {
  --bg-primary: #f9fafb;
  --bg-secondary: #ffffff;
  --bg-card: #ffffff;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-muted: #6b7280;
  --border: #e5e7eb;
  --border-hover: #d1d5db;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --primary-soft: #eff6ff;
  --success: #047857;
  --success-soft: #ecfdf5;
  --warning: #92400e;
  --warning-soft: #fffbeb;
  --error: #b91c1c;
  --error-soft: #fef2f2;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 22px rgba(15, 23, 42, 0.07);
  color-scheme: light;
}
[data-theme='dark'] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-card: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-muted: #a7b1c1;
  --border: #374151;
  --border-hover: #4b5563;
  --primary: #60a5fa;
  --primary-hover: #93c5fd;
  --primary-soft: #1e3a5f;
  --success: #6ee7b7;
  --success-soft: #123a2d;
  --warning: #fcd34d;
  --warning-soft: #403520;
  --error: #fca5a5;
  --error-soft: #46252c;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  --shadow-lg: 0 10px 22px rgba(0, 0, 0, 0.25);
  color-scheme: dark;
}
```

## 53. `src/styles/widgets.css`

```css
.button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid transparent; border-radius: 7px; padding: 10px 14px; font-weight: 550; font-size: 12px; line-height: 1.5; transition: background .2s, color .2s, transform .2s; white-space: nowrap; }
.button-primary { background: #3b82f6; color: white; }
.button-primary:hover:not(:disabled) { background: #2563eb; }
.button-secondary { background: var(--bg-secondary); color: var(--text-primary); border-color: var(--border); }
.button-secondary:hover:not(:disabled) { background: var(--primary-soft); border-color: var(--border-hover); }
.button-text { background: transparent; color: var(--primary); padding: 5px 7px; }
.button-text:hover:not(:disabled) { background: var(--primary-soft); }
.theme-toggle svg { transition: transform .3s; }
.theme-toggle:hover svg { transform: rotate(25deg); }
.field { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
.field > label { font-size: 12px; font-weight: 550; }
.field input, .field select { width: 100%; border: 1px solid var(--border); border-radius: 7px; padding: 10px 11px; background: var(--bg-secondary); color: var(--text-primary); min-width: 0; line-height: 1.4; }
.field input::placeholder { color: var(--text-muted); font-size: 12px; }
.field input[aria-invalid='true'], .field select[aria-invalid='true'] { border-color: var(--error); }
.field input:disabled, .field select:disabled { opacity: .65; }
.field-hint, .field-error { font-size: 11px; line-height: 1.6; }
.field-hint { color: var(--text-muted); }
.field-error { color: var(--error); }
.data-form { display: grid; gap: 18px; }
.data-form > .button { justify-self: start; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-total { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-radius: 8px; background: var(--primary-soft); color: var(--primary); }
.form-total span { font-size: 12px; }
.form-total strong { font-size: 18px; }
.message { border-radius: 7px; padding: 12px 14px; font-size: 12px; line-height: 1.6; }
.message-error { background: var(--error-soft); color: var(--error); }
.message-success { background: var(--success-soft); color: var(--success); }
.widget { padding: 24px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 11px; box-shadow: var(--shadow); min-width: 0; }
.widget-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
.widget-heading h2 + p { color: var(--text-secondary); font-size: 11px; line-height: 1.6; margin-top: 5px; }
.widget-icon { padding: 9px; color: var(--primary); background: var(--primary-soft); border-radius: 8px; display: flex; }
.small-badge { background: var(--success-soft); color: var(--success); font-size: 9px; font-weight: 750; letter-spacing: 1px; border-radius: 4px; padding: 5px 7px; }
.count-badge { color: var(--text-secondary); background: var(--bg-primary); border: 1px solid var(--border); padding: 5px 9px; border-radius: 6px; font-size: 12px; }
.stats-card { padding: 22px; border: 1px solid var(--border); border-radius: 11px; background: var(--bg-card); box-shadow: var(--shadow); transition: transform .2s, box-shadow .2s; min-width: 0; }
.stats-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.stats-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 16px; }
.stats-top h3 { font-weight: 500; color: var(--text-secondary); font-size: 12px; }
.stats-icon { padding: 9px; border-radius: 8px; display: flex; color: var(--primary); background: var(--primary-soft); }
.stats-icon.cart { color: var(--success); background: var(--success-soft); }
.stats-icon.users { color: #8b5cf6; background: color-mix(in srgb, #8b5cf6 10%, var(--bg-card)); }
.stats-icon.box { color: var(--warning); background: var(--warning-soft); }
.stats-value { font-size: clamp(23px, 2.1vw, 32px); font-weight: 700; letter-spacing: -.9px; white-space: nowrap; }
.stats-bottom { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 10px; color: var(--text-muted); margin-top: 14px; line-height: 1.6; }
.stats-change { font-size: 11px; font-weight: 600; white-space: nowrap; }
.stats-change.positive { color: var(--success); }
.stats-change.negative { color: var(--error); }
.stats-change.neutral { color: var(--text-muted); }
.search-controls { display: grid; grid-template-columns: minmax(0,1fr) 150px; gap: 12px; }
.results-count { font-size: 11px; color: var(--text-secondary); margin: 16px 0 8px; }
.search-results { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr; }
.search-results li { display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border); padding: 10px 0; min-width: 0; }
.search-results li:last-child { border: 0; padding-bottom: 0; }
.result-icon { height: 32px; width: 32px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 7px; display: grid; place-items: center; color: var(--text-secondary); flex-shrink: 0; }
.search-results strong { font-weight: 550; font-size: 11px; }
.search-results small { display: block; font-size: 10px; color: var(--text-muted); margin-top: 4px; }
.result-meta { margin-left: auto; font-size: 11px; font-weight: 600; white-space: nowrap; }
mark { background: #fef08a; color: #713f12; border-radius: 2px; }
.table-filters { display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin-bottom: 18px; }
.table-filters > .field { min-width: 155px; }
.demo-control { font-size: 10px; }
.table-scroll { width: 100%; overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 11px; }
.data-table th { font-weight: 550; color: var(--text-secondary); background: var(--bg-primary); font-size: 10px; padding: 12px 10px; border-bottom: 1px solid var(--border); white-space: nowrap; }
.data-table td { border-bottom: 1px solid var(--border); padding: 13px 10px; vertical-align: middle; line-height: 1.6; }
.data-table tbody tr:last-child td { border-bottom: 0; }
.data-table tbody tr:hover { background: color-mix(in srgb, var(--primary-soft) 30%, var(--bg-card)); }
.order-id { color: var(--primary); font-weight: 550; }
.product-cell { max-width: 190px; }
.product-cell small, .user-cell small { display: block; color: var(--text-muted); font-size: 10px; margin-top: 3px; }
.amount-cell { font-weight: 600; white-space: nowrap; }
.status-select { min-width: 125px; }
.status-select select { font-size: 10px; padding: 5px 7px; border: 0; }
.status-select.completed select, .status-badge.completed { background: var(--success-soft); color: var(--success); }
.status-select.pending select, .status-badge.pending { background: var(--warning-soft); color: var(--warning); }
.status-select.processing select { background: var(--primary-soft); color: var(--primary); }
.status-select.cancelled select, .status-badge.cancelled { background: var(--error-soft); color: var(--error); }
.status-badge, .role-badge { display: inline-flex; padding: 4px 7px; border-radius: 5px; font-size: 10px; white-space: nowrap; }
.role-badge { background: var(--bg-primary); color: var(--text-secondary); border: 1px solid var(--border); }
.table-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; font-size: 10px; color: var(--text-muted); border-top: 1px solid var(--border); padding-top: 16px; margin-top: 10px; }
.pagination { display: flex; align-items: center; gap: 12px; font-size: 11px; color: var(--text-secondary); }
.pagination .button { padding: 4px 10px; font-size: 15px; }
.pagination strong { color: var(--text-primary); }
.empty-state { padding: 35px 16px; text-align: center; color: var(--text-muted); font-size: 12px; }
.loading-spinner { display: inline-flex; gap: 10px; align-items: center; color: var(--text-secondary); font-size: 12px; }
.loading-spinner.compact { font-size: 10px; margin: 4px 0 10px; }
.spinner { width: 18px; height: 18px; border: 2px solid var(--border); border-top-color: var(--primary); border-radius: 50%; animation: spin .8s linear infinite; flex-shrink: 0; }
.compact .spinner { height: 13px; width: 13px; }
@keyframes spin { to { transform: rotate(360deg); } }
.optimistic-saving { background: var(--primary-soft); box-shadow: inset -3px 0 var(--primary); }
.saving-text { display: block; color: var(--primary); font-size: 9px; margin-top: 3px; animation: pulse 1s infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
.chart-summary { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; }
.chart-summary > strong { font-size: 26px; letter-spacing: -.7px; }
.compact-field { max-width: 135px; }
.compact-field label { font-size: 10px; color: var(--text-secondary); font-weight: 400; }
.compact-field select { font-size: 11px; padding: 7px; }
.chart-body { position: relative; transition: opacity .2s; }
.chart-body svg { display: block; width: 100%; }
.chart-grid { stroke: var(--border); stroke-dasharray: 3 4; }
.chart-label { font-family: inherit; font-size: 10px; fill: var(--text-muted); }
.chart-empty { text-align: center; font-size: 10px; color: var(--text-muted); margin: 10px 0; }
.chart-legend { display: flex; gap: 16px; flex-wrap: wrap; list-style: none; margin: 17px 0 0; padding: 0; color: var(--text-secondary); font-size: 10px; }
.chart-legend li { display: flex; align-items: center; gap: 6px; }
.chart-legend span { height: 7px; width: 7px; border-radius: 2px; }
.activity-filters { display: flex; align-items: center; flex-wrap: wrap; gap: 15px; margin: 16px 0; }
.activity-filters legend { float: left; margin-right: 18px; font-size: 11px; color: var(--text-secondary); }
.activity-filters label { display: flex; align-items: center; gap: 6px; font-size: 11px; cursor: pointer; }
.user-cell { display: flex; align-items: center; gap: 10px; }
.user-cell strong { font-weight: 550; }
.avatar { background: var(--primary-soft); color: var(--primary); display: grid; place-items: center; width: 31px; height: 31px; border-radius: 50%; flex-shrink: 0; font-size: 10px; font-weight: 600; }
.top-products { list-style: none; margin: 0 0 24px; padding: 0; }
.top-products > li { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.top-products > li:last-child { border: 0; }
.rank { font-size: 11px; font-weight: 600; color: var(--text-muted); }
.product-ranking { flex: 1; min-width: 0; }
.product-ranking > div { display: flex; justify-content: space-between; gap: 15px; font-size: 11px; }
.product-ranking strong { font-weight: 550; }
.product-ranking > div > span { font-weight: 600; white-space: nowrap; }
.product-ranking small { display: block; margin: 5px 0 7px; font-size: 10px; color: var(--text-muted); }
progress { display: block; width: 100%; height: 5px; border: 0; border-radius: 4px; overflow: hidden; background: var(--border); accent-color: var(--primary); }
progress::-webkit-progress-bar { background: var(--border); border-radius: 4px; }
progress::-webkit-progress-value { background: var(--primary); border-radius: 4px; }
progress::-moz-progress-bar { background: var(--primary); border-radius: 4px; }
.favorite-control { width: 28px; flex-shrink: 0; }
.favorite-control .button { padding: 5px; color: var(--text-muted); }
.favorite-control .liked { color: #ef4444; }
.product-comments { margin-top: 20px; border-top: 1px solid var(--border); padding-top: 20px; }
.product-comments h3 { margin-bottom: 14px; }
.product-comments > .muted { margin-bottom: 16px; }
.comment-list { padding: 0; margin: 0 0 16px; list-style: none; }
.comment-list li { padding: 12px; background: var(--bg-primary); border-radius: 6px; margin-bottom: 8px; overflow-wrap: anywhere; }
.comment-list p { font-size: 12px; line-height: 1.7; }
.comment-list small { font-size: 10px; color: var(--text-muted); }
.comparison-table { margin-top: 22px; }
.comparison-table tbody th { background: var(--bg-card); }
.comparison-note { margin-top: 18px; }
.async-widget > .check-label { margin-bottom: 20px; }
.analytics-metrics { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 18px; margin-bottom: 28px; }
.analytics-metrics > div { padding: 20px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 8px; }
.analytics-metrics span { font-size: 11px; color: var(--text-secondary); }
.analytics-metrics strong { display: block; font-size: 26px; margin-top: 12px; letter-spacing: -.7px; }
.analytics-metrics small { display: block; color: var(--text-muted); font-size: 10px; margin-top: 8px; }
.region-metrics { list-style: none; padding: 0; margin: 18px 0 24px; display: grid; gap: 16px; }
.region-metrics li > div { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 9px; }
.region-metrics strong { font-weight: 550; }
.async-loading { display: grid; place-items: center; padding: 50px 20px; gap: 12px; }
.async-loading p { color: var(--text-muted); font-size: 11px; }
.error-fallback { padding: 28px; background: var(--error-soft); border-radius: 8px; color: var(--error); }
.error-fallback p { margin: 12px 0 18px; font-size: 12px; }
@media (max-width: 760px) { .widget, .stats-card { padding: 20px; } .widget-heading { gap: 10px; } .widget-heading h2 { font-size: 15px; } .stats-value { font-size: 27px; } .analytics-metrics { grid-template-columns: 1fr; } .table-footer { flex-wrap: wrap; } .search-controls { grid-template-columns: minmax(0,1fr) 125px; } .product-ranking > div { flex-direction: column; gap: 5px; } .data-table th, .data-table td { padding: 10px 7px; } }
@media (max-width: 420px) { .form-row, .search-controls { grid-template-columns: 1fr; } .widget-heading { flex-wrap: wrap; } }
```

## 54. `src/utils/api.js`

```javascript
// Навчальний mock API: асинхронні запити, затримки, кеш і localStorage.
// Це клієнтські async Actions, а не справжній бекенд / Server Functions.
import { mockOrders } from '../data/mockOrders.js';
import { mockProducts } from '../data/mockProducts.js';
import { mockUsers } from '../data/mockUsers.js';
import { mockSalesData } from '../data/mockSalesData.js';
import { STATUSES, DEFAULT_FILTERS, REGIONS } from './constants.js';
import { buildChartData, filterOrders, getMetrics } from './selectors.js';
import { validateSale, validateUser } from './validation.js';

const STORAGE_KEY = 'analytics-dashboard-data-v1';
const clone = value => structuredClone(value);
const initialDatabase = () => clone({ orders: mockOrders, products: mockProducts, users: mockUsers });
function readDatabase() {
  try {
    if (typeof localStorage === 'undefined') return initialDatabase();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved?.orders) && saved.products?.length && saved.users?.length) return saved;
  } catch { /* Якщо сховище недоступне, працюємо в пам’яті. */ }
  return initialDatabase();
}
let database = readDatabase();
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const nextId = items => Math.max(0, ...items.map(item => Number(item.id))) + 1;
function persist() {
  try { if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(database)); }
  catch { /* Сховище може бути переповнене або заблоковане. */ }
}
function maybeFail(forceError, message) {
  if (forceError || Math.random() < 0.1) throw new Error(message);
}
export function getSnapshot() { return clone(database); }
export async function loadDashboardData() { await wait(650); return getSnapshot(); }

export async function updateOrderStatus(orderId, newStatus, { forceError = false } = {}) {
  if (!STATUSES.some(status => status.id === newStatus)) throw new Error('Невідомий статус.');
  await wait(1000);
  maybeFail(forceError, 'Не вдалося оновити статус. Спробуйте ще раз.');
  const order = database.orders.find(item => item.id === orderId);
  if (!order) throw new Error('Замовлення не знайдено.');
  order.status = newStatus;
  persist();
  return clone(order);
}
export async function archiveOrder(orderId, archived, { forceError = false } = {}) {
  await wait(1000);
  maybeFail(forceError, 'Не вдалося змінити архів. Зміни відкочено.');
  const order = database.orders.find(item => item.id === orderId);
  if (!order) throw new Error('Замовлення не знайдено.');
  order.archived = archived;
  persist();
  return clone(order);
}
export async function createSale(values) {
  await wait(1200);
  const errors = validateSale(values, database.products);
  if (Object.keys(errors).length) return { success: false, error: 'Перевірте поля форми.', errors };
  const product = database.products.find(item => item.id === Number(values.product));
  const quantity = Number(values.quantity);
  const price = Math.round(Number(values.price) * 100) / 100;
  const sale = {
    id: nextId(database.orders), customer: values.customer.trim(),
    productId: product.id, product: product.name, quantity, price,
    amount: Math.round(price * quantity * 100) / 100, status: 'completed',
    date: new Date().toISOString(), region: product.region, archived: false,
  };
  product.stock -= quantity;
  product.salesCount += quantity;
  product.revenue += sale.amount;
  database.orders.unshift(sale);
  persist();
  return { success: true, message: 'Продаж додано!', sale: clone(sale), product: clone(product), errors: {} };
}
export async function checkEmailExists(email) {
  await wait(500);
  const normalized = email.trim().toLowerCase();
  return ['admin@example.com', 'test@example.com'].includes(normalized)
    || database.users.some(user => user.email.toLowerCase() === normalized);
}
export async function createUser(values) {
  await wait(1000);
  const errors = validateUser(values);
  if (Object.keys(errors).length) return { success: false, error: 'Перевірте поля форми.', errors };
  const email = values.email.trim().toLowerCase();
  // Повторна перевірка під час запису захищає від одночасних запитів.
  if (['admin@example.com', 'test@example.com'].includes(email)
    || database.users.some(user => user.email.toLowerCase() === email)) {
    return { success: false, error: 'Email вже зареєстрований.', errors: { email: 'Цей email уже використовується.' } };
  }
  const user = {
    id: nextId(database.users), name: values.name.trim(), email, role: values.role,
    isActive: true, registeredAt: new Date().toISOString(), lastActivity: new Date().toISOString(),
    region: REGIONS[0],
  };
  database.users.unshift(user);
  persist();
  return { success: true, message: 'Користувача додано!', user: clone(user), errors: {} };
}
export async function loadChartData(period, filters = DEFAULT_FILTERS) {
  await wait(900);
  // Підтримуємо також назви наборів даних з умови завдання.
  if (Object.hasOwn(mockSalesData, period)) return clone(mockSalesData[period]);
  return buildChartData(getSnapshot(), filters, period);
}
export async function loadPeriodComparison(periodA, periodB, filters) {
  await wait(950);
  const snapshot = getSnapshot();
  return [getMetrics(snapshot, filters, periodA), getMetrics(snapshot, filters, periodB)];
}
export async function fetchAnalyticsData(period, filters, { forceError = false } = {}) {
  await wait(1400);
  if (forceError) throw new Error('Тестова помилка завантаження аналітики.');
  const snapshot = getSnapshot();
  const orders = filterOrders(snapshot.orders, snapshot.products, filters, period);
  return {
    ...getMetrics(snapshot, filters, period), updatedAt: new Date().toISOString(),
    regions: filters.regions.map(region => ({
      region, revenue: orders.filter(order => order.region === region && order.status === 'completed')
        .reduce((sum, order) => sum + order.amount, 0),
    })),
    activeUsers: snapshot.users.filter(user => user.isActive && filters.regions.includes(user.region)).length,
  };
}
export async function setProductLike(productId, liked, { forceError = false } = {}) {
  await wait(800);
  maybeFail(forceError, 'Не вдалося зберегти вподобання.');
  const product = database.products.find(item => item.id === productId);
  if (!product) throw new Error('Продукт не знайдено.');
  product.liked = liked;
  persist();
  return clone(product);
}
export async function createComment(productId, text, { forceError = false } = {}) {
  await wait(1000);
  maybeFail(forceError, 'Не вдалося додати коментар. Зміни відкочено.');
  const product = database.products.find(item => item.id === productId);
  if (!product) throw new Error('Продукт не знайдено.');
  if (text.trim().length < 2 || text.trim().length > 300) throw new Error('Коментар: від 2 до 300 символів.');
  product.comments.push({ id: nextId(product.comments), text: text.trim(), date: new Date().toISOString() });
  persist();
  return clone(product);
}
```

## 55. `src/utils/constants.js`

```javascript
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
```

## 56. `src/utils/formatters.js`

```javascript
export const currency = value => new Intl.NumberFormat('uk-UA', {
  style: 'currency', currency: 'UAH', maximumFractionDigits: 0,
}).format(value);
export const number = value => new Intl.NumberFormat('uk-UA').format(value);
export const date = value => new Intl.DateTimeFormat('uk-UA', {
  day: '2-digit', month: 'short', year: 'numeric',
}).format(new Date(value));
export const percentChange = (current, previous) => previous === 0
  ? (current === 0 ? 0 : null)
  : Math.round(((current - previous) / previous) * 1000) / 10;
```

## 57. `src/utils/selectors.js`

```javascript
import { CATEGORIES } from './constants.js';
import { percentChange } from './formatters.js';

export function periodBounds(period, offset = 0, now = new Date()) {
  const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  if (period === 'year') {
    const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 11 - offset * 12, 1);
    const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1 - offset * 12, 1);
    return { start, end };
  }
  const days = { today: 1, week: 7, month: 30 }[period] ?? 30;
  const end = midnight + 86400000 - offset * days * 86400000;
  return { start: end - days * 86400000, end };
}

export function inPeriod(value, period, offset = 0, now) {
  const time = new Date(value).getTime();
  const { start, end } = periodBounds(period, offset, now);
  return time >= start && time < end;
}

export function filterProducts(products, filters) {
  return products.filter(product => filters.categories.includes(product.category)
    && product.price <= filters.maxPrice && filters.regions.includes(product.region));
}

export function filterOrders(orders, products, filters, period, { includeArchived = false, offset = 0 } = {}) {
  const productIds = new Set(filterProducts(products, filters).map(product => product.id));
  return orders.filter(order => productIds.has(order.productId)
    && filters.regions.includes(order.region)
    && (includeArchived || !order.archived) && inPeriod(order.date, period, offset));
}

export function getMetrics(snapshot, filters, period, offset = 0) {
  const orders = filterOrders(snapshot.orders, snapshot.products, filters, period, { offset });
  const completed = orders.filter(order => order.status === 'completed');
  const revenue = completed.reduce((sum, order) => sum + order.amount, 0);
  return {
    revenue, orders: orders.length,
    users: snapshot.users.filter(user => filters.regions.includes(user.region)
      && inPeriod(user.registeredAt, period, offset)).length,
    stock: filterProducts(snapshot.products, filters).reduce((sum, product) => sum + product.stock, 0),
    averageOrder: completed.length ? revenue / completed.length : 0,
    conversion: orders.length ? completed.length / orders.length * 100 : 0,
  };
}

export function getStats(snapshot, filters, period) {
  const current = getMetrics(snapshot, filters, period);
  const previous = getMetrics(snapshot, filters, period, 1);
  return Object.keys(current).reduce((result, key) => ({
    ...result, [key]: { value: current[key], change: key === 'stock' ? 0 : percentChange(current[key], previous[key]) },
  }), {});
}

export function buildChartData(snapshot, filters, period) {
  const { start, end } = periodBounds(period);
  const count = { today: 12, week: 7, month: 30, year: 12 }[period] ?? 30;
  const points = Array.from({ length: count }, (_, index) => {
    const time = period === 'year'
      ? Date.UTC(new Date(start).getUTCFullYear(), new Date(start).getUTCMonth() + index, 1)
      : start + index * ((end - start) / count);
    const label = new Intl.DateTimeFormat('uk-UA', period === 'today'
      ? { hour: '2-digit', timeZone: 'UTC' }
      : period === 'year' ? { month: 'short', timeZone: 'UTC' }
        : { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(time);
    return { time, label, total: 0, ...Object.fromEntries(CATEGORIES.map(category => [category.id, 0])) };
  });
  const catalog = new Map(snapshot.products.map(product => [product.id, product]));
  filterOrders(snapshot.orders, snapshot.products, filters, period).forEach(order => {
    if (order.status !== 'completed') return;
    const time = new Date(order.date).getTime();
    const index = Math.max(0, points.findLastIndex(point => point.time <= time));
    points[index][catalog.get(order.productId).category] += order.amount;
    points[index].total += order.amount;
  });
  return points;
}
```

## 58. `src/utils/validation.js`

```javascript
export function validateSale(values, products) {
  const errors = {};
  if (values.customer.trim().length < 2) errors.customer = 'Введіть ім’я клієнта (мінімум 2 символи).';
  const product = products.find(item => item.id === Number(values.product));
  if (!product) errors.product = 'Оберіть продукт.';
  const quantity = Number(values.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) errors.quantity = 'Кількість — ціле число від 1.';
  else if (product && quantity > product.stock) errors.quantity = `У наявності лише ${product.stock} шт.`;
  const price = Number(values.price);
  if (!Number.isFinite(price) || price < 0.01 || price > 10000000) errors.price = 'Вкажіть ціну від 0,01 до 10 000 000 грн.';
  return errors;
}

export function validateUser(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Ім’я має містити мінімум 2 символи.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Введіть коректний email.';
  if (!['admin', 'user'].includes(values.role)) errors.role = 'Оберіть роль Admin або User.';
  return errors;
}
```

## 59. `tests/dashboard.test.js`

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { submitSale } from '../src/actions/salesActions.js';
import { addUser } from '../src/actions/userActions.js';
import { createUser, getSnapshot, updateOrderStatus } from '../src/utils/api.js';
import { buildChartData, filterProducts, getMetrics } from '../src/utils/selectors.js';
import { percentChange } from '../src/utils/formatters.js';
import { DEFAULT_FILTERS } from '../src/utils/constants.js';

const toFormData = values => {
  const form = new FormData();
  Object.entries(values).forEach(([key, value]) => form.set(key, String(value)));
  return form;
};

test('Тестових даних достатньо для пагінації та live-фільтрації', () => {
  const snapshot = getSnapshot();
  assert.equal(snapshot.orders.length, 84);
  assert.equal(snapshot.products.length, 36);
  assert.equal(snapshot.users.length, 120);
});

test('Некоректний продаж не змінює замовлення або залишки', async () => {
  const before = getSnapshot();
  const result = await submitSale(null, toFormData({ customer: 'X', product: '1', quantity: '1.5', price: '0.001' }));
  assert.equal(result.success, false);
  assert.ok(result.errors.customer);
  assert.ok(result.errors.quantity);
  assert.ok(result.errors.price);
  assert.deepEqual(getSnapshot(), before);
});

test('Успішний продаж додає замовлення та узгоджено змінює продукт', async () => {
  const before = getSnapshot();
  const product = before.products[0];
  const result = await submitSale(null, toFormData({ customer: 'Тестовий Клієнт', product: product.id, quantity: 2, price: 1000 }));
  assert.equal(result.success, true);
  const after = getSnapshot();
  assert.equal(after.orders.length, before.orders.length + 1);
  assert.equal(after.orders[0].amount, 2000);
  assert.equal(after.products[0].stock, product.stock - 2);
  assert.equal(after.products[0].salesCount, product.salesCount + 2);
  assert.equal(after.products[0].revenue, product.revenue + 2000);
});

test('Відмова API не змінює збережений статус замовлення', async () => {
  const before = getSnapshot().orders[0];
  const status = before.status === 'cancelled' ? 'completed' : 'cancelled';
  await assert.rejects(updateOrderStatus(before.id, status, { forceError: true }), /Не вдалося оновити/);
  assert.equal(getSnapshot().orders.find(order => order.id === before.id).status, before.status);
});

test('Async перевірка email нечутлива до регістру', async () => {
  const before = getSnapshot().users.length;
  const result = await addUser(null, toFormData({ name: 'Тестова Людина', email: ' ADMIN@EXAMPLE.COM ', role: 'user' }));
  assert.equal(result.success, false);
  assert.ok(result.errors.email);
  assert.equal(getSnapshot().users.length, before);
});

test('Одночасні реєстрації не створюють дублікати email', async () => {
  const values = { name: 'Новий Користувач', email: 'unique-test@example.com', role: 'user' };
  const results = await Promise.all([createUser(values), createUser(values)]);
  assert.equal(results.filter(result => result.success).length, 1);
  assert.equal(getSnapshot().users.filter(user => user.email === values.email).length, 1);
});

test('Глобальні фільтри, метрики та графік рахують однаковий дохід', () => {
  const snapshot = getSnapshot();
  const filters = { ...DEFAULT_FILTERS, categories: ['electronics'], regions: ['Київ'], maxPrice: 10000 };
  assert.ok(filterProducts(snapshot.products, filters).every(product => product.category === 'electronics' && product.region === 'Київ' && product.price <= 10000));
  const chart = buildChartData(snapshot, filters, 'year');
  assert.equal(chart.length, 12);
  assert.equal(chart.reduce((sum, point) => sum + point.total, 0), getMetrics(snapshot, filters, 'year').revenue);
  assert.equal(getMetrics(snapshot, { ...filters, categories: [] }, 'year').orders, 0);
});

test('Відсоток зміни не вигадує значення при нульовій базі', () => {
  assert.equal(percentChange(125, 100), 25);
  assert.equal(percentChange(80, 100), -20);
  assert.equal(percentChange(0, 0), 0);
  assert.equal(percentChange(10, 0), null);
});
```

# Контроль соответствия заданию

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

# Проверка готового проекта

# Результаты проверки

Проверено 7 октября 2026 года. Исполняющая среда: Node.js 24, React 19.3.0,
Vite 8.3.3. Инструкция подготовлена для WebStorm 2026.2.3; проверки запускались
в терминале и Chromium, а не в установленной IDE пользователя.

- `npm run build` — успешно.
- `npm test` — 8 из 8 тестов успешно.
- Браузерные сценарии — 15 из 15 успешно.
- Просмотр макета: светлая и тёмная темы, desktop 1440 px, tablet 900 px,
  mobile 390 px. Горизонтального переполнения всей страницы нет;
  широкие таблицы имеют собственную прокрутку.

## Проверенные сценарии браузера

1. Overview, четыре карточки, 12 заказов, уникальные DOM ID и корректные ссылки ARIA.
2. Пагинация заказов и кнопки на границах списка.
3. Deferred-поиск продуктов, подсветка и отсутствие результатов.
4. Мгновенная смена статуса, отказ API с откатом и успешное сохранение.
5. Быстрая смена периодов, доступные селекторы и данные последнего запроса.
6. Валидация продажи, сохранение введённых значений, успешное добавление,
   очистка формы и появление заказа.
7. Оптимистический лайк, откат комментария и повторная успешная отправка.
8. Архивирование заказа и восстановление из архива.
9. Async-проверка email, новая регистрация, deferred-поиск пользователей,
   активность и сортировка.
10. Сравнение периодов, кешированный Promise, Suspense, Error Boundary,
    повторная загрузка и восстановление после ошибки.
11. Сохранение темы и mock-данных после перезагрузки страницы.
12. Общие фильтры категорий, цены и регионов, пустые результаты и сброс.
13. Макет планшета.
14. Макет небольшого экрана.
15. Отсутствие неожиданных ошибок React, предупреждений о некешированном Promise
    и вызове optimistic setter вне Action.

При проверке обычных успешных запросов генератор случайных ошибок был
стабилизирован только в тестовом браузере. Детерминированные отказы проверялись
через флажки приложения. В исходном mock API сохранены предусмотренные 10%
случайных ошибок. Сообщения в консоли при специально вызванной ошибке
аналітики ожидаемы: их обрабатывает Error Boundary.
