// app/test-button.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card/index';
import { Column } from '@/components/Column/index';
import { Row } from '@/components/Row/index';
import { colors, spacing, typography } from '@/constants/design-tokens';
import Toast from 'react-native-toast-message';

export default function TestButtonScreen() {
  const [loading, setLoading] = useState(false);

  const handlePress = (label: string) => {
    Toast.show({
      type: 'success',
      text1: 'Button Pressed',
      text2: label,
      position: 'bottom'
    });
  };

  const handleLoadingDemo = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Button Component Demo</Text>

        {/* Primary Variant */}
        <Card style={styles.card}>
          <Column gap='md'>
            <Text style={styles.cardTitle}>Primary Buttons</Text>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>Sizes</Text>
              <Button size='sm' onPress={() => handlePress('Primary Small')}>
                Small
              </Button>
              <Button size='md' onPress={() => handlePress('Primary Medium')}>
                Medium
              </Button>
              <Button size='lg' onPress={() => handlePress('Primary Large')}>
                Large
              </Button>
            </Column>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>With Icon</Text>
              <Button icon='plus' onPress={() => handlePress('With Icon')}>
                Add Plant
              </Button>
              <Button icon='leaf.fill' onPress={() => handlePress('Icon Only')} iconOnly />
            </Column>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>States</Text>
              <Button disabled>Disabled</Button>
              <Button loading={loading} onPress={handleLoadingDemo}>
                {loading ? 'Loading...' : 'Click to Load'}
              </Button>
            </Column>
          </Column>
        </Card>

        {/* Secondary Variant */}
        <Card style={styles.card}>
          <Column gap='md'>
            <Text style={styles.cardTitle}>Secondary Buttons</Text>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>Sizes</Text>
              <Button variant='secondary' size='sm' onPress={() => handlePress('Secondary Small')}>
                Small
              </Button>
              <Button variant='secondary' size='md' onPress={() => handlePress('Secondary Medium')}>
                Medium
              </Button>
              <Button variant='secondary' size='lg' onPress={() => handlePress('Secondary Large')}>
                Large
              </Button>
            </Column>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>With Icon</Text>
              <Button variant='secondary' icon='pencil' onPress={() => handlePress('Edit')}>
                Edit
              </Button>
              <Button variant='secondary' icon='pencil' onPress={() => handlePress('Icon Only')} iconOnly />
            </Column>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>States</Text>
              <Button variant='secondary' disabled>
                Disabled
              </Button>
            </Column>
          </Column>
        </Card>

        {/* Ghost Variant */}
        <Card style={styles.card}>
          <Column gap='md'>
            <Text style={styles.cardTitle}>Ghost Buttons</Text>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>Sizes</Text>
              <Button variant='ghost' size='sm' onPress={() => handlePress('Ghost Small')}>
                Small
              </Button>
              <Button variant='ghost' size='md' onPress={() => handlePress('Ghost Medium')}>
                Medium
              </Button>
              <Button variant='ghost' size='lg' onPress={() => handlePress('Ghost Large')}>
                Large
              </Button>
            </Column>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>With Icon</Text>
              <Button variant='ghost' icon='chevron.left' onPress={() => handlePress('Back')}>
                Back
              </Button>
              <Button variant='ghost' icon='chevron.right' onPress={() => handlePress('Icon Only')} iconOnly />
            </Column>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>States</Text>
              <Button variant='ghost' disabled>
                Disabled
              </Button>
            </Column>
          </Column>
        </Card>

        {/* Real-world Examples */}
        <Card style={styles.card}>
          <Column gap='md'>
            <Text style={styles.cardTitle}>Real-world Examples</Text>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>Action Bar</Text>
              <Row gap='sm'>
                <Button variant='ghost' icon='chevron.left' iconOnly />
                <Button style={{ flex: 1 }}>Save Changes</Button>
                <Button variant='secondary' icon='trash' iconOnly />
              </Row>
            </Column>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>Form Actions</Text>
              <Row gap='sm'>
                <Button variant='secondary' style={{ flex: 1 }}>
                  Cancel
                </Button>
                <Button style={{ flex: 1 }}>Submit</Button>
              </Row>
            </Column>

            <Column gap='sm'>
              <Text style={styles.sectionLabel}>Icon Grid</Text>
              <Row gap='sm'>
                <Button variant='ghost' icon='plus' iconOnly />
                <Button variant='ghost' icon='pencil' iconOnly />
                <Button variant='ghost' icon='trash' iconOnly />
                <Button variant='ghost' icon='bell.fill' iconOnly />
              </Row>
            </Column>
          </Column>
        </Card>
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
    backgroundColor: colors.neutral[0],
    marginBottom: spacing.lg
  },
  cardTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900]
  },
  sectionLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5
  }
});
