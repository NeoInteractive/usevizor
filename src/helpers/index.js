import MD5 from "crypto-js/md5";

/**
 * @param {string} email
 */
export function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const hashMD5 = (str) => MD5(str).toString();
export const getGravatar = (email) => {
  if (!email) return;
  const emailHash = hashMD5(email);
  return `//www.gravatar.com/avatar/${emailHash}?s=200`;
};
export const getTeamImage = (team, name) => {
  switch (team) {
    case "one":
      return `https://ui-avatars.com/api/?name=${name}&bold=true&background=141527&color=fff&size=128`;
    case "two":
      return `https://ui-avatars.com/api/?name=${name}&bold=true&background=141527&color=fff&size=128`;

    default:
      break;
  }
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};
