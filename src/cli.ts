import searchForFunctionality from './core/searchForFunctionality'

export default function () {
  const feature = 'grid';
  const result = searchForFunctionality(feature);

  if (Array.isArray(result)) {
    // @ts-ignore
    const userPrompt = formatMultipleMatches(result);
    console.log(userPrompt);

  }
  else {
    console.log(`feature ${feature} is supported like so: `, result);

  }
}

function formatMultipleMatches(matches: string[]): string {
  return [
    'Multiple matches found. Which one were you looking for?',
    'Type the number or "c" to cancel.',
    ...matches.map((match, i) => `    [${i}] - ${match}`)
  ].join('\n')
}