import { ValueOf } from './types/typescript.utils';

const values = {
    small_low: 400,
    small_high: 600
}

enum dimension {
    "max-width",
    "min-width",
    "max-height",
    "min-height"
}

type mediaQueriesPropsType = {
    keys: Array<ValueOf<typeof values>>,
    dimensions: Array<dimension>
}

export function mediaQueries({keys, dimensions} : mediaQueriesPropsType) {
    return function (style: string) {
        const length = Math.min(keys.length, dimensions.length);
        var media = `@media all`;

        for (let i = 0; i < length; i++) {
            media += ` and (${dimension[i]}: ${keys[i]}px)`;
        }

        return media + ` {${style}}`;
    }
}

export {
    values,
    dimension
}