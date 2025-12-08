import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Switch } from '@/components/Switch';
import { Card } from '@/components/Card/index';
import { Column } from '@/components/Column/index';
import { Row } from '@/components/Row/index';
import { colors, spacing, typography } from '@/constants/design-tokens';

export default function TestSwitchScreen() {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(false);

  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Switch Component Demo</Text>

        <Column gap='lg'>
          {/* Basic Switch */}
          <Card style={styles.card}>
            <Column gap='md'>
              <Text style={styles.cardTitle}>Basic Switch</Text>
              <Row align='center' justify='space-between'>
                <Text style={styles.label}>Off State</Text>
                <Switch checked={switch1} onCheckedChange={setSwitch1} />
              </Row>
              <Text style={styles.status}>Status: {switch1 ? 'ON' : 'OFF'}</Text>
            </Column>
          </Card>

          {/* Pre-checked Switch */}
          <Card style={styles.card}>
            <Column gap='md'>
              <Text style={styles.cardTitle}>Pre-checked Switch</Text>
              <Row align='center' justify='space-between'>
                <Text style={styles.label}>On State</Text>
                <Switch checked={switch2} onCheckedChange={setSwitch2} />
              </Row>
              <Text style={styles.status}>Status: {switch2 ? 'ON' : 'OFF'}</Text>
            </Column>
          </Card>

          {/* Disabled Switch */}
          <Card style={styles.card}>
            <Column gap='md'>
              <Text style={styles.cardTitle}>Disabled Switch</Text>
              <Row align='center' justify='space-between'>
                <Text style={styles.label}>Disabled (Off)</Text>
                <Switch checked={false} disabled />
              </Row>
              <Row align='center' justify='space-between'>
                <Text style={styles.label}>Disabled (On)</Text>
                <Switch checked={true} disabled />
              </Row>
            </Column>
          </Card>

          {/* Real-world Example */}
          <Card style={styles.card}>
            <Column gap='md'>
              <Text style={styles.cardTitle}>Settings Example</Text>

              <Row align='center' justify='space-between'>
                <Column gap='xs' style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>Notifications</Text>
                  <Text style={styles.settingDescription}>Receive watering reminders</Text>
                </Column>
                <Switch checked={switch3} onCheckedChange={setSwitch3} />
              </Row>

              {switch3 && (
                <View style={styles.additionalSetting}>
                  <Text style={styles.settingDescription}>✓ You will receive notifications for all plants</Text>
                </View>
              )}
            </Column>
          </Card>

          {/* Multiple Switches */}
          <Card style={styles.card}>
            <Column gap='md'>
              <Text style={styles.cardTitle}>Multiple Options</Text>

              <Row align='center' justify='space-between'>
                <Text style={styles.label}>Email notifications</Text>
                <Switch />
              </Row>

              <Row align='center' justify='space-between'>
                <Text style={styles.label}>Push notifications</Text>
                <Switch checked />
              </Row>

              <Row align='center' justify='space-between'>
                <Text style={styles.label}>SMS notifications</Text>
                <Switch />
              </Row>
            </Column>
          </Card>
        </Column>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xl
  },
  card: {
    padding: spacing.lg,
    backgroundColor: colors.neutral[0]
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[900],
    marginBottom: spacing.sm
  },
  label: {
    fontSize: typography.sizes.base,
    color: colors.neutral[900]
  },
  status: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    fontStyle: 'italic'
  },
  settingLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral[900]
  },
  settingDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600]
  },
  additionalSetting: {
    backgroundColor: colors.primary[50],
    padding: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.xs
  }
});
