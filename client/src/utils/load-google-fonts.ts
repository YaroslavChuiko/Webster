import { GOOGLE_FONTS_STYLESHEETS_API_URL } from '~/consts/fonts';

//https://github.com/hughsk/google-fonts/tree/master

type List = {
  [key: string]: boolean | string | string[];
};

function append(fonts: List) {
  const link = asElement(fonts);
  document.head.appendChild(link);
  return link;
}

function asElement(fonts: List) {
  const href = getHref(fonts);
  const link = document.createElement('link');
  link.setAttribute('href', href);
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  return link;
}

function getHref(fonts: List) {
  const family = Object.keys(fonts)
    .map(function (name) {
      const details = fonts[name];
      name = name.replace(/\s+/g, '+');
      return typeof details === 'boolean' ? name : name + ':' + makeArray(details).join(',');
    })
    .join('|');

  return `${GOOGLE_FONTS_STYLESHEETS_API_URL}css?family=${family}`;
}

function makeArray(arr: string | string[]) {
  return Array.isArray(arr) ? arr : [arr];
}

export { append as loadGoogleFonts };
