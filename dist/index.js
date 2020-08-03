import caniuse from 'caniuse-api';
async function wrapper() {
    var args = process.argv.slice(2);
    console.log(args);
    try {
        const feature = args[0];
        const findResults = caniuse.find(feature);
        console.log({ findResults });
        if (Array.isArray(findResults)) {
            console.log('ask the user to choose one, like avrae picking a spell');
        }
        else {
            const searchResult = caniuse.getSupport(findResults);
            const extractedData = extractBrowserData(searchResult);
            console.log({ extractedData });
        }
    }
    catch (error) {
        console.log(error);
    }
}
function extractBrowserData(data) {
}
wrapper();
