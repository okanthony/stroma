// Components
import { View, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Column } from '@/components/Column/index';
import { Icon } from '@/components/Icon';
import { Field } from '@/components/Field';
import { FieldLabel } from '@/components/FieldLabel';
import { FieldError } from '@/components/FieldError';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import Toast from 'react-native-toast-message';

// Internal
import { colors, shadows, spacing } from '@/constants/design-tokens';
import { usePlantStore } from '@/stores';
import { getRoomDropdownOptions } from '@/utils/getRoomDropdownOptions';

// External
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Types
type PlantLocationFormData = z.infer<typeof plantLocationSchema>;

// Schemas
const plantLocationSchema = z.object({
  room: z.string().min(1, 'Please select a room')
});

// Component
export default function EditPlantLocation() {
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
  } = useForm<PlantLocationFormData>({
    resolver: zodResolver(plantLocationSchema),
    defaultValues: {
      room: plant?.room || ''
    },
    mode: 'onSubmit'
  });

  // Handlers
  const onSubmit = (data: PlantLocationFormData) => {
    // Update plant
    updatePlant(id, {
      room: data.room
    });

    // Navigate to plant details page
    router.back();

    // Display success message
    Toast.show({
      type: 'success',
      text1: 'Plant room updated',
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ScreenContainer>
          {/* Back button */}
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Icon name='chevron.left' size={24} color={colors.neutral[900]} />
          </Pressable>

          {/* Header */}
          <Text variant='heading' style={styles.title}>
            Edit room
          </Text>

          {/* Content */}
          <View style={styles.content}>
            <Column gap='lg'>
              {/* Room Field */}
              <Controller
                control={control}
                name='room'
                render={({ field: { onChange, value } }) => (
                  <Field error={Boolean(errors.room)}>
                    <FieldLabel>Room</FieldLabel>
                    <Select value={value} onValueChange={onChange} options={getRoomDropdownOptions()} placeholder='Select a room' error={Boolean(errors.room)} />
                    <FieldError>{errors.room?.message}</FieldError>
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
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  title: {
    color: colors.neutral[900],
    marginBottom: spacing.xl,
    marginTop: spacing.xl
  },
  content: {
    flex: 1
  },
  buttonContainer: {
    paddingBottom: spacing.sm
  }
});
