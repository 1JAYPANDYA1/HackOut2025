import emojiRegex from "emoji-regex";

const Constant = {
  REGEX: {
    EMAIL:
      /^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF](\.?[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF_%+-])*@[a-zA-Z0-9-]+\.((com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum|in|co|us|uk|io|dev|app|tech|ai|me|tv|store|online|site|xyz|pro|cloud|live|blog|shop|digital|agency|solutions|media|company|group|global|today|tools|world|academy|capital|email|center|systems|network|support|finance|design|team|zone|space|news|consulting|marketing))$/,
    UPPERCASE: /[A-Z]/g,
    LOWERCASE: /[a-z]/g,
    NUMBER: /[0-9]/,
    NAME: /^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/,
    SPECIAL_CHARECTERS: /[!@#$%^&*(),.?":{}|<>]/,
    PHONE_NUMBER: /^\d{9,13}$/,
    PASSWORD: /^(?!.*[\uD83C-\uDBFF\uDC00-\uDFFF]).*$/,
    EMOJI: emojiRegex(),
    BUSINESS_NAME: /^[\p{L}0-9&.,\- ]+( (Ltd|Inc|Corp|LLC|Co)\.?)?$/u,
  },
  LOCALSTORAGEKEYS: {
    ACCESS_TOKEN: "accesstoken",
    REFRESH_TOKEN: "refreshtoken",
  },
};

export default Constant;
