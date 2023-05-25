import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import SolidColor from './SolidColor';
import LinearColor from './LinearColor';
import RadialColor from './RadialColor';
import useStageObject from '~/hooks/use-stage-object';
import { StageObjectData } from '~/types/stage-object';
import { ShapeType } from '~/types/shape-type';

type IProps = {
  shapeId: string;
  selectedObject: StageObjectData;
};

const Color = ({ shapeId, selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const getTabIndex = () => {
    switch (selectedObject.fillPriority) {
      case 'color':
        return 0;
      case 'linear-gradient':
        return 1;
      case 'radial-gradient':
        return 2;
    }
    return 0;
  };

  const [tabIndex, setTabIndex] = useState(getTabIndex());

  useEffect(() => {
    setTabIndex(getTabIndex());
  }, [shapeId]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);

    let fillPriority;
    switch (index) {
      case 0:
        fillPriority = 'color';
        break;
      case 1:
        fillPriority = 'linear-gradient';
        break;
      case 2:
        fillPriority = 'radial-gradient';
        break;
    }

    updateOne({
      id: shapeId,
      data: { fillPriority },
    });
  };

  return (
    <Box>
      <Menu>
        <MenuButton as={Button}>Color</MenuButton>
        <MenuList padding="0">
          <Tabs index={tabIndex} colorScheme="pink" onChange={handleTabChange}>
            <TabList>
              <Tab>Solid</Tab>
              {selectedObject.shapeType !== ShapeType.ARROW && (
                <>
                  <Tab>Linear</Tab>
                  <Tab>Radial</Tab>
                </>
              )}
            </TabList>
            <TabPanels>
              <TabPanel>
                <SolidColor shapeId={shapeId} selectedObject={selectedObject} />
              </TabPanel>
              {selectedObject.shapeType !== ShapeType.ARROW && (
                <TabPanel>
                  <LinearColor shapeId={shapeId} selectedObject={selectedObject} />
                </TabPanel>
              )}
              {selectedObject.shapeType !== ShapeType.ARROW && (
                <TabPanel>
                  <RadialColor shapeId={shapeId} selectedObject={selectedObject} />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Color;
