#!/usr/bin/env node

import { searchForFunctionality } from 'caniuse-bot';
import { program } from 'commander';
import * as Table from 'cli-table3'; // insists on being imported this way ¯\_(ツ)_/¯
import * as pkg from '../package.json';

program
  .version(pkg.version)
  .command('ciu <feature>')
  .description('Search for the browser support of any given HTML, CSS or JS feature.')
  .action(parsingCommand);

// @ts-ignore
program.parse(process.argv);




function parsingCommand(feature: string, options: object): void  {
  const result = searchForFunctionality(feature);

  if (Array.isArray(result)) {
    // @ts-ignore
    const userPrompt = formatMultipleMatches(result);
    console.log(userPrompt);

  }
  else {
    console.log(`feature ${feature} is supported like so: \n`, generateTableOfResults(result));
  }
};

function generateTableOfResults(results:any) : string {

  const table = new Table({
    head: ['1', '2']
  });

  table.push(['value 1', 'value 2'])




  return table.toString();
}

function formatMultipleMatches(matches: string[]): string {
  return [
    'Multiple matches found. Which one were you looking for?',
    'Try again using one of the following commands',
    ...matches.map((match, i) => `    - ciu ${match}`)
  ].join('\n')
}