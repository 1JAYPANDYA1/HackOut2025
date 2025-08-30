import Constant from "./constant";

export const validateEmail = {
  required: true,
  validate: (value) => {
    if (!value) return true;
    if (value.match(Constant.REGEX.EMOJI)) {
      return "Invalid characters in email";
    }
    if (!value.match(Constant.REGEX.EMAIL)) {
      return "Please enter a valid email address!";
    }
    // Check for consecutive dots in the email
    if (value.includes("..")) {
      return "Email address cannot contain consecutive dots";
    }

    // Check for consecutive dots in the domain part specifically
    const domainPart = value.split("@")[1];
    if (domainPart && domainPart.includes("..")) {
      return "Email address cannot have consecutive dots in the domain part";
    }
    return true;
  },
};

export const validateMutiFieldPassword = {
  required: true,
  validate: {
    hasUppercase: (value) =>
      (value && value.match(Constant.REGEX.UPPERCASE) !== null) ||
      "Password must contain at least one uppercase letter",
    hasLowerCase: (value) =>
      (value && value.match(Constant.REGEX.LOWERCASE) !== null) ||
      "Password must contain at least one lowercase letter",
    hasNumbers: (value) =>
      (value && value.match(Constant.REGEX.NUMBER) !== null) ||
      "Password must contain at least one number",
    hasSpecialChar: (value) =>
      (value && value.match(Constant.REGEX.SPECIAL_CHARECTERS) !== null) ||
      "Password must contain at least one special character",
    length: (value) =>
      (value && value.length >= 8 && value.length <= 16) ||
      "Password must be at least 8 characters long and maximum 16 characters long",
    noEmoji: (value) =>
      (value && !value.match(Constant.REGEX.EMOJI)) ||
      "Password cannot contain emojis",
  },
};

export const validateName = (fieldName) => ({
  required: true,
  validate: (value) => {
    if (!value) return true;
    if (value.match(Constant.REGEX.EMOJI)) {
      return `Invalid characters in ${fieldName}`;
    }
    if (!value.match(Constant.REGEX.NAME)) {
      return "Please enter only letters, accented letters, hyphens and apostrophes.";
    }
    return true;
  },
});

export const validateBusinessName = (fieldName) => ({
  required: true,
  validate: (value) => {
    if (!value) return true;
    if (value.match(Constant.REGEX.EMOJI)) {
      return `Invalid characters in ${fieldName}`;
    }
    if (!value.match(Constant.REGEX.BUSINESS_NAME)) {
      return "Only letters, numbers, spaces, &, ., comma, apostrophes,accented letters and hyphens are allowed";
    }
    return true;
  },
});

export const multiErrorFields = [
  { hasUppercase: "Password must contain at least one uppercase letter" },
  { hasLowerCase: "Password must contain at least one lowercase letter" },
  { hasNumbers: "Password must contain at least one number" },
  { hasSpecialChar: "Password must contain at least one special character" },
  {
    length:
      "Password must be at least 8 characters long and maximum 16 characters long",
  },
  { noEmoji: "Password cannot contain emojis" },
];
