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
