import highAndLow from '../api/app';

describe('Test for Arithmatic Progression', () => {
  it('should return a string containing highest and lowest number', () => {
    expect(highAndLow('4 5 29 54 4 0 -214 542 -64 1 -3 6 -6')).toBe('542 -214');
  });
  it('Should have a higher first digit', () => {
    const numberArray = highAndLow('3 5 7 1 -1 3 4 8').split(' ');
    expect(numberArray[0] > numberArray[1]).toBe(true);
  });
});
