# CANIUSE-BOT

This is a simple wrapper around caniuse-api to simplify me making a few other projects.

All the data return should match what's used on [www.caniuse.com](https://caniuse.com).

## Installation

`npm install --save caniuse-bot`

## Usage

The main usage of this package is the `searchForFunctionality` function.
Provided with a string it will try and find and format the corresponding date from caniuse.

```TypeScript
import { searchForFunctionality } from 'caniuse-bot';

const results = searchForFunctionality('css-grid');

console.log(results);
/**
 * {
 *     fullSupport: { firefox: 52, chrome: 57, edge: 16, safari: 10.1 },
 *     partialSupport: { firefox: 51, chrome: 56, ie: 9, safari: 10 },
 *     noSupport: { firefox: 18, chrome: 24, ie: 8, safari: 5.1 }
 * }
*/
```

However if you provide an argument that could give an ambiguous answer then it returns an array of strings containing each option.
It's up to the consumer to decide how to handle this.

```TypeScript
import { searchForFunctionality } from 'caniuse-bot';

const results = searchForFunctionality('grid');

console.log(results);
/**
 * [ 'css-grid', 'css-subgrid' ]
*/
```

## Contributing

Contributions welcome! Though at this point I don't know what there is to add.

## License

This project is MIT licensed.
