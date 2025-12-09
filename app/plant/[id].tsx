// Components
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/components/Button';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Text } from '@/components/Text';
import { Column } from '@/components/Column';
import { Icon } from '@/components/Icon';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

// Internal
import { useNotificationsStore, usePlantStore } from '@/stores';
import { PLANT_CARE_DATA } from '@/constants/plant-data';
import { calculateNextWatering, isInSeason } from '@/utils/watering';
import { spacing, colors, typography, shadows } from '@/constants/design-tokens';
import { getImageByPlantType } from '@/utils/getImageByPlantType';
import { formatTitleCase } from '@/utils/formatTitleCase';

// External
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { format } from 'date-fns';
import { Modal } from '@/components/Modal';
import Toast from 'react-native-toast-message';

// Component
export default function PlantDetails() {
  // Hooks - router
  const { id } = useLocalSearchParams<{ id: string }>();

  // Hooks - stores
  const { getPlantById, updatePlant } = usePlantStore();
  const { cancelAllNotificationsForPlant, scheduleNotificationsForPlant } = useNotificationsStore();

  // Hooks - state
  const [showWateredModal, setShowWateredModal] = React.useState(false);
  const [isMarkAsWateredPending, setIsMarkAsWateredPending] = React.useState(false);
  const [modalSelectedDate, setModalSelectedDate] = React.useState(new Date());

  // Vars
  const plantData = getPlantById(id);

  // Missing or invalid plant data
  if (!plantData.id) {
    // TODO: error screen? This is fine for now to fix deletion bug but should have error screen for other possible scenarios
    return null;
  }

  // Vars cont...
  const plantCareData = PLANT_CARE_DATA[plantData.type];
  // TODO: fix type or handle this better since last watered can be undefined - maybe undetermined sets a date?
  const lastWatered = plantData.lastWatered ?? 'January 1, 1970 08:00:00';
  // TODO: update this util, or new util for getting "next watering date" which is either min if today before min or today if betyweenmin/max or after max
  const nextWatering = calculateNextWatering({
    lastWatered,
    type: plantData.type
  });
  const seasonCopy = isInSeason() ? 'Growing' : 'Dormant';

  // Handlers
  const handleModalCancelCtaOnClick = () => {
    setShowWateredModal(false);
    setModalSelectedDate(new Date()); // Reset to today
  };

  const handleModalConfirmCtaOnClick = async () => {
    await markPlantAsWatered();
    setShowWateredModal(false);
  };

  const handleModalDatePickerOnChange = (event: any, date?: Date) => {
    if (date) {
      setModalSelectedDate(date);
    }
  };

  // Utils
  const markPlantAsWatered = async () => {
    if (!plantData.id) return;

    // Set global pending
    setIsMarkAsWateredPending(true);

    try {
      // Update plant's last watered date to selected date (UTC)
      const wateredDateIso = modalSelectedDate.toISOString();
      updatePlant(id, {
        lastWatered: wateredDateIso
      });

      // Only reschedule if notifications are enabled
      if (plantData.areNotificationsEnabled) {
        await cancelAllNotificationsForPlant(id);
        await scheduleNotificationsForPlant(id);
      }

      Toast.show({
        type: 'success',
        text1: 'Plant marked as watered',
        text2: plantData.areNotificationsEnabled ? 'Watering schedule and reminders updated' : 'Watering schedule updated',
        position: 'bottom'
      });
    } catch (error) {
      // TODO: capture each error, handle accordingly - e.g. plant updated, notifications canceled, but scheduled failed
      console.error('Error marking plant as watered:', error);

      Toast.show({
        type: 'error',
        text1: 'Failed to update plant',
        text2: 'Please try again',
        position: 'bottom'
      });
    } finally {
      // Always disable global pending
      setIsMarkAsWateredPending(false);
    }
  };

  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today

  // Render
  return (
    <ScreenContainer padding={false}>
      {/* Fixed Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={getImageByPlantType(plantData.type)} // Or dynamically:
          style={styles.heroImage}
          contentFit='cover'
        />
        {/* Gradient Overlay - Bottom */}
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.4)']} style={styles.gradientBottom} />

        {/* Gradient Overlay - Top (for back button) */}
        <LinearGradient colors={['rgba(0, 0, 0, 0.3)', 'transparent']} style={styles.gradientTop} />

        {/* Floating Back Button */}
        <Pressable style={styles.backButton} onPress={() => router.dismissTo('/')}>
          <Icon name='chevron.left' size={24} color={colors.neutral[900]} />
        </Pressable>

        {/* Floating Edit Button */}
        <Pressable style={styles.editButton} onPress={() => router.push(`/plant/${id}/edit`)}>
          <Icon name='pencil' size={24} color={colors.neutral[900]} />
        </Pressable>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Plant Type Heading */}
        <View style={styles.header}>
          <Text variant='heading' weight='bold' style={styles.plantType}>
            {formatTitleCase(plantData.type)}
          </Text>
        </View>

        {/* Subheading - Plant Info */}
        <View style={styles.infoSection}>
          <InfoRow label='Plant name' value={plantData.name} />
          <InfoRow label='Location' value={formatTitleCase(plantData.room)} />
          <InfoRow label='Last watered' value={format(lastWatered, 'MMM do')} />
          <InfoRow label='Next watering' value={format(nextWatering.min, 'MMM do')} />
          <InfoRow label='Season' value={seasonCopy} />
        </View>

        {/* Content Sections */}
        <ContentSection title='Overview' content={plantCareData.overview} />
        <ContentSection title='Watering Requirements' content={plantCareData.watering} />
        <ContentSection title='Fertilizer' content={plantCareData.fertilizer} />
        <ContentSection title='Light Requirements' content={plantCareData.light} />
        <ContentSection title='Soil Requirements' content={plantCareData.soil} />
      </ScrollView>

      {/* Floating Button */}
      <View style={styles.floatingButtonContainer}>
        <Button variant='primary' onPress={() => setShowWateredModal(true)} icon='drop.fill'>
          Mark as watered
        </Button>
      </View>

      {/* Watering Date Modal */}
      <Modal
        visible={showWateredModal}
        onClose={handleModalCancelCtaOnClick}
        title='When did you water?'
        description='This will update the last watered date and recalculate the next watering schedule.'
        confirmText='Confirm'
        cancelText='Cancel'
        isConfirmLoading={isMarkAsWateredPending}
        onConfirm={handleModalConfirmCtaOnClick}
      >
        <Column gap='md'>
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              value={modalSelectedDate}
              mode='date'
              display='spinner'
              onChange={handleModalDatePickerOnChange}
              maximumDate={new Date()} // Can't select future dates
              style={styles.datePicker}
            />
          </View>
        </Column>
      </Modal>
    </ScreenContainer>
  );
}

