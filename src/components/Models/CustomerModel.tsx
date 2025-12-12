import { Building2, CheckCircle2, X } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { height } = Dimensions.get('window');

interface ModalHeaderProps {
    title: string;
    onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => (
    <View style={styles.header}>
        <View style={styles.headerLeft}>
            <View style={styles.iconWrapper}>
                <Building2 size={24} color="#3B82F6" />
            </View>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <X size={24} color="#64748B" />
        </TouchableOpacity>
    </View>
);

interface ModalFooterProps {
    onClose: () => void;
    handleSubmit?: () => void;
    title: string;
    loading?: boolean;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, handleSubmit, title, loading }) => (
    <View style={styles.footer}>
        <TouchableOpacity
            onPress={onClose}
            style={[styles.button, styles.cancelButton]}
            disabled={loading}
        >
            <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.button, styles.saveButton, loading && styles.disabledButton]}
            disabled={loading || !handleSubmit}
        >
            <Text style={styles.saveButtonText}>{loading ? 'Saving...' : title}</Text>
        </TouchableOpacity>
    </View>
);

interface SuccessToastProps {
    visible: boolean;
    message: string;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ visible, message }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]).start();

            const timer = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: -100,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <View style={styles.toast}>
                <View style={styles.toastIconWrapper}>
                    <CheckCircle2 size={20} color="#fff" />
                </View>
                <Text style={styles.toastText}>{message}</Text>
            </View>
        </Animated.View>
    );
};

interface CustomerModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    showSuccess: boolean;
    handleSave: () => void;
    isSubmitting: boolean;
    formData?: any;
    errors?: any;
    handleInputChange?: (field: string, value: any) => void;
    H2Title: string;
    showSuccessText: string;
    children: React.ReactNode;
}

export const CustomerModalForm: React.FC<CustomerModalFormProps> = ({
    isOpen,
    onClose,
    showSuccess,
    handleSave,
    isSubmitting,
    H2Title,
    showSuccessText,
    children,
}) => {
    return (
        <>
            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={onClose}
                statusBarTranslucent
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingView}
                >
                    <View style={styles.overlay}>
                        <TouchableOpacity
                            style={styles.overlayTouchable}
                            activeOpacity={1}
                            onPress={onClose}
                        />
                        <View style={styles.modalContainer}>
                            <View style={styles.modal}>
                                <ModalHeader title={H2Title} onClose={onClose} />

                                <ScrollView
                                    style={styles.content}
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {children}
                                </ScrollView>

                                <ModalFooter
                                    onClose={onClose}
                                    handleSubmit={handleSave}
                                    title="Save Customer"
                                    loading={isSubmitting}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.overlayTouchable}
                            activeOpacity={1}
                            onPress={onClose}
                        />
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            <SuccessToast visible={showSuccess} message={showSuccessText} />
        </>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center', // Centered
        alignItems: 'center',
        padding: 20, // Add padding to avoid edges
    },
    overlayTouchable: {
        flex: 1,
        width: '100%',
    },
    modalContainer: {
        maxHeight: height * 0.8,
        width: '100%',
        maxWidth: 500, // Limit width on tablets
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 24, // Rounded all corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Shadow down
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        backgroundColor: '#fff',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    closeButton: {
        padding: 4,
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        maxHeight: height * 0.5, // Reduce max height slightly inside scroll
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        backgroundColor: '#fff',
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cancelButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#64748B',
    },
    saveButton: {
        backgroundColor: '#3B82F6',
    },
    saveButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    disabledButton: {
        opacity: 0.7,
        backgroundColor: '#93c5fd',
    },
    toastContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
        left: 20,
        zIndex: 1000,
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#10B981',
    },
    toastIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toastText: {
        flex: 1,
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
});