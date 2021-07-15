import { GatheredOutputData } from './Interfaces';
import { searchForFunctionality } from './searchForFunctionality';

test('Input with only 1 possible answer should return structured data', () => {
  const support = searchForFunctionality('array-flat');

  expect(typeof support).toBe('object');
  expect(support).toHaveProperty('noSupport');
  expect(support).toHaveProperty('partialSupport');
  expect(support).toHaveProperty('fullSupport');
});

test('Ambiguous input should return array of options ot disambiguate', () => {
  const gridSupport = searchForFunctionality('grid');

  expect(typeof gridSupport).toBe(typeof []);
  expect(gridSupport).toHaveLength(2);
  expect(gridSupport).toContain('css-grid');
  expect(gridSupport).toContain('css-subgrid');
});

test.skip('Searching for non existent features should return a helpful message', () => {
  // Currently I don't know whether to throw an error or return a string.
  // If I throw then consumer has to deal with that and check the error message
  // to know exactly what happened.
  // But if I return a string I'd have to update the type info
  // and returning a single string only occurs when no issues are found.
  // I could make a descriptive type alias for that case though?
});

test('Input with of empty string should throw an error', () => {
  const coninfo = console.info;
  console.info = () => {};

  expect(() => {
    searchForFunctionality('');
  }).toThrow();
  expect(() => {
    searchForFunctionality('');
  }).toThrowError(/empty string/gi);

  console.info = coninfo;
});

test('Unless specified only return data for a specific subset of browsers', () => {
  // I know documenthead has full support in the default browsers
  // Also the naming scheme for these properties is so aggravating
  const support = searchForFunctionality('documenthead') as GatheredOutputData;

  // should only have the following browsers by default
  expect(support.fullSupport).toHaveProperty('firefox');
  expect(support.fullSupport).toHaveProperty('chrome');
  expect(support.fullSupport).toHaveProperty('ie');
  expect(support.fullSupport).toHaveProperty('edge');
  expect(support.fullSupport).toHaveProperty('safari');
  // Should not have any of the follow browsers
  expect(support.fullSupport).not.toHaveProperty('opera');
  expect(support.fullSupport).not.toHaveProperty('baidu');
  expect(support.fullSupport).not.toHaveProperty('lynx');
  expect(support.fullSupport).not.toHaveProperty('totallyrealbrowser');
});

test.todo('Providing a list of browsers should support return info for each browser');
test.todo('All browsers flag should support return info for ALL browsers, not just defaults');