// Info Row Component
function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.infoRow}>
      <Text variant='caption' style={styles.infoLabel}>
        {label}
      </Text>
      <Text variant='body' weight='medium' style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

// Content Section Component
function ContentSection({ title, content }: { title: string; content: string }) {
  return (
    <View style={styles.contentSection}>
      <Text variant='subheading' weight='semibold' style={styles.sectionTitle}>
        {title}
      </Text>
      <Text variant='body' style={styles.sectionContent}>
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    zIndex: 0
  },
  heroImage: {
    width: '100%',
    height: '100%'
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100 // Gradient height
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120 // Covers status bar and back button area
  },
  backButton: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[0], // White background
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md
  },
  editButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[0], // White background
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md
  },
  scrollView: {
    flex: 1,
    marginTop: 250 // Start content below hero
  },
  scrollContent: {
    backgroundColor: colors.neutral[0],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.xl,
    paddingBottom: 70, // More space for fully floating button
    minHeight: '100%'
  },
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg
  },
  plantType: {
    color: colors.neutral[900]
  },
  infoSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral[50],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
    marginBottom: spacing.xl
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm
  },
  infoLabel: {
    color: colors.neutral[600]
  },
  infoValue: {
    color: colors.neutral[900],
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md
  },
  contentSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl
  },
  sectionTitle: {
    color: colors.neutral[900],
    marginBottom: spacing.sm
  },
  sectionContent: {
    color: colors.neutral[700],
    lineHeight: typography.sizes.base * typography.lineHeights.relaxed
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
    ...shadows.lg
  },
  datePickerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md
  },
  datePicker: {
    width: '100%'
  }
});
