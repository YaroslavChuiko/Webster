import { Link, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import NothingFound from '~/components/NothingFound/NothingFound';
import { unsplash } from '~/utils/unsplash-api';
import SearchForm from './SearchForm';
import { DEFAULT_IMG_QUERY, UNSPLASH_URL } from '~/consts/images';
import InfiniteWrapper from './InfiniteWrapper';
import ImagesGrid from './ImagesGrid';

export type Photo = {
  id: string;
  urls: { regular: string };
};

const Images = () => {
  const [images, setImages] = useState<Photo[]>([]);
  const [currQuery, setCurrQuery] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [queryReset, setQueryReset] = useState<boolean>(false);

  const fetchImages = async () => {
    try {
      setPage((prev) => prev + 1);

      const photos = await unsplash.search.getPhotos({ query: currQuery || DEFAULT_IMG_QUERY, page });
      const result = photos.response?.results as Photo[] | [];
      setImages((currQuery && currQuery === query) || queryReset ? result : [...images, ...result]);

      query && setQuery('');
      queryReset && setQueryReset(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (query && query !== currQuery) {
      setPage(1);
      setCurrQuery(query);
    }
    if (!query && !currQuery) {
      fetchImages();
    }
  }, [query]);

  useEffect(() => {
    if (currQuery === query) {
      document.getElementById('imageGrid')?.scrollTo(0, 0);
      fetchImages();
    }
  }, [currQuery]);

  useEffect(() => {
    if (queryReset) {
      setCurrQuery('');
      setPage(1);
    }
  }, [queryReset]);

  return (
    <>
      <VStack bgColor="white" w="100%" spacing={3} p="4">
        <SearchForm setSearch={setQuery} setQueryReset={setQueryReset} />
        <Text>
          View more on{' '}
          <Link isExternal color="pink.500" as={RouterLink} to={UNSPLASH_URL}>
            Unsplash
          </Link>
        </Text>
      </VStack>
      <VStack id="imageGrid" spacing={3} sx={{ p: 4, position: 'relative', h: '100%', overflowY: 'auto' }}>
        {!images?.length ? (
          <NothingFound message="No images were found." />
        ) : (
          <>
            <InfiniteWrapper fetchItems={fetchImages} count={images?.length || 10}>
              <ImagesGrid images={images} />
            </InfiniteWrapper>
          </>
        )}
      </VStack>
    </>
  );
};

export default Images;
