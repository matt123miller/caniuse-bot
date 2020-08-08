import caniuse from 'caniuse-api';
import fetch from 'node-fetch';

import {default as defaultBrowsers} from './defaultSupportedBrowsers';
import { CIUOutput, CIUSupportData, BrowserData } from './Interfaces';


async function wrapper(feature: string) {
    
    console.log(args);

    try {
        const findResults = caniuse.find(feature);
        
        console.log({findResults});
        
        if(Array.isArray(findResults)) {
            console.log('ask the user to choose one, like avrae picking a spell');
            
             // Eventually get a single feature to search for. 
            // Then carry on as if there wass only ever 1 feature entered  
        }
        else {
            const extractedData = gatherSupportDataFor(findResults);
            console.log({extractedData});
        }

    } catch (error) {
        console.log(error)
    }
        
}

function gatherSupportDataFor(findResults: string) : string {
    const searchResult = caniuse.getSupport(findResults);
    const extractedData = extractBrowserData(searchResult);
    return extractedData;
}


function extractBrowserData(data: CIUOutput, all = false) : string {
    
    let relevantBrowsers : CIUOutput = {};
    
    if(all) {
        relevantBrowsers = data;
    }
    else {
        // extract only the default browsers for now
        defaultBrowsers.forEach(({CiuCode}) => {
            relevantBrowsers[CiuCode] = data[CiuCode];
        });
    }

    console.log({relevantBrowsers});
    const fullSupport = {};

    const partialSupport = {};

    const noSupport = {};






    return '';
}

var args = process.argv.slice(2);

wrapper(args[0])