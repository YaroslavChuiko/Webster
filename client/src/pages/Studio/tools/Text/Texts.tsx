import { Button, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DEFAULT_TEXT_OBJECT } from '~/consts/stage-object';
import useStageObject from '~/hooks/use-stage-object';
import { StageTextData } from '~/types/stage-object';
import SearchForm, { TFilter } from './SearchForm';
import { loadGoogleFontsDefaultVariants } from '~/utils/load-google-fonts-default-variants';
import useGetFontListQuery from '~/hooks/use-get-font-list-query';
import { GoogleFont } from '~/types/google-font-type';

const defaultTextStylesButtons: Partial<StageTextData>[] = [
  {
    text: 'Add a heading',
    fontSize: 78,
    width: 600,
    fontStyle: 'bold',
  },
  {
    text: 'Add a subheading',
    fontSize: 44,
    width: 400,
    fontStyle: 'bold',
  },
  {
    text: 'Add a little bit of body text',
    fontSize: 30,
    width: 400,
    fontStyle: 'normal',
  },
];

const Texts = () => {
  const { createOne } = useStageObject();
  const [query, setQuery] = useState<string>(' ');
  const [selectedFonts, setSelectedFonts] = useState<GoogleFont[]>([]);
  const { fontList, isLoaded } = useGetFontListQuery();

  useEffect(() => {
    if (!isLoaded) return;

    const fonts = fontList.filter((font) => font.family.toLowerCase().startsWith(query.toLowerCase())).slice(0, 15);
    const fontFamilies = fonts.map((font: any) => font.family);

    if (fonts.length) {
      loadGoogleFontsDefaultVariants(fontFamilies);
      setSelectedFonts(fonts);
    }
  }, [query, isLoaded]);

  const addTextToStage = (options: Partial<StageTextData> = {}) => {
    createOne({
      ...DEFAULT_TEXT_OBJECT,
      ...options,
    });
  };

  const onSearchSubmit = (data: TFilter) => {
    setQuery(data.query);
  };

  const onSearchReset = () => {
    setQuery(' ');
  };

  return (
    <VStack spacing={3} sx={{ p: 4, position: 'relative', h: '100%', overflowY: 'auto' }}>
      <VStack bgColor="gray.300" w="100%" spacing={3} sx={{ mt: '-4', py: '4', top: '-4', position: 'sticky' }}>
        <SearchForm placeholder="Search fonts" onSubmit={onSearchSubmit} onReset={onSearchReset} />
      </VStack>

      {selectedFonts.length && query ? (
        <VStack w="100%" sx={{ mt: '4' }}>
          {selectedFonts.map((font: any) => (
            <Button
              key={font.family}
              fontFamily={font.family}
              w="100%"
              fontSize={25}
              fontWeight={400}
              onClick={() =>
                addTextToStage({
                  text: font.family,
                  fontFamily: font.family,
                  fontVariants: font.variants, // set variants that available to load from Google Fonts
                  webFont: true,
                  fontSize: 50,
                  fontStyle: 'normal',
                })
              }
            >
              {font.family}
            </Button>
          ))}
        </VStack>
      ) : (
        <VStack w="100%" spacing={3} sx={{ mt: '4' }}>
          <Button w="100%" onClick={() => addTextToStage()}>
            Add a text box
          </Button>
          {defaultTextStylesButtons.map((data, i) => (
            <Button key={i} w="100%" onClick={() => addTextToStage(data)}>
              {data.text}
            </Button>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default Texts;
