// Components
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/components/Text/index';
import Toast from 'react-native-toast-message';
import { Image } from 'expo-image';
import { Icon } from '@/components/Icon';
import { Card } from '@/components/Card/index';
import { Row } from '@/components/Row/index';
import { ScreenContainer } from '@/components/ScreenContainer';

// Internal
import { usePlantStore } from '@/stores';
import { calculateNextWatering } from '@/utils/watering';
import { spacing, colors, typography, shadows, borderRadius } from '@/constants/design-tokens';
import { formatTitleCase } from '@/utils/formatTitleCase';
import { getImageByPlantType } from '@/utils/getImageByPlantType';
import { PlantWithWateringInfo } from '@/types/plant';
import { getPlantsByCategoryData } from '@/utils/getPlantsByCategoryData';
import { getPlantWateringStatus } from '@/utils/getPlantWateringStatus';
import { getPlantCategorySubheading } from '@/utils/getPlantCategorySubheading';

// External
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

// Constants
const OVERDUE_TEXT_COLOR = '#c00';

// Component
export default function Plants() {
  // Hooks
  const { showWelcomeToast } = useLocalSearchParams();

  // Hooks - stores
  const plantsObj = usePlantStore((state) => state.plants);

  // Hooks - effects
  React.useEffect(() => {
    if (showWelcomeToast === 'true') {
      Toast.show({
        type: 'success',
        text1: 'Your plant was added!',
        position: 'bottom',
        visibilityTime: 3000
      });
    }
  }, [showWelcomeToast]);

  // Vars
  const plants = React.useMemo(() => Object.values(plantsObj), [plantsObj]);
  // Group plants only when array changes
  const plantsByCategory = React.useMemo(() => getPlantsByCategoryData(plants), [plants]);

  // Utils
  const renderSubheading = () => {
    const subheading = getPlantCategorySubheading(plantsByCategory);

    if (subheading) {
      return (
        <Text variant='body' style={styles.pageSubheading}>
          {subheading}
        </Text>
      );
    }

    return null;
  };

  const renderPlantRow = ({ item }: { item: PlantWithWateringInfo }) => {
    // Vars
    const nextWatering = calculateNextWatering({
      lastWatered: item.lastWatered,
      type: item.type
    });
    const wateringStatus = getPlantWateringStatus(nextWatering.min, nextWatering.max);
    const iconNotifications = item.areNotificationsEnabled ? 'bell.fill' : 'bell.slash';
    const stylesWateringPill = [styles.wateringPill, wateringStatus.isOverdue && styles.wateringPillOverdue];
    const stylesWateringStatus = [styles.wateringText, wateringStatus.isOverdue && styles.wateringTextOverdue];
    const pillIconColor = wateringStatus.isOverdue ? OVERDUE_TEXT_COLOR : colors.neutral[900];

    // Render
    return (
      <Pressable onPress={() => router.push(`/plant/${item.id}`)}>
        <View style={styles.plantRow}>
          {/* Left side - Plant image */}
          <Image source={getImageByPlantType(item.type)} style={styles.plantImage} contentFit='cover' />

          {/* Right side - Plant details (three rows) */}
          <View style={styles.plantDetails}>
            {/* Top row: Name (left) */}
            <Row align='center' justify='space-between'>
              <Text variant='body' weight='semibold' style={styles.plantName}>
                {item.name}
              </Text>
            </Row>

            {/* Middle row: Room (left) */}
            <Row>
              <Text variant='caption' style={styles.plantRoom}>
                {formatTitleCase(item.room) || 'No room'}
              </Text>
            </Row>

            {/* Bottom row: Pill (left) + notification icon (right) */}
            <Row align='center' justify='space-between'>
              <View style={stylesWateringPill}>
                <Row align='center' gap='xs'>
                  <Icon name='drop.fill' size={14} color={pillIconColor} />
                  <Text variant='label' style={stylesWateringStatus}>
                    {wateringStatus.text}
                  </Text>
                </Row>
              </View>

              <Icon name={iconNotifications} size={20} color={colors.neutral[600]} />
            </Row>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderSection = (title: string, data: PlantWithWateringInfo[]) => {
    if (data.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <Text variant='subheading' weight='bold' style={styles.sectionTitle}>
          {title}
        </Text>
        <Card style={styles.sectionCard}>
          {data.map((plant, index) => (
            <View key={plant.id}>
              {renderPlantRow({ item: plant })}
              {/* Add divider between plants, but not after last one */}
              {index < data.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </Card>
      </View>
    );
  };

  // Render
  return (
    <ScreenContainer padding={false}>
      <FlatList
        data={[1]}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <>
            <Text variant='heading' weight='bold' style={styles.pageTitle}>
              My Plants
            </Text>

            {renderSubheading()}
          </>
        )}
        renderItem={() => (
          <>
            {renderSection('Today', plantsByCategory.today)}
            {renderSection('This Week', plantsByCategory.thisWeek)}
            {renderSection('Next Week', plantsByCategory.nextWeek)}
            {renderSection('This Month', plantsByCategory.thisMonth)}

            {plants.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No plants yet. Add your first plant!</Text>
              </View>
            )}
          </>
        )}
        keyExtractor={() => 'sections'}
      />

      {/* Floating Add Button */}
      <Pressable style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]} onPress={() => router.push('/plant/add')} accessibilityLabel='Add new plant' accessibilityRole='button'>
        <Icon name='plus' size={28} color={colors.primary[500]} />
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  // Start styles - bell icon/living room right aligned, two rows
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl + 60
  },
  pageTitle: {
    color: colors.neutral[900],
    marginBottom: spacing.sm
  },
  pageSubheading: {
    color: colors.neutral[600],
    marginBottom: spacing.lg
  },
  section: {
    marginBottom: spacing.xl
  },
  plantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: spacing.md
  },
  plantImage: {
    width: 70,
    height: 70,
    borderRadius: 340
  },
  plantDetails: {
    flex: 1,
    gap: spacing.xs // Space between the two rows
  },
  plantName: {
    color: colors.neutral[900],
    flex: 1, // Allows text to wrap if needed
    marginRight: spacing.sm // Small gap before icon
  },
  plantRoom: {
    color: colors.neutral[600]
  },
  wateringPill: {
    backgroundColor: colors.neutral[0],
    borderWidth: 1,
    borderColor: colors.neutral[900],
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  wateringPillOverdue: {
    backgroundColor: '#fee',
    borderWidth: 0
  },
  wateringText: {
    color: colors.neutral[900]
  },
  wateringTextOverdue: {
    color: OVERDUE_TEXT_COLOR
  },
  plantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl
  },
  emptyText: {
    fontSize: typography.sizes.base,
    color: colors.neutral[600]
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl + 20, // Above tab bar (adjust if needed)
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28, // Half of width/height for circle
    backgroundColor: '#FFFAE9',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg // Shadow from design tokens
  },
  fabPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }]
  },

  sectionContainer: {
    marginBottom: spacing.lg
  },
  sectionTitle: {
    marginBottom: spacing.sm
  },
  sectionCard: {
    marginLeft: 0,
    marginRight: 0,
    marginHorizontal: spacing.md,
    padding: 0, // Override Card's default padding
    backgroundColor: colors.neutral[50]
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginHorizontal: spacing.lg
  }
});
