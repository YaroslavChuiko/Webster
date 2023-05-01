import React from 'react';
import Konva from 'konva';
import { Button } from '@chakra-ui/react';

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

const Export = ({ stageRef }: IProps) => {
  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    link.click();
  };

  const handleExport = () => {
    if (stageRef?.current) {
      const dataURL = stageRef.current.toDataURL({
        pixelRatio: 1 / stageRef.current.attrs.scaleX,
      });
      downloadURI(dataURL, 'webster');
    }
  };

  return <Button onClick={handleExport}>Export</Button>;
};

export default Export;
