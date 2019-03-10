// Type definitions for wildemitter 1.2
// Project: https://github.com/HenrikJoreteg/wildemitter#readme
// Definitions by: My Self <https://github.com/johngeorgewright>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface Callback {
    (...args: any[]): void;
    _groupName?: string;
}

export type Constructable = new (...args: any[]) => any;

export default class WildEmitter {
    isWildEmitter: boolean;

    on(event: string, fn: Callback): WildEmitter;
    on(event: string, groupNmae: string, fn: Callback): WildEmitter;

    once(event: string, fn: Callback): WildEmitter;
    once(event: string, groupName: string, fn: Callback): WildEmitter;

    releaseGroup(groupName: string): WildEmitter;

    off(event: string, fn?: Callback): WildEmitter;

    emit(event: string, ...args: any[]): WildEmitter;

    getWildcardCallbacks(eventName: string): Callback[];

    static mixin(constructor: Constructable | {[key: string]: any}): void;
}
