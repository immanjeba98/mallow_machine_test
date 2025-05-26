// @ts-nocheck
import { EXIST_LOCAL_STORAGE } from '../constants';

export const removeDuplicateArray = (data: any, key: any) => {
  return [...new Map(data?.map((item: any) => [item[key], item])).values()];
};

export const objectToQueryString = (
  params:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined
) => {
  const queryString = new URLSearchParams(params).toString();
  return `?${queryString}`;
};

/*
 * LetterAvatar
 *
 * Artur Heinze
 * Create Letter avatar based on Initials
 * based on https://gist.github.com/leecrossley/6027780
 */

export const letterAvatar = (name: string, size: number, colour = true) => {
  name = name || "";
  size = size || 60;
  // colour = colour || true;

  var colours = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#34495e",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#ecf0f1",
    "#95a5a6",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#bdc3c7",
    "#7f8c8d",
  ],
    nameSplit = String(name).toUpperCase().split(" "),
    initials,
    charIndex,
    colourIndex,
    canvas,
    context: any,
    dataURI;

  if (nameSplit.length == 1) {
    initials = nameSplit[0] ? nameSplit[0].charAt(0) : "?";
  } else {
    initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
  }

  if (window.devicePixelRatio) {
    size = size * window.devicePixelRatio;
  }

  charIndex = (initials == "?" ? 72 : initials.charCodeAt(0)) - 64;
  colourIndex = charIndex % 20;
  canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  context = canvas.getContext("2d");

  context.fillStyle = colour ? colours[colourIndex - 1] : "transparent";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = Math.round(canvas.width / 2) + "px Arial";
  context.textAlign = "center";
  context.fillStyle = colour ? "#FFF" : "#454545";
  context.fillText(initials, size / 2, size / 1.5);

  dataURI = canvas.toDataURL();
  canvas = null;

  return dataURI;
};

export const isEmpty = (obj: {}) => {
  console.log("object error--->", obj);
  if (obj) {
    return Object?.keys(obj)?.length === 0;
  }
  else {
    return false
  }

};

export const getBase64FromUrl = async (url: RequestInfo | URL) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

export const setStorage = (name: string, data: string) => {
  localStorage.setItem(name, typeof data === 'string' ? data : JSON.stringify(data));
};

export const getStorage = (name: string) => {
  return localStorage.getItem(name);
};

export const removeStorage = (name?: string) => {
  if (!!name) {
    localStorage.removeItem(name);
  } else {
    Object.keys(EXIST_LOCAL_STORAGE).forEach(key => {
      localStorage.removeItem(EXIST_LOCAL_STORAGE[key]);
    });
  }
};

export const handleNumberRound = (num: number) => {
  return Math.round(num ? num : 0);
};

export function isFloat(n: any) {
  return Number(n) === n && n % 1 !== 0;
}

export const getSno = (index: number, data: any, perPageRecords: any) => {
  let page = index + 1;
  // console.log("response", data);

  let pageNo = (page + data?.page_no * perPageRecords) - perPageRecords;
  return pageNo > data.total_records ? data.start_record + index : pageNo;
}

export const dateFormat = (date: any) => {
  let objectDate = new Date(date);
  let day = objectDate.getDate();

  let month = objectDate.getMonth() + 1;

  let year = objectDate.getFullYear();

  const m = (month < 10 ? '0' + String(month) : month)
  const d = (day < 10 ? '0' + String(day) : day)
  // console.log(" dfgasdfsdf component", m , d); // 2022

  return year + "-" + m + "-" + d;
}

export const getWindowSize = () => {
  const { innerWidth } = window;
  return { innerWidth };
}

export const getPlatform = () => {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "IOS";
  } else if (/Android/.test(userAgent)) {
    return "Android";
  } else if (platform.toLowerCase().includes("win")) {
    return "Windows";
  } else if (/Mac/.test(platform)) {
    return "Mac";
  } else {
    return "Other platforms";
  }
}
export const getBrowserName = () => {
  const userAgent = window.navigator.userAgent;
  const browsers = {
    'Edge': /Edg\/\d+\.\d+(\.\d+)?/,
    'Opera': /Opera\/(\S+)/,
    'Chrome': /Chrome\/(\S+)/,
    'Firefox': /Firefox\/(\S+)/,
    'Safari': /Version\/(\S+).*Safari\/(\S+)/,
    'MSIE': /MSIE (\S+);/
  };

  for (const browser in browsers) {
    const match = userAgent.match(browsers[browser]);
    if (match) {
      return browser;
    }
  }
  return 'Other browsers';
};
export const getDevicePlatform = () => {
  const devicePlatform = getPlatform();
  const deviceBrowser = getBrowserName();
  return `${deviceBrowser} on ${devicePlatform}`;
}

// const todayDate = String(new Date().getUTCDate()).padStart(2, '0');


export const getCommaSeperatedNumbers = (num: number | string | undefined) => {
  if (num) {
    return typeof num === "number" ? num.toLocaleString() : parseFloat(num).toLocaleString();
  }
}

