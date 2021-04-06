import { DefaultTheme } from "styled-components";

type SizeType = {
    size?: number,
    unit?: string
}

function convertSizeStringToSizeNumber(size: string): SizeType {
    const resultValue: SizeType = {
        size: undefined,
        unit: undefined
    }

    const sizeNumber = Number(size);
    if (isNaN(sizeNumber)) {
        //console.log(size.match(/(\d*)/));
    }

    resultValue.size = Number(size);

    return resultValue;
}

const theme = {
    colors: {
        primary: {
            main: "#FFFFFF",
        },
        secondary: {
            main: "#0060C2"
        },
        third: {
            main: "#0000191A"
        }
    },
    fonts: {
        colors: {
            primary: {
                main: "#FFFFFF"
            },
            secondary: {
                main: "#000000"
            },
            third: {
                main: "#0060C2"
            }
        }
    },
    spacingFactor: 0.5,
    spacing: (spacing = 1) => spacing * theme.spacingFactor,
    size: (sizeString: string) => {
        let resultValue: string | undefined;
        let { size, unit } = convertSizeStringToSizeNumber(sizeString);

        if (!size) {
            resultValue = "fit-content"
        } else {
            resultValue = size?.toString();

            unit = unit ? unit : "px";
            resultValue += unit;
        }

        console.log(resultValue);

         return resultValue;
    }
}

export default theme;