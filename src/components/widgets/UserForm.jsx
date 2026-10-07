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
