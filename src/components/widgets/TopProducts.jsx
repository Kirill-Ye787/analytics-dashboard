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
