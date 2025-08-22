/**
 * Normaliza vários formatos de data (string ISO, ISO com T, array [y,m,d], Date, dd/mm/yyyy)
 * para "YYYY-MM-DD" (compatível com <input type="date">).
 */
export function toISODateOnly(value) {
  if (!value) return '';

  if (Array.isArray(value) && value.length >= 3) {
    const [y, m, d] = value;
    return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }

  if (typeof value === 'string') {
    const m = /^(\d{4}-\d{2}-\d{2})/.exec(value);
    if (m) return m[1];
    const br = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
    if (br) return `${br[3]}-${br[2]}-${br[1]}`;
  }

  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  return '';
}
