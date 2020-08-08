export {
    BrowserData,
    CIUOutput,
    CIUSupportData
} 


interface BrowserData {
    DisplayName: String, 
    CiuCode: string
}   


interface CIUSupportData {
    /** Supported from this version onwards */
    y?: number, 
    /** Unsupported up to and including this version */
    n?: number,
    /** Partial support from this version onwards */
    p?: number,
    /** Support for alternative spec, up tp and including this version */
    a?: number,
    /** Supported, with a prefix, up to this version */
    x?: number
}

interface CIUOutput {

    [prop: string]: CIUSupportData
}