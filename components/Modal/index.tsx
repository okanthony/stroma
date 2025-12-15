// Components
import { Button } from '@/components/Button';
import { Modal as RNModal, View, Text, StyleSheet, Pressable } from 'react-native';
import { Column } from '@/components/Column/index';
import { Row } from '@/components/Row/index';

// Internal
import { colors, spacing, typography, borderRadius } from '@/constants/design-tokens';

// External
import { ReactNode } from 'react';

// Types
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isConfirmLoading?: boolean;
  variant?: 'default' | 'destructive';
}

// Component
export function Modal({ visible, onClose, title, description, children, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, variant = 'default', isConfirmLoading = false }: ModalProps) {
  return (
    <RNModal visible={visible} transparent animationType='fade' onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Modal content - stop propagation so clicking modal doesn't close it */}
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modal}>
            <Column gap='lg'>
              {/* Header */}
              <Column gap='sm'>
                <Text style={styles.title}>{title}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
              </Column>

              {/* Custom content */}
              {children}

              {/* Actions */}
              <Row gap='sm'>
                <View style={{ flex: 1 }}>
                  <Button disabled={isConfirmLoading} variant='secondary' onPress={onClose} style={{ width: '100%' }}>
                    {cancelText}
                  </Button>
                </View>

                <View style={{ flex: 1 }}>
                  <Button
                    loading={isConfirmLoading}
                    variant={variant === 'destructive' ? 'destructive' : 'primary'}
                    onPress={() => {
                      onConfirm?.();
                      onClose();
                    }}
                    style={{ width: '100%' }}
                  >
                    {confirmText}
                  </Button>
                </View>
              </Row>
            </Column>
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400
  },
  modal: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900]
  },
  description: {
    fontSize: typography.sizes.base,
    color: colors.neutral[600],
    lineHeight: typography.sizes.base * 1.5
  }
});
