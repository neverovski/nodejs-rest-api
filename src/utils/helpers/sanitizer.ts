export default (() => {
  const escape = (str: string) => {
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#47;')
      .replace(/\\/g, '&#92;');
  };

  return { escape };
})();
