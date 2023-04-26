import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';

const Studio = () => {
  return (
    <Box h="100vh" w="100%">
      <Tabs orientation="vertical" variant="solid-rounded" colorScheme="gray" h="100%">
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>

        <TabPanels maxW="350px" bgColor="gray">
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Studio;
