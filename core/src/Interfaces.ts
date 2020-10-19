

// export default {
//     BrowserData,
//     OutputData,
//     GatheredOutputData
//     // CIUOutput,
//     // CIUSupportData
// } 


export interface BrowserData {
    DisplayName: String, 
    CiuCode: string
}   

export interface OutputData { 
    [browser: string]: number;
}

export interface GatheredOutputData {
    noSupport: OutputData,
    partialSupport: OutputData,
    fullSupport: OutputData
}

// interface CIUSupportData {
//     /** Supported from this version onwards */
//     y?: number, 
//     /** Unsupported up to and including this version */
//     n?: number,
//     /** Partial support from this version onwards */
//     p?: number,
//     /** Support for alternative spec, up tp and including this version */
//     a?: number,
//     /** Supported, with a prefix, up to this version */
//     x?: number
// }

// interface CIUOutput extends Iterable<CIUSupportData> {

//     [key: string]: CIUSupportData
// }