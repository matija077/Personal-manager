
const PORT = 5010;
const returnCodes = {
    'error': 500,
    'ok': 200,
    'noContent': 204
};

Object.assign(module.exports, {PORT, returnCodes});