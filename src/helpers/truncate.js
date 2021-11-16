// eslint-disable-next-line import/prefer-default-export
export const truncate = (text, length, suffix) => {
  try {
    if (text.length > length) {
      return text.substring(0, length) + suffix;
    }
    return text;
  } catch (err) {
    return text;
  }
};
