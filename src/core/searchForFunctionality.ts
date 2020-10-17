import caniuse, {BrowserSupport} from 'caniuse-api';
import fetch from 'node-fetch';

import { default as defaultBrowsers } from './defaultSupportedBrowsers.js';
import {  BrowserData } from './Interfaces.js';


export default async function searchForFunctionality(feature: string) {

  try {
    const findResults = caniuse.find(feature);

    console.log({ defaultBrowsers });

    if (Array.isArray(findResults)) {
      console.log('ask the user to choose one, like avrae picking a spell');

      // Eventually get a single feature to search for. 
      // Then carry on as if there wass only ever 1 feature entered  
      // chooseFromOptions(findResults);
    }
    else {
      const extractedData = gatherSupportDataFor(findResults);
      console.log({ extractedData });
    }

  } catch (error) {
    console.log(error)
  }

}

function gatherSupportDataFor(findResults: string): string {
  const searchResult = caniuse.getSupport(findResults);
  const extractedData = extractBrowserData(searchResult);
  return extractedData;
}


function extractBrowserData(data: BrowserSupport, all = false) : string {

  let relevantBrowsers: BrowserSupport = data;
  
  if (all === false) {

    // extract only the default browsers for now
    defaultBrowsers.forEach(({ CiuCode }) => {

      
      relevantBrowsers[CiuCode] = data[CiuCode];
    });
  }

  // console.log(relevantBrowsers);
  

  Object.entries(relevantBrowsers).forEach(([browser, data]) => {
      console.log(browser, data);
      
  })
  const fullSupport = {};

  const partialSupport = {};

  const noSupport = {};






  return '';
}
