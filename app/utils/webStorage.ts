export const setCookie = (name: string, value: any, expiresInDay?: number): void => {
  const date: Date = new Date();
  const val = value;
  const days: number = expiresInDay || 1;

  // Set it expire in n days
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

  document.cookie = `${name}=${val}; expires=${date.toUTCString()}; path=/`;
}

export const getCookie = (name: string): any => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return '';
}

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}