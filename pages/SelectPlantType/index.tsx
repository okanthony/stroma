import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/Text/index';
import { getImageByPlantType } from '@/utils/getImageByPlantType';
import { Image } from 'expo-image';
import { spacing, colors } from '@/constants/design-tokens';
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Icon } from '@/components/Icon';
import { PLANT_LIST_DATA, SelectPlantTypeProps } from './data';

export function SelectPlantType({ onSelectPlant, title = 'Choose plant type', subtitle = 'Select from common houseplants', hideBackButton = false }: SelectPlantTypeProps) {
  const renderPlantRow = ({ item }) => (
    <Pressable style={({ pressed }) => [styles.plantRow, pressed && styles.plantRowPressed]} onPress={() => onSelectPlant(item.value)}>
      <Image source={getImageByPlantType(item.value)} style={styles.plantImage} contentFit='cover' />
      <View style={styles.plantInfo}>
        <Text variant='body' weight='medium'>
          {item.label}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Back button */}
      {!hideBackButton && (
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Icon name='chevron.left' size={24} color={colors.neutral[900]} />
        </Pressable>
      )}

      {/* Header */}
      <View style={[styles.header, hideBackButton && styles.headerNoBackButton]}>
        <Text variant='heading' weight='bold' style={styles.title}>
          {title}
        </Text>
        {subtitle && (
          <Text variant='body' style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      <FlatList data={PLANT_LIST_DATA} renderItem={renderPlantRow} keyExtractor={(item) => item.value} contentContainerStyle={styles.listContent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg
  },
  headerNoBackButton: {
    paddingTop: spacing.lg
  },
  title: {
    color: colors.neutral[900],
    marginBottom: spacing.sm
  },
  subtitle: {
    color: colors.neutral[600]
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl
  },
  plantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200]
  },
  plantRowPressed: {
    backgroundColor: colors.neutral[100]
  },
  plantImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.neutral[300],
    marginRight: spacing.md
  },
  plantInfo: {
    flex: 1
  },
  backButton: {
    backgroundColor: colors.neutral[100],
    width: 44,
    height: 44,
    borderRadius: 22, // Circular button
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm, // Changed from md - reduces gap to title
    marginLeft: spacing.lg, // Changed from lg - standard edge padding
    marginTop: spacing.md // Changed from xl - more compact
  }
});
