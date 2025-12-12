// Components
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/Text';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Field } from '@/components/Field';
import { FieldLabel } from '@/components/FieldLabel';
import { FieldDescription } from '@/components/FieldDescription';
import { FieldError } from '@/components/FieldError';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Icon } from '@/components/Icon';

// Internal
import { getRoomDropdownOptions } from '@/utils/getRoomDropdownOptions';
import { spacing, colors, borderRadius } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';

// External
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

// Schema
const namePlantSchema = z.object({
  name: z.string().max(50, 'Name must be 50 characters or less').optional().or(z.literal('')),
  room: z.string().min(1, 'Please select a room'),
  lastWatered: z.custom<Date>((val) => val instanceof Date, {
    message: 'Please select a date'
  })
});

// Types
type NamePlantFormData = z.infer<typeof namePlantSchema>;

// Declare different type for use in parent component as lastWatered is Date in form but converted to string in submit handler
export type NamePlantSubmitData = {
  name: string;
  room: string;
  lastWatered: string;
};

type NamePlantProps = {
  initialName?: string;
  initialRoom?: string;
  initialLastWatered?: Date;
  onSubmit: (data: { name: string; room: string; lastWatered: string }) => void;
  submitButtonLabel?: string;
  title?: string;
  isLoading?: boolean;
};

// Component
export function NamePlant({
  initialName = '',
  initialRoom = '',
  initialLastWatered,
  onSubmit,
  submitButtonLabel = 'Continue',
  title = 'Tell us more about your plant',
  isLoading = false
}: NamePlantProps) {
  // Hooks - state
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [tempDate, setTempDate] = React.useState(new Date());

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors
  } = useForm<NamePlantFormData>({
    resolver: zodResolver(namePlantSchema),
    defaultValues: {
      name: initialName,
      room: initialRoom,
      lastWatered: initialLastWatered
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange' // Fix errors as user types for immediate feedback
  });

  // Hooks - custom
  const backgroundColor = useThemeColor({}, 'background');
  const cardBg = useThemeColor(
    {
      light: colors.neutral[0],
      dark: colors.neutral[800]
    },
    'background'
  );
  const cardBorder = useThemeColor(
    {
      light: colors.neutral[200],
      dark: colors.neutral[700]
    },
    'border'
  );
  const textColor = useThemeColor(
    {
      light: colors.neutral[900],
      dark: colors.neutral[100]
    },
    'text'
  );
  const placeholderColor = useThemeColor(
    {
      light: colors.neutral[400],
      dark: colors.neutral[500]
    },
    'text'
  );

  // Vars
  // Watch lastWatered value
  const lastWateredValue = watch('lastWatered');
  const datePickerMinDate = new Date(new Date().setMonth(new Date().getMonth() - 3));

  // Handlers
  const handleFormSubmit = (data: NamePlantFormData) => {
    onSubmit({
      name: data.name?.trim() || '',
      room: data.room,
      lastWatered: data.lastWatered.toISOString()
    });
  };

  const handleOpenDatePicker = () => {
    setTempDate(lastWateredValue || new Date());
    setShowDatePicker(true);
  };

  const handleConfirmDate = () => {
    setValue('lastWatered', tempDate, { shouldValidate: false });
    setShowDatePicker(false);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    return isToday ? 'Today' : format(date, 'MMM d, yyyy');
  };

  // Render
  return (
    <>
      <ScrollView style={[styles.scrollView, { backgroundColor }]} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text variant='heading' weight='bold' style={styles.title}>
            {title}
          </Text>

          <View style={styles.form}>
            {/* Name Field - Optional */}
            <Controller
              control={control}
              name='name'
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
              render={({ field: { onChange, value } }) => (
                <Field error={Boolean(errors.room)}>
                  <FieldLabel>Room</FieldLabel>
                  <FieldDescription>Where is your plant located?</FieldDescription>
                  <Select value={value} onValueChange={onChange} options={getRoomDropdownOptions()} placeholder='Select a room' error={Boolean(errors.room)} />
                  {errors.room && <FieldError>{errors.room.message}</FieldError>}
                </Field>
              )}
            />

            {/* Last Watered Field - Required */}
            <Field error={Boolean(errors.lastWatered)}>
              <FieldLabel>Last watered</FieldLabel>
              <FieldDescription>What day did you last water this plant?</FieldDescription>
              <Pressable
                onPress={handleOpenDatePicker}
                style={[
                  styles.dateCard,
                  {
                    backgroundColor: cardBg,
                    borderColor: errors.lastWatered ? colors.error : cardBorder
                  }
                ]}
                accessibilityRole='button'
                accessibilityLabel={`Select last watered date, currently ${lastWateredValue ? formatDate(lastWateredValue) : 'not set'}`}
                accessibilityHint='Opens date picker'
              >
                <Text variant='body' style={[styles.dateText, { color: lastWateredValue ? textColor : placeholderColor }]}>
                  {lastWateredValue ? formatDate(lastWateredValue) : 'Select a date'}
                </Text>
                <Icon name='chevron.right' size={20} color={placeholderColor} />
              </Pressable>
              {errors.lastWatered && <FieldError>{errors.lastWatered.message}</FieldError>}
            </Field>
          </View>

          <Button variant='primary' onPress={handleSubmit(handleFormSubmit)} loading={isLoading}>
            {submitButtonLabel}
          </Button>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal visible={showDatePicker} onClose={() => setShowDatePicker(false)} title='Last watered' confirmText='Done' cancelText='Cancel' onConfirm={handleConfirmDate}>
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={tempDate}
            mode='date'
            display='inline'
            onChange={(_, selectedDate) => {
              if (selectedDate) {
                setTempDate(selectedDate);
                clearErrors('lastWatered');
              }
            }}
            minimumDate={datePickerMinDate}
            maximumDate={new Date()}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
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
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    minHeight: 52
  },
  dateText: {
    flex: 1
  },
  datePickerContainer: {
    alignItems: 'center'
  }
});
