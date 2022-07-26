/**
 * A4 210*297
 * A5 148*210
 * @param paper
 * @param orientation
 * @returns
 */
export const getPageStyle = (
  paper: 'A4' | 'A5',
  orientation: 'horizontal' | 'vertical'
) => {
  if (paper === 'A4') {
    return orientation === 'horizontal'
      ? {
          width: '295mm',
          height: '208mm',
        }
      : { width: '208mm', height: '295mm' }
  }
  return orientation === 'horizontal'
    ? {
        width: '208mm',
        height: '146mm',
      }
    : { width: '146mm', height: '208mm' }
}
