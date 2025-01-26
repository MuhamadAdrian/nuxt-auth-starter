export function toRupiah(price?: number) {
  if (price)
    return `${price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`

  return '-'
}
