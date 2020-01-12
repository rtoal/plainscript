/// <reference types="node" />

declare module 'pretty-js' {
    interface IPrettyJsOptions {
        indent: string;
    }

    export function prettyJs(target: string, options: IPrettyJsOptions): string;
}
