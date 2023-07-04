import { Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Konva from 'konva';
import { TOOLBAR_TABS } from '~/consts/components';
import Export from './tools/Export';
import ImageUpload from './tools/ImageUpload/ImageUpload';
import Images from './tools/Images/Images';
import Resize from './tools/Resize';
import Shapes from './tools/Shapes/Shapes';
import Texts from './tools/Text/Texts';
import HotkeysList from './tools/Hotkeys/Hotkeys';

type Props = {
  stageRef: React.RefObject<Konva.Stage>;
};

const Toolbar = ({ stageRef }: Props) => {
  return (
    <Flex h="100%" borderRight="2px" borderColor="gray.200">
      <Tabs
        isLazy
        lazyBehavior="keepMounted"
        orientation="vertical"
        variant="line"
        colorScheme="pink"
        h="100%"
        id="toolbar"
        bgColor="gray.100"
      >
        <TabList>
          {TOOLBAR_TABS.map((t, i) => (
            <Tab
              px="4"
              py="4"
              key={i}
              bgColor="gray.100"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              fontSize="12px"
              fontWeight="600"
              _selected={{ bgColor: 'white', color: 'pink.500' }}
              _hover={{ color: 'pink.500' }}
            >
              <Icon as={t.icon} boxSize={6} />
              {t.title}
            </Tab>
          ))}
        </TabList>

        <TabPanels minW="350px" maxW="350px" bgColor="white" overflowY="auto">
          <TabPanel>
            <Resize />
          </TabPanel>
          <TabPanel>
            <Export stageRef={stageRef} />
          </TabPanel>
          <TabPanel p="0" h="100%" overflow="hidden">
            <Images />
          </TabPanel>
          <TabPanel>
            <ImageUpload />
          </TabPanel>
          <TabPanel p="0" h="100%" overflow="hidden">
            <Texts />
          </TabPanel>
          <TabPanel>
            <Shapes />
          </TabPanel>
          <TabPanel>
            <HotkeysList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Toolbar;
