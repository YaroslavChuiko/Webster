import useStageObject from '~/hooks/use-stage-object';
import CustomNumberInput from './CustomNumberInput';

type Props = {
  id: string;
  letterSpacing: number;
};

const LetterSpacingSettings = ({ id, letterSpacing }: Props) => {
  const { updateOne } = useStageObject();

  const handleChange = (value: number) => {
    updateOne({ id, data: { letterSpacing: value } });
  };

  return (
    <CustomNumberInput
      min={-15}
      max={250}
      step={1}
      label="Letter spacing"
      mark={0}
      value={letterSpacing}
      pattern={/^-?\d{1,3}$/}
      onChange={handleChange}
    />
  );
};

export default LetterSpacingSettings;
