export const getPageStyle = (
  paper: 'A4' | 'A5',
  orientation: 'horizontal' | 'vertical'
) => {
  if (paper === 'A4') {
    return orientation === 'horizontal'
      ? {
          width: '297mm',
          height: '210mm',
        }
      : { width: '210mm', height: '297mm' }
  }
  return orientation === 'horizontal'
    ? {
        width: '210mm',
        height: '148mm',
      }
    : { width: '148mm', height: '210mm' }
}
