export function debounce(f, t) {
  const calls = {};
  return function (args) {
    let previousCall = calls.lastCall;
    calls.lastCall = Date.now();
    if (previousCall && calls.lastCall - previousCall <= t) {
      clearTimeout(calls.lastCallTimer);
    }
    calls.lastCallTimer = setTimeout(() => f(args), t);
  };
}

export const ruRegexp = /^[а-яА-ЯёЁ]+$/;

export const enRegexp = /^[a-zA-Z]+$/;

export const numbersRegexp = /^[0-9]+$/;

export const dateRegexp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

export const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
