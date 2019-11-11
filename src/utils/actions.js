export const creatActionTypes = (moduleName, types) =>
  types.reduce((acc, type) => ({...acc, [type]: `${moduleName}/${type}`}), {});
