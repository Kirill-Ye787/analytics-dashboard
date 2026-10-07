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
