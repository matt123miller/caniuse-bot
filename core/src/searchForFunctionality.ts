import { BrowserSupport, getSupport, find as ciuFind } from 'caniuse-api';
import pkg from '../package.json';

import { defaultBrowsers } from './defaultSupportedBrowsers';
import { OutputData, GatheredOutputData, BrowserData } from './Interfaces';

export function searchForFunctionality(feature: string): GatheredOutputData | string[] {
  try {
    if (feature === '') {
      throw new RangeError(`An empty string isn't acceptable input.`);
    }
    // TODO: Update the typings in definitelytyped
    const findResults: string | string[] = ciuFind(feature);

    if (Array.isArray(findResults)) {
      return findResults;
    } else {
      const extractedData = gatherSupportDataFor(findResults);
      return extractedData;
    }
  } catch (error) {
    console.info(`Error thrown: ${error.message}\nPlease report this issue at ${pkg.bugs.url}`);
    throw error;
  }
}

/**
 * Transforms the results from caniuse-api into something a big friendlier for consumption
 * @param findResults 
 * @returns 
 */
function gatherSupportDataFor(findResults: string): GatheredOutputData {
  const useAllBrowsers = false; // TODO: Make better. Default arg maybe?
  const searchResult = getSupport(findResults);
  const extractedData = extractBrowserData(searchResult, useAllBrowsers);
  return extractedData;
}

/**
 * Take the data returned by caniuse-api and reformat it into something easier to work with
 * @param data
 * @param all Currently I'm only supporting the default browsers. Will add different options in future
 * @returns An object summarising the different support data
 */
function extractBrowserData(data: BrowserSupport, all = false): GatheredOutputData {
  let relevantBrowsers: BrowserSupport = data;

  if (all === false) {
    relevantBrowsers = {};
    // extract only the default browsers for now
    defaultBrowsers.forEach(({ CiuCode }) => {
      relevantBrowsers[CiuCode] = data[CiuCode];
    });
  }

  const fullSupport: OutputData = {};
  const partialSupport: OutputData = {};
  const noSupport: OutputData = {};

  Object.entries(relevantBrowsers).forEach(([browser, data]) => {
    if (data.n) {
      noSupport[browser] = data.n;
    }
    if (data.p) {
      partialSupport[browser] = data.p;
    }
    if (data.y) {
      fullSupport[browser] = data.y;
    }
  });

  return { fullSupport, partialSupport, noSupport };
}