export const hasLowerCase = (str) => {
  return (/[a-z]/.test(str));
}
export const hasUpperCase = (str) => {
  return (/[A-Z]/.test(str));
}
export const hasNumber = (str) => {
  return (/[0-9]/.test(str));
}
export const hasSpecialCharacter = (str) => {
  const format = /[@$!%*?&#-]/;
  return (format.test(str));
}

export const getElementHeight = (element: HTMLElement) => {
  return element?.getBoundingClientRect()?.height
}

export const convertPathNameToPageName = (pathName: string) => {
  if (pathName === "/") return "Home";
  else if (pathName === "/screener") return "Screener";
  else if (pathName.includes("/discussion")) return "Discussion";
  else if (pathName.includes("/bond-detail")) return "Bond Detail (Old)";
  else if (pathName.includes("/bonds")) return "Bond Detail";
  else if (pathName === "/dashboard") return "Dashboard";
  else if (pathName.includes("/portfolio")) return "Portfolio";
  else if (pathName.includes("/myprofile")) return "Profile";
  else if (pathName.includes("/login")) return "Login";
  else if (pathName.includes("/registerpage")) return "Registration";
  else if (pathName === "/privacy-policy") return "Privacy Policy";
  else if (pathName.includes("/admin_panel")) return "Admin Panel";
  else if (pathName.includes("/issuer-bonds")) return "Issuer bonds";
  else if (pathName.includes("/partners")) return "Partners";
  else if (pathName.includes("/forgot-password")) return "Forgot password";
  else if (pathName.includes("/reset-password")) return "Reset password";
  else if (pathName.includes("/issuers")) return "Issuers index";
  else if (pathName.includes("/viewprofile")) return "View profile";
  else if (pathName.includes("/terms-and-condition")) return "Terms and condition";
  else if (pathName.includes("/activation")) return "Account Activation";
  else if (pathName.includes("/registration-success")) return "Registration Success";
  else return pathName;
};

export const getExactPath = (path: string) => {
  if (path.substring(1).includes('/')) {
    return path.substring(0, path.substring(1).indexOf('/') + 1)
  } else {
    return path
  }
}
export const encodeTextForSEO = (text) => {
  return text?.replaceAll('-', '﹣').replaceAll(' ', '-').replaceAll('/', '|').replaceAll('&', '%26')
};

export const decodeTextFromSEO = (text) => {
  return text?.replaceAll('_', ' ').replaceAll('﹣', '-').replaceAll('|', '/').replaceAll('%26', '&');
};
// export const getencodedTextForSEO = (text: string) => text?.replaceAll('-', '﹣').replaceAll(' ', '-').replaceAll('/', '|').replaceAll('&', '%26')
// export const getdecodedTextForSEO = (text: string) => text?.replaceAll('-', ' ').replaceAll('﹣', '-').replaceAll('|', '/')
export const getencodedTextForSEO = (text: string) =>
  text?.replaceAll('-', '﹣').replaceAll(' ', '-').replaceAll('/', '|').replaceAll('&', '~');

export const setEncodetext = (text: string) =>
  text?.replaceAll(/\//g, '|').replaceAll("&", "-and-").replaceAll(" ", "-").replace(/-{2,}/g, '-');    
 
export const getdecodedTextForSEO = (text: string) =>
  text?.replaceAll('-', ' ').replaceAll('﹣', '-').replaceAll('|', '/').replaceAll('-and-', '&');
// export const getencodedTextForSEO = (text: string) => {
//   if (!text) return '';
//   return text
//     .replace(/\s+/g, '-')  // Replace spaces with hyphens
//     .replace(/\//g, '|')   // Replace forward slashes with vertical bars
//     .replace(/\./g, '~')   // Replace dots with tildes
//     .replace(/[^a-zA-Z0-9-|~]/g, ''); // Remove other special characters
// };

// export const getdecodedTextForSEO = (text: string) => {
//   if (!text) return '';
//   return text
//     .replace(/\|/g, '/')   // Replace vertical bars with forward slashes
//     .replace(/~/g, '.')    // Replace tildes with dots
//     .replace(/-/g, ' ');   // Replace hyphens with spaces
// };
export function getDividedArray(array, cols) {
  function split(array, cols) {
    if (cols == 1) return array;
    var size = Math.ceil(array.length / cols);
    return array.slice(0, size).concat([null]).concat(split(array.slice(size), cols - 1));
  }

  var a = split(array, cols);
  var groups = [];
  var group = [];
  for (var i = 0; i < a.length; i++) {
    if (a[i] === null) {
      groups.push(group);
      group = [];
      continue;
    }
    group.push(a[i]);

  }
  groups.push(group);
  return groups;
}
export const decodeHTML = (stringToBeDecoded: string) => {
  var doc = new DOMParser().parseFromString(stringToBeDecoded, "text/html");
  return doc.documentElement.textContent;
}

export function createChildElement(parentElement: HTMLElement, childElementTagName: string, childElementAttributes: { key: string, value: string }[]) {

  if (parentElement) {
    const childElement = document.createElement(childElementTagName);

    childElementAttributes.forEach(({ key, value }) => {
      childElement.setAttribute(key, value);
    });

    parentElement.appendChild(childElement);
  }
}

export const removeOldMetaTags = (query: string): void => {
  try {
    const descriptionTags = document.head.querySelectorAll(query);

    if (descriptionTags.length <= 1) return;

    Array.from(descriptionTags)
      .slice(0, -1)
      .forEach(tag => document.head.removeChild(tag));
  } catch (error) {
    console.error(`Error removing meta tags with query "${query}":`, error);
  }
};