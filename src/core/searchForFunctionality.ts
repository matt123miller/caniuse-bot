import { BrowserSupport, getSupport, find as ciuFind } from 'caniuse-api';
import fetch from 'node-fetch';

import { default as defaultBrowsers } from './defaultSupportedBrowsers.js';
import { OutputData, GatheredOutputData, BrowserData } from './Interfaces.js';


export default function searchForFunctionality(feature: string) : String[] | GatheredOutputData {

  try {
    const findResults = ciuFind(feature);

    if (Array.isArray(findResults)) {
      return findResults;
    }
    else {
      const extractedData = gatherSupportDataFor(findResults);
      return extractedData
    }
  } 
  catch (error) {
    console.error(error)
  }

  return <GatheredOutputData>{}
}

function gatherSupportDataFor(findResults: string): GatheredOutputData {
  const useAllBrowsers = false; // TODO:
  const searchResult = getSupport(findResults);
  const extractedData = extractBrowserData(searchResult, useAllBrowsers);
  return extractedData;
}


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

    if(data.n) {
      noSupport[browser] = data.n;
    }
    if (data.p) {
      partialSupport[browser] = data.p;
    }
    if (data.y) {
      fullSupport[browser] = data.y;
    }
  })

  return { fullSupport, partialSupport, noSupport };
}
