import { View } from 'react-native';
import { spacing } from '@/constants/design-tokens';

type SpacerProps = {
  size?: keyof typeof spacing;
  flex?: boolean;
};

/**
 * Add space between elements
 */
export function Spacer({ size = 'md', flex = false }: SpacerProps) {
  if (flex) {
    return <View style={{ flex: 1 }} />;
  }

  return <View style={{ height: spacing[size], width: spacing[size] }} />;
}
