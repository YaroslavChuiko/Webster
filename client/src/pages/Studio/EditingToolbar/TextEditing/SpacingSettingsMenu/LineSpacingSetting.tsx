import useStageObject from '~/hooks/use-stage-object';
import CustomNumberInput from './CustomNumberInput';

type Props = {
  id: string;
  lineHeight: number;
};

const LineSpacingSettings = ({ id, lineHeight }: Props) => {
  const { updateOne } = useStageObject();

  const handleChange = (value: number) => {
    updateOne({ id, data: { lineHeight: value } });
  };

  return (
    <CustomNumberInput
      min={0.5}
      max={2.5}
      step={0.01}
      label="Line spacing"
      mark={1.2}
      value={lineHeight}
      pattern={/^\d\.?\d{1,2}$/}
      onChange={handleChange}
    />
  );
};

export default LineSpacingSettings;
