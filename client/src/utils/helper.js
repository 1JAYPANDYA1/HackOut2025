"use client";
import * as aesjs from "aes-js";
import { useCallback, useEffect } from "react";

// ---------------- AES ENCRYPTION / DECRYPTION ----------------

export function AES_256_CBC_encrypt(
  message,
  key = process.env.NEXT_PUBLIC_AUTH_KEY,
  iv = process.env.NEXT_PUBLIC_AUTH_IV
) {
  try {
    if (!key || !iv) {
      return "";
    }
    const keyBytes = stringToByteArray(key);
    let messageBytes = stringToByteArray(message);
    const ivBytes = stringToByteArray(iv);

    messageBytes = padBytes(messageBytes);

    const aesCipher = new aesjs.ModeOfOperation.cbc(keyBytes, ivBytes);
    const encryptedBytes = aesCipher.encrypt(messageBytes);

    return bytesToHexString(encryptedBytes);
  } catch (error) {
    console.error("error:===>", error);
    return "";
  }
}

export function AES_256_CBC_decrypt(
  encryptedHex,
  key = process.env.NEXT_PUBLIC_AUTH_KEY,
  iv = process.env.NEXT_PUBLIC_AUTH_IV
) {
  try {
    if (!key || !iv) {
      return "";
    }
    const keyBytes = stringToByteArray(key);
    const ivBytes = stringToByteArray(iv);
    const encryptedBytes = hexStringToBytes(encryptedHex);

    const aesCipher = new aesjs.ModeOfOperation.cbc(keyBytes, ivBytes);
    const decryptedBytes = aesCipher.decrypt(encryptedBytes);

    return byteArrayToString(unpadBytes(decryptedBytes));
  } catch (error) {
    console.error("error:===>", error);
    return "";
  }
}

export function decryptResponseData(resp, key, iv) {
  return AES_256_CBC_decrypt(
    resp,
    key || process.env.NEXT_PUBLIC_AUTH_KEY,
    iv || process.env.NEXT_PUBLIC_AUTH_IV
  );
}

// ---------------- HELPERS ----------------

function stringToByteArray(str) {
  const byteArray = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    byteArray[i] = str.charCodeAt(i);
  }
  return byteArray;
}

function byteArrayToString(byteArray) {
  return String.fromCharCode(...byteArray);
}

function bytesToHexString(byteArray) {
  return Array.from(byteArray, (b) =>
    ("0" + (b & 0xff).toString(16)).slice(-2)
  ).join("");
}

function hexStringToBytes(hexString) {
  const result = [];
  for (let i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substr(i, 2), 16));
  }
  return new Uint8Array(result);
}

function padBytes(input) {
  const blockSize = 16;
  const padding = blockSize - (input.length % blockSize);
  const paddedInput = new Uint8Array(input.length + padding);
  paddedInput.set(input);
  for (let i = input.length; i < paddedInput.length; i++) {
    paddedInput[i] = padding;
  }
  return paddedInput;
}

function unpadBytes(paddedInput) {
  const padding = paddedInput[paddedInput.length - 1];
  return paddedInput.slice(0, paddedInput.length - padding);
}

// ---------------- UTILS ----------------

export const getDecryptedData = (hexstring) => {
  try {
    const data = AES_256_CBC_decrypt(
      hexstring,
      process.env.NEXT_PUBLIC_AUTH_KEY,
      process.env.NEXT_PUBLIC_AUTH_IV
    );
    return JSON.parse(decodeURIComponent(data));
  } catch (error) {
    console.error("error:===>", error);
  }
};

export const isEmpty = (val) => {
  try {
    if (
      val === "" ||
      (Array.isArray(val) && val.length === 0) ||
      val == null ||
      (typeof val === "object" && Object.keys(val).length === 0)
    ) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("error:===>", error);
    return false;
  }
};

export const generateLabelName = (obj, name = "") => {
  if (!obj.parent) return name;
  const newname =
    name === "" ? obj.parent.fieldValues : name + " - " + obj.parent.fieldValues;
  return generateLabelName(obj.parent, newname);
};

export function formatPhoneNumber(params) {
  try {
    const formatted = params.split(" ").map((item, index) => {
      let newNumber = item.replace(/[()\-]/g, "");
      if (index === 0 && params.split(" ").length > 1) {
        newNumber += "-";
      }
      return newNumber;
    });
    return formatted.join("");
  } catch (error) {
    console.error("error:===>", error);
    return params;
  }
}

