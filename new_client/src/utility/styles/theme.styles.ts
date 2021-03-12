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
    size: ( size?: number, unit?: string) => {
        var resultValue: string | undefined;

        if (!size) {
            resultValue = "fit-content"
        } else {
            resultValue = size?.toString(); 

            unit ?? (resultValue += unit)
        }

        console.log(resultValue);

        return resultValue;
    }
}

export default theme;