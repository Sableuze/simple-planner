// base - точка опоры (ориентир), dataToCheck - объект, в котором нужно отсеять лишнее
// eslint-disable-next-line import/prefer-default-export
export const removeRedundant = (base, dataToCheck) => {
  console.log(dataToCheck.filter((i) => base.includes(i)).filter(Boolean));
  return dataToCheck.filter((i) => base.includes(i)).filter(Boolean);
};
