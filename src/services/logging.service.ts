function logging<T>(context: string, data: T) {
    console.log("current context -> " + context);
    console.log(data);
    console.log("end context");
}

function errorLogging<T>(context: string, data: T) {
    logging(context, data);
}

export {
    logging,
    errorLogging
}