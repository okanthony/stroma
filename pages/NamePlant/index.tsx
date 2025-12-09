// pages/NamePlant.tsx
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text/index';
import { ThemedInput } from '@/components/themed-input';
import { Button } from '@/components/Button';
import { ThemedDropdown } from '@/components/themed-dropdown';
import { getRoomDropdownOptions } from '@/utils/getDropdownOptionsRoom';
import { spacing, colors } from '@/constants/design-tokens';
import type { PlantType } from '@/types/plant';
import React from 'react';

type NamePlantProps = {
  plantType?: PlantType;
  initialName?: string;
  initialRoom?: string;
  onSubmit: (data: { name: string; room: string }) => void;
  submitButtonLabel?: string;
  title?: string;
};

export function NamePlant({ plantType, initialName = '', initialRoom = '', onSubmit, submitButtonLabel = 'Continue', title = 'Name your plant' }: NamePlantProps) {
  const [name, setName] = React.useState(initialName);
  const [room, setRoom] = React.useState(initialRoom);

  const isSubmitDisabled = !room;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    onSubmit({ name: name.trim(), room });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant='heading' weight='bold' style={styles.title}>
          {title}
        </Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text variant='label' weight='medium' style={styles.label}>
              Name
            </Text>
            <ThemedInput variant='outlined' placeholder='Choose a name' value={name} onChangeText={setName} style={styles.input} />
          </View>

          <View style={styles.field}>
            <Text variant='label' weight='medium' style={styles.label}>
              Room
            </Text>
            <ThemedDropdown
              options={getRoomDropdownOptions()}
              value={room}
              onValueChange={setRoom}
              placeholder='Select a room'
              variant='outlined'
              accessibilityLabel='Select which room your plant is located'
            />
          </View>
        </View>

        <Button disabled={isSubmitDisabled} variant='primary' onPress={handleSubmit}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.lg
  },
  title: {
    color: colors.neutral[900],
    marginBottom: spacing.sm
  },
  plantType: {
    color: colors.neutral[600],
    marginBottom: spacing.md
  },
  form: {
    gap: spacing.lg,
    flex: 1
  },
  field: {
    gap: spacing.sm
  },
  label: {
    color: colors.neutral[700]
  },
  input: {
    width: '100%'
  }
});
