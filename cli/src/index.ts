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
    const userPrompt = formatMultipleMatches(result);
    console.log(userPrompt);
  }
  else {
    console.log(`${feature} is supported in the following browsers`)
    console.log(generateTableOfResults(result));
    console.log(`For more information see https://caniuse.com/?search=${feature}`)
  }
};

function generateTableOfResults(results:GatheredOutputData) : string {

  const allBrowserKeys = [...Object.keys(results.fullSupport), ...Object.keys(results.partialSupport), ...Object.keys(results.noSupport)]
  const uniqueBrowserNames = Array.from(new Set(allBrowserKeys));
  
  
  const table = new Table({
    head: ['Browsers:', ...uniqueBrowserNames]
  });

  table.push(generateTableRow('No Support', results.noSupport));
  table.push(generateTableRow('Partial Support', results.partialSupport));
  table.push(generateTableRow('Full Support', results.fullSupport));

  return table.toString();

  function generateTableRow(rowTitle: string, supportData: OutputData) : string[] {
    const row: string[] = uniqueBrowserNames.map(b => supportData[b]?.toString() ?? '');
    return [rowTitle, ...row];
  }
}

function formatMultipleMatches(matches: string[]): string {
  return [
    'Multiple matches found. Which one were you looking for?',
    'Try again using one of the following commands',
    ...matches.map((match, i) => `    - ciu ${match}`)
  ].join('\n')
}


interface OutputData {
  [browser: string]: number;
}

interface GatheredOutputData {
  noSupport: OutputData,
  partialSupport: OutputData,
  fullSupport: OutputData
}