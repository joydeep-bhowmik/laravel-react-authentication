import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function api(url: string): string {
  const endpoint = "http://127.0.0.1:8000";
  return endpoint + (url.startsWith("/") ? url : "/" + url);
}

export function setCookie(
  cookieName: string,
  cookieValue: any,
  expirationDays: number
): void {
  var d = new Date();
  d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export function getCookie(cookieName: string): string {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

export function removeCookie(cookieName: string) {
  // Set the expiration date to the past
  var expiredDate = new Date();
  expiredDate.setTime(expiredDate.getTime() - 1);
  var expires = "expires=" + expiredDate.toUTCString();

  return (document.cookie = cookieName + "=; " + expires + ";path=/");
}

export function capitalizeFirstLetter(sentence: string): string {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