export function hasIsRelatedField(obj) {
  try {
    return obj && Object.prototype.hasOwnProperty.call(obj, "isRelated");
  } catch (error) {
    console.error("error:===>", error);
  }
}

export function invertShowHide(obj) {
  try {
    if (
      obj &&
      typeof obj === "object" &&
      obj.isRelated &&
      typeof obj.isRelated === "object"
    ) {
      const { show, hide } = obj.isRelated;
      return { ...obj, isRelated: { show: hide, hide: show } };
    }
    return obj;
  } catch (error) {
    console.error("error:===>", error);
    return obj;
  }
}

export function getTrimmedValue(val) {
  try {
    return val.trim();
  } catch (error) {
    console.error("error:===>", error);
    return val;
  }
}

export function getISO2FromStateName(name, arr) {
  try {
    if (Array.isArray(arr)) {
      const found = arr.find(
        (s) =>
          typeof s === "object" &&
          s !== null &&
          s.name?.toLowerCase() === name.toLowerCase()
      );
      return found ? found.iso2 : name;
    }
    return "";
  } catch (error) {
    console.error("error:===>", error);
    return "";
  }
}

export function clearEmptyValuesFromObject(currentObj) {
  try {
    const newObj = {};
    Object.keys(currentObj || {}).forEach((key) => {
      if (!isEmpty(currentObj[key])) {
        newObj[key] = currentObj[key];
      }
    });
    return newObj;
  } catch (error) {
    console.error("error:===>", error);
    return currentObj;
  }
}

export function generateArrayForValidation(data) {
  try {
    if (data.length > 0) {
      return data.split(",").map((item) => {
        const [regexstring, message] = item.split("->");
        return { regexstring, message };
      });
    }
    return [];
  } catch (error) {
    console.error("error:===>", error);
    return [];
  }
}

export const formatFieldName = (str) => str.replaceAll(" ", "_");

export function useDebounce(effect, dependencies, delay) {
  const callback = useCallback(effect, dependencies);
  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

export const isValidArray = (params) => {
  try {
    return params.every((item) => !isEmpty(item));
  } catch (error) {
    console.error("error:===>", error);
    return false;
  }
};

export function getMessage(error) {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  if (typeof error === "string") return error;
  return "Something went wrong";
}

export const handleSaveId = (id, idArray) => {
  const newArr = [...idArray];
  try {
    if (idArray.includes(id)) {
      return newArr.filter((x) => x !== id);
    } else {
      newArr.push(id);
      return newArr;
    }
  } catch (error) {
    console.error("error:===>", error);
    return newArr;
  }
};

const generateArrayForValidationErrorObject = (error) => {
  try {
    const data = error?.response?.data?.data;
    if (data && typeof data === "object") {
      return Object.keys(data).map((key) => ({ message: data[key] }));
    }
    return [];
  } catch (err) {
    console.error("error:===>", err);
    return [];
  }
};

export const showValidationToasts = (error, showToast) => {
  try {
    const errorMessages = generateArrayForValidationErrorObject(error);
    if (errorMessages.length > 0) {
      errorMessages.forEach((e) =>
        showToast({ message: e.message, type: "error" })
      );
    } else {
      showToast({ message: getMessage(error), type: "error" });
    }
  } catch (err) {
    console.error("error:===>", err);
    showToast({ message: getMessage(error), type: "error" });
  }
};

export const formatPrice = (price) => {
  try {
    const numeric = typeof price === "number" ? price : parseFloat(price.replace(/,/g, ""));
    if (isNaN(numeric)) throw new Error("Invalid price");
    return numeric.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  } catch (error) {
    console.error("error:===>", error);
    return String(price);
  }
};

export const handleConditionFieldValues = (params, name, country) => {
  try {
    if (name === "Condition" && params === "Foreign Used") {
      return country === "Nigeria" ? "Foreign Used" : "Used";
    }
    return params;
  } catch (error) {
    console.error("error:===>", error);
    return params;
  }
};

export const getFrontendStatus = (backendStatus) => {
  const reverseStatusMap = {
    approved: "Published",
    draft: "Draft",
    expired: "Expired",
    pending: "Under Review",
    rejected: "Rejected",
    deactivated: "Deactivated",
  };
  return reverseStatusMap[backendStatus] || backendStatus;
};
