const blacklistedTokens = [];

const addTokenToBlacklist = (token) => {
  blacklistedTokens.push(token);
};

const isTokenBlacklisted = (token) => {
  return blacklistedTokens.includes(token);
};

export { addTokenToBlacklist, isTokenBlacklisted, blacklistedTokens };
 