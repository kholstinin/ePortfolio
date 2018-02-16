import nameSplit from '../js/common/nameSplit';

test('Функция получения информации из имени отчета', () => {
  const fileName = 'ПЕ-41б_Холстинин ДА_ООП_ПР2.pdf';
  const expected = {
    group: 'ПЕ-41б',
    name: 'Холстинин ДА',
    discipline: 'ООП',
    workType: 'ПР',
    workNumber: 2,
  };
  const result = nameSplit(fileName);

  expect(result).toEqual(expected);
});