import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useStageObject from '~/hooks/use-stage-object';
import { StageImageFilterValues } from '~/types/stage-object';
import { FilterName, FilterValue, RGB_FILTERS, StageImageData } from '~/types/stage-object';

type Props = {
  imageId: string;
  data: StageImageData;
};

const ALTERABLE_FILTERS: FilterValue[] = [
  { name: FilterName.brighten, min: -1, max: 1, step: 0.05 },
  { name: FilterName.contrast },
];

const BOOLEAN_FILTERS: FilterValue[] = [
  { name: FilterName.invert },
  { name: FilterName.grayscale },
  { name: FilterName.rgb, min: 0, max: 256, step: 1 },
];

const ImageFilters = ({ imageId, data }: Props) => {
  const { filterValues, filterNames } = data;
  const { updateOne } = useStageObject();
  const [filters, setFilters] = useState<FilterName[]>(filterNames);
  const [filterMap, setFilterMap] = useState<StageImageFilterValues>(filterValues);

  const getFilterByName = (name: FilterName | string) => {
    return filters.includes(name as FilterName);
  };

  const handleSliderChange = (value: number, name: FilterName | string) => {
    if (!RGB_FILTERS.includes(name) && !getFilterByName(name)) {
      setFilters((curr) => [...curr, name as FilterName]);
    }

    setFilterMap((map) => ({ ...map, [name.toLowerCase()]: value }));
  };

  const handleSwitchChange = (filter: FilterName) => {
    if (getFilterByName(filter)) {
      const names = filter === FilterName.rgb ? [filter, ...RGB_FILTERS] : [filter];
      const newFilters = filters.filter((f) => !names.includes(f));
      setFilters(newFilters);
      return;
    }
    setFilters((curr) => [...curr, filter]);
  };

  useEffect(() => {
    updateOne({
      id: imageId,
      data: {
        filterNames: filters,
        filterValues: filterMap,
      },
    });
  }, [filters, filterMap]);

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Filters
        </MenuButton>
        <MenuList sx={{ p: 6 }}>
          {ALTERABLE_FILTERS.map((f, i) => (
            <HStack spacing={4} key={i} mb="4">
              <Text>{f.name}</Text>
              <Slider
                id={f.name}
                aria-label="slider-ex-1"
                min={f.min || -100}
                max={f.max || 100}
                step={f.step || 1}
                value={filterMap[f.name.toLowerCase() as keyof typeof filterMap]}
                onChange={(value) => handleSliderChange(value, f.name)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </HStack>
          ))}
          {BOOLEAN_FILTERS.map((f, i) => (
            <VStack key={i} spacing={4} align="flex-start" mb={i === BOOLEAN_FILTERS.length - 1 ? 0 : 4}>
              <HStack spacing={4}>
                <Text>{f.name}</Text>
                <Switch isChecked={getFilterByName(f.name)} onChange={() => handleSwitchChange(f.name)} />
              </HStack>
              {f.name === FilterName.rgb && getFilterByName(f.name) && (
                <>
                  {RGB_FILTERS.map((rgbName) => (
                    <React.Fragment key={rgbName}>
                      <Text>{rgbName}</Text>
                      <Slider
                        id={rgbName}
                        aria-label="slider-ex-1"
                        min={f.min || -100}
                        max={f.max || 100}
                        step={f.step || 1}
                        value={filterMap[rgbName.toLowerCase() as keyof typeof filterMap]}
                        onChange={(value) => handleSliderChange(value, rgbName)}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </React.Fragment>
                  ))}
                </>
              )}
            </VStack>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ImageFilters;
