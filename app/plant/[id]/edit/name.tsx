import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Card } from '@/components/Card/index';
import { Column } from '@/components/Column/index';
import { Row } from '@/components/Row/index';
import { Icon } from '@/components/Icon';
import { colors, typography, spacing } from '@/constants/design-tokens';
import { usePlantStore } from '@/stores';
import { ThemedInput } from '@/components/themed-input';
import Toast from 'react-native-toast-message';
import { Button } from '@/components/Button';

export default function EditPlantName() {
  // Hooks
  const { id } = useLocalSearchParams<{ id: string }>();

  // Stores
  const { getPlantById, updatePlant } = usePlantStore();

  // Vars
  const plant = getPlantById(id);
  const [name, setName] = useState(plant?.name || '');
  const isButtonSubmitDisabled = name === plant.name;

  // Handlers
  const onButtonSubmitClick = () => {
    // Update plant
    updatePlant(id, {
      name
    });

    // Navigate to plant details page
    router.push(`/plant/${id}`);

    // Display success message
    Toast.show({
      type: 'success',
      text1: 'Plant name updated',
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

      <Text style={styles.title}>Edit name</Text>

      <Column gap='md' style={styles.content}>
        {/* Name Input Card */}
        <Card style={styles.card}>
          <Column gap='sm'>
            <Row align='center' justify='space-between'>
              <Text style={styles.cardLabel}>Name</Text>
              <Text style={styles.characterCount}>{name.length}/50</Text>
            </Row>
            <ThemedInput style={styles.input} value={name} onChangeText={setName} placeholder='Type name here...' placeholderTextColor={colors.neutral[400]} maxLength={50} />
          </Column>
        </Card>
      </Column>

      {/* CTA */}
      <View style={styles.buttonContainer}>
        <Button variant='primary' disabled={isButtonSubmitDisabled} onPress={onButtonSubmitClick}>
          Delete plant
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
  characterCount: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[400]
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
