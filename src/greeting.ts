export function starterMessage(productName: string): string {
  const name = productName.trim();
  return name === ''
    ? 'Ready to build.'
    : `Ready to build ${name}.`;
}
