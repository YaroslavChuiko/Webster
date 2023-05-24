import { SyntheticEvent, useRef, useState } from 'react';
import { InputGroup, Button, VStack } from '@chakra-ui/react';
import { Photo } from '../Images/Images';
import { nanoid } from '@reduxjs/toolkit';
import ImagesGrid from '../Images/ImagesGrid';

const ImageUpload = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<Photo[]>([]);

  const setFile: React.ChangeEventHandler<HTMLInputElement> = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files;
    const file = (files as FileList)[0];
    const url = URL.createObjectURL(file);
    const photo: Photo = { id: nanoid(), urls: { regular: url } };
    setImages([...images, photo]);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <VStack spacing={8}>
      <InputGroup onClick={handleClick}>
        <input type={'file'} hidden accept="image/*" onChange={setFile} ref={inputRef} />
        <VStack overflow="hidden" align="center" w="100%">
          <Button w="100%">Upload</Button>
        </VStack>
      </InputGroup>
      {images.length && <ImagesGrid images={images} />}
    </VStack>
  );
};

export default ImageUpload;
