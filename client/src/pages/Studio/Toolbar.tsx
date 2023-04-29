import { Flex, SystemStyleObject, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Resize from './tools/Resize';
import Export from './tools/Export';
import Images from './tools/Images/Images';
import Konva from 'konva';
import { NAVBAR_HEIGHT, TABS } from '~/consts/components';
import Texts from './tools/Text/Texts';

type Props = {
  stageRef: React.RefObject<Konva.Stage>;
};

const styles: SystemStyleObject = {
  position: 'fixed',
  left: 0,
  top: `${NAVBAR_HEIGHT}px`,
  h: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
  bottom: 0,
  flexShrink: 0,
};

const Toolbar = ({ stageRef }: Props) => {
  return (
    <Flex sx={styles}>
      <Tabs orientation="vertical" variant="line" colorScheme="blue" h="100%" id="toolbar">
        <TabList>
          {TABS.map((t, i) => (
            <Tab px="6" py="4" key={i}>
              {/* <Icon as={t.icon} mr="2" /> */}
              {t.title}
            </Tab>
          ))}
        </TabList>

        <TabPanels minW="350px" maxW="350px" bgColor="gray.300" overflowY="auto">
          <TabPanel>
            <Resize />
          </TabPanel>
          <TabPanel>
            <Export stageRef={stageRef} />
          </TabPanel>
          <TabPanel p="0" h="100%">
            <Images />
          </TabPanel>
          <TabPanel p="0" h="100%">
            <Texts />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Toolbar;
