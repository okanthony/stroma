// Components
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Card } from '@/components/Card/index';
import { Column } from '@/components/Column/index';
import { Row } from '@/components/Row/index';
import { Icon } from '@/components/Icon';
import Toast from 'react-native-toast-message';
import { ThemedDropdown } from '@/components/themed-dropdown';
import { Button } from '@/components/Button';

// Internal
import { colors, typography, spacing } from '@/constants/design-tokens';
import { usePlantStore } from '@/stores';
import { getRoomDropdownOptions } from '@/utils/getRoomDropdownOptions';

// External
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

// Component
export default function EditPlantLocation() {
  // Hooks
  const { id } = useLocalSearchParams<{ id: string }>();

  // Stores
  const { getPlantById, updatePlant } = usePlantStore();

  // Vars
  const plant = getPlantById(id);
  const [room, setRoom] = React.useState(plant.room || '');
  const isButtonSubmitDisabled = room === plant.room;

  // Handlers
  const onButtonSubmitClick = () => {
    // Update plant
    updatePlant(id, {
      room
    });

    // Navigate to plant details page
    router.push(`/plant/${id}`);

    // Display success message
    Toast.show({
      type: 'success',
      text1: 'Plant room updated',
      position: 'bottom',
      visibilityTime: 3500
    });
  };

  // Render
  if (!plant) {
    return (
      <ScreenContainer style={styles.container}>
        <Text>Plant not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={styles.container}>
      {/* Header */}
      <Row align='center' justify='space-between' style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Icon name='chevron.left' size={24} color={colors.neutral[900]} />
        </Pressable>
      </Row>

      <Text style={styles.title}>Edit room</Text>

      <Column gap='md' style={styles.content}>
        <Card style={styles.card}>
          <Column gap='sm'>
            <Row align='center' justify='space-between'>
              <Text style={styles.cardLabel}>Room</Text>
            </Row>

            <ThemedDropdown
              options={getRoomDropdownOptions()}
              value={room}
              onValueChange={setRoom}
              placeholder='Select a room'
              variant='outlined'
              accessibilityLabel='Select which room your plant is located'
            />
          </Column>
        </Card>
      </Column>

      {/* CTA */}
      <View style={styles.buttonContainer}>
        <Button variant='primary' disabled={isButtonSubmitDisabled} onPress={onButtonSubmitClick}>
          Save
        </Button>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFAE9'
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    marginBottom: spacing.lg
  },
  backButton: {
    padding: spacing.sm
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg
  },
  content: {
    paddingHorizontal: spacing.md,
    flex: 1
  },
  card: {
    padding: spacing.md
  },
  cardLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[700]
  },
  input: {
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    padding: spacing.md,
    fontSize: typography.sizes.base,
    color: colors.neutral[900],
    minHeight: 50
  },
  buttonContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl
  }
});
