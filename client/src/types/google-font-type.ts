export type FontVariant = 'regular' | 'italic' | '700' | '700italic';
export type FontSubset = 'greek' | 'greek-ext' | 'cyrillic-ext' | 'latin-ext' | 'latin' | 'cyrillic';

export type GoogleFont = {
  kind: string;
  family: string;
  variants: FontVariant[];
  version: string;
  lastModified: string;
  files: {
    [key in FontVariant]?: string;
  };
  subsets: FontSubset[];
};
