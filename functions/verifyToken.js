const verifyToken = (tokenWithoutBearer) => {
    console.log(tokenWithoutBearer)
    const SECRET = process.env.SECRET;
    return tokenWithoutBearer === SECRET;
}

module.exports = verifyToken