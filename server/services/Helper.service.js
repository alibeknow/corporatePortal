export default class HelperService {
  /* Создание карты ключ-значение из массива без повторяющихся ключей */
  static createMapFromArray = (array, keyField = 'id') => array.reduce(
    (result, current) => {
      Object.assign(result, { [current[keyField]]: current });
      return result;
    },
    {},
  );

  /* Создание карты с заданным ключом и значением-массивом, набранным из значений по ключу из
  исходного массива (группировка по ключу) */
  static createGroupedMapFromArray = (array, keyField = 'id', itemMapper = (item) => item) => array.reduce(
    (result, current) => {
      const found = result[current[keyField]] || [];
      Object.assign(result, { [current[keyField]]: found.concat(itemMapper(current)) });
      return result;
    },
    {},
  )
}
