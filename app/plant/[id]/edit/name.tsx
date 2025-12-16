// Components
import { View, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Column } from '@/components/Column/index';
import { Icon } from '@/components/Icon';
import { Field } from '@/components/Field';
import { FieldLabel } from '@/components/FieldLabel';
import { FieldError } from '@/components/FieldError';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import Toast from 'react-native-toast-message';

// Internal
import { colors, shadows, spacing } from '@/constants/design-tokens';
import { usePlantStore } from '@/stores';

// External
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { z } from 'zod';

// Types
type PlantNameFormData = z.infer<typeof plantNameSchema>;

// Schemas
const plantNameSchema = z.object({
  name: z.string().min(1, 'Plant name is required').max(50, 'Plant name must be 50 characters or less')
});

// Component
export default function EditPlantName() {
  // Hooks
  const { id } = useLocalSearchParams<{ id: string }>();

  // Hooks - stores
  const { getPlantById, updatePlant } = usePlantStore();

  // Vars
  const plant = getPlantById(id);

  // Hooks - form
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<PlantNameFormData>({
    resolver: zodResolver(plantNameSchema),
    mode: 'onSubmit', // Only run first client side validation on submit
    defaultValues: {
      name: plant?.name || ''
    }
  });

  // Handlers
  const onSubmit = (data: PlantNameFormData) => {
    // Update plant
    updatePlant(id, {
      name: data.name
    });

    // Navigate to plant details page
    router.back();

    // Display success message
    Toast.show({
      type: 'success',
      text1: 'Plant name updated',
      position: 'bottom',
      visibilityTime: 3500
    });
  };

  // Render - Plant not found
  if (!plant) {
    return (
      <ScreenContainer style={styles.container}>
        <Text variant='body'>Plant not found</Text>
      </ScreenContainer>
    );
  }

  // Render
  return (
    <ScreenContainer>
      {/* Back button */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Icon name='chevron.left' size={24} color={colors.neutral[900]} />
      </Pressable>

      {/* Header */}
      <Text variant='heading' style={styles.title}>
        Edit name
      </Text>

      {/* Content */}
      <View style={styles.content}>
        <Column gap='lg'>
          {/* Name Field */}
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, onBlur, value } }) => (
              <Field error={Boolean(errors.name)}>
                <FieldLabel>Name</FieldLabel>
                <Input value={value} onChangeText={onChange} onBlur={onBlur} placeholder='Ex: Keanu Leaves' maxLength={50} error={Boolean(errors.name)} autoCapitalize='words' autoCorrect={false} />
                <FieldError>{errors.name?.message}</FieldError>
              </Field>
            )}
          />
        </Column>
      </View>

      {/* CTA */}
      <View style={styles.buttonContainer}>
        <Button variant='primary' disabled={!isDirty} onPress={handleSubmit(onSubmit)}>
          Save
        </Button>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    paddingBottom: spacing.sm
  },
  title: {
    color: colors.neutral[900],
    marginBottom: spacing.xl,
    marginTop: spacing.xl
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    marginBottom: spacing.lg
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[0],
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md
  },

  content: {
    flex: 1
  }
});
