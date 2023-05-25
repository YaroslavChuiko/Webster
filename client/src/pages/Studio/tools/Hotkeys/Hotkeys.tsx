import { Divider, Kbd, Text, VStack } from '@chakra-ui/react';
import { KeysWithDescription, KeyWithDescriptionType } from '~/consts/keys';

const HotkeyItem = ({ hotkey }: { hotkey: KeyWithDescriptionType }) => {
  const keyValue = hotkey.key[0] === ' ' ? 'Space' : hotkey.key[0];
  const key = (
    <span>
      <Kbd>{keyValue}</Kbd>
      {hotkey.key[1] && (
        <span>
          + <Kbd>{hotkey.key[1]}</Kbd>
        </span>
      )}
    </span>
  );

  return (
    <VStack spacing={2}>
      {key}
      <Text>{hotkey.description}</Text>
    </VStack>
  );
};

const HotkeysList = () => {
  const keys = KeysWithDescription.map((hotkey) => ({
    ...hotkey,
    key: (hotkey.key as string).split('+'),
  }));

  return (
    <VStack spacing={4} divider={<Divider borderColor="gray.300" />}>
      {keys.map((key, i) => (
        <HotkeyItem key={i} hotkey={key} />
      ))}
    </VStack>
  );
};

export default HotkeysList;
