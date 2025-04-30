import { Box, Button } from 'grommet';
import { FormPrevious, FormNext } from 'grommet-icons';

interface ArrowNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
}

export const ArrowNavigation = ({ onPrevious, onNext }: ArrowNavigationProps) => (
  <Box align="center" margin={{ top: 'small', bottom: 'medium' }} direction="row" gap="small">
    <Button icon={<FormPrevious color="white" />} onClick={onPrevious} plain />
    <Button icon={<FormNext color="white" />} onClick={onNext} plain />
  </Box>
);
