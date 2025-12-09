// Components
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Field } from '@/components/Field';
import { FieldLabel } from '@/components/FieldLabel';
import { FieldDescription } from '@/components/FieldDescription';
import { FieldError } from '@/components/FieldError';
import { Button } from '@/components/Button';

// Internal
import { getRoomDropdownOptions } from '@/utils/getRoomDropdownOptions';
import { spacing } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';

// External
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Types
type NamePlantFormData = {
  name: string;
  room: string;
};
type NamePlantProps = {
  initialName?: string;
  initialRoom?: string;
  onSubmit: (data: { name: string; room: string }) => void;
  submitButtonLabel?: string;
  title?: string;
  isLoading?: boolean;
};

// Component
export function NamePlant({ initialName = '', initialRoom = '', onSubmit, submitButtonLabel = 'Continue', title = 'Name your plant', isLoading = false }: NamePlantProps) {
  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<NamePlantFormData>({
    defaultValues: {
      name: initialName,
      room: initialRoom
    },
    mode: 'onSubmit' // Only validate on submit
  });

  // Hooks - custom
  const backgroundColor = useThemeColor({}, 'background');

  // Handlers
  const handleFormSubmit = (data: NamePlantFormData) => {
    onSubmit({
      name: data.name.trim(),
      room: data.room
    });
  };

  // Render
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text variant='heading' weight='bold' style={styles.title}>
          {title}
        </Text>

        <View style={styles.form}>
          {/* Name Field - Optional */}
          <Controller
            control={control}
            name='name'
            rules={{
              maxLength: {
                value: 50,
                message: 'Name must be 50 characters or less'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Field error={Boolean(errors.name)}>
                <FieldLabel>Name (optional)</FieldLabel>
                <FieldDescription>Give your plant a unique name</FieldDescription>
                <Input
                  placeholder='Ex: Snake Gyllenhaal'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  maxLength={50}
                  error={Boolean(errors.name)}
                  autoCapitalize='words'
                  returnKeyType='next'
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
            )}
          />

          {/* Room Field - Required */}
          <Controller
            control={control}
            name='room'
            rules={{
              required: 'Please select a room'
            }}
            render={({ field: { onChange, value } }) => (
              <Field error={Boolean(errors.room)}>
                <FieldLabel>Room</FieldLabel>
                <FieldDescription>Where is your plant located?</FieldDescription>
                <Select value={value} onValueChange={onChange} options={getRoomDropdownOptions()} placeholder='Select a room' error={Boolean(errors.room)} />
                {errors.room && <FieldError>{errors.room.message}</FieldError>}
              </Field>
            )}
          />
        </View>

        <Button variant='primary' onPress={handleSubmit(handleFormSubmit)} loading={isLoading} disabled={isLoading}>
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
    gap: spacing.xl
  },
  title: {
    marginBottom: spacing.sm
  },
  form: {
    gap: spacing.lg,
    flex: 1
  }
});
