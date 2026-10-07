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
