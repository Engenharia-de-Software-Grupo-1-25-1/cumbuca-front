/**
 * Converte 'foto' em algo exibível no <img src="...">
 * - Se for URL (http/https) ou data URL, mantém como está.
 * - Se for base64 cru (string), prefixa com "data:image/jpeg;base64,".
 * - Se vier como array de bytes (byte[] do Java), converte para base64 e prefixa.
 */
export function normalizeFoto(foto) {
  if (!foto) return null;
  if (typeof foto === 'string') {
    if (/^(https?:\/\/|data:image\/)/i.test(foto)) return foto;
    return `data:image/jpeg;base64,${foto}`;
  }

  if (Array.isArray(foto) || foto instanceof Uint8Array) {
    const bytes = Array.isArray(foto) ? new Uint8Array(foto) : foto;

    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk);
    }

    const b64 = btoa(binary);
    return `data:image/jpeg;base64,${b64}`;
  }

  return null;
}
