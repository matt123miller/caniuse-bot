import { searchForFunctionality } from 'caniuse-bot';
import { program } from 'commander';
import * as pkg from '../package.json';

program
  .version(pkg.version)
  .command('ciu [arg]')
  .description('the description')
  .action((arg, options) => {
    console.log(arg);
    console.log(options)
  });

program.parse(process.argv);

// export function cli () {
//   const feature = 'grid';
//   const result = searchForFunctionality(feature);

//   console.log('Pretend the user just entered "ciu grid"');
//   // @ts-ignore
//   console.log(formatMultipleMatches(searchForFunctionality('grid')));

//   console.log('pretend the user just entered "1"');

//   // @ts-ignore
//   console.log();

//   console.log(`feature css-grid is supported like so: `, searchForFunctionality('css-grid'));

//   // if (Array.isArray(result)) {
//   //   // @ts-ignore
//   //   const userPrompt = formatMultipleMatches(result);
//   //   console.log(userPrompt);

//   // }
//   // else {
//   //   console.log(`feature ${feature} is supported like so: `, result);

//   // }
// }

function formatMultipleMatches(matches: string[]): string {
  return [
    'Multiple matches found. Which one were you looking for?',
    'Type the number or "c" to cancel.',
    ...matches.map((match, i) => `    [${i + 1}] - ${match}`),
  ].join('\n');
}
