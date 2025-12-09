import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';

export const Pagination = ({
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    totalPages,
    text,
}: any) => {
    const [jumpValue, setJumpValue] = useState('');

    // Generate page numbers with ellipsis logic
    const getPageNumbers = () => {
        const pages = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (pageNumber <= 3) {
                pages.push(2, 3, 4, 'ellipsis', totalPages);
            } else if (pageNumber >= totalPages - 2) {
                pages.push(
                    'ellipsis',
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(
                    'ellipsis',
                    pageNumber - 1,
                    pageNumber,
                    pageNumber + 1,
                    'ellipsis',
                    totalPages
                );
            }
        }

        return pages;
    };

    // Handle page jump
    const handlePageJump = () => {
        const value = Number(jumpValue);
        if (!isNaN(value) && value >= 1 && value <= totalPages) {
            setPageNumber(value);
            setJumpValue('');
        }
    };

    const pageNumbers = getPageNumbers();

    return (
        <View style={styles.container}>
            {/* Items per page selector */}
            <View style={styles.topRow}>
                <Text style={styles.label}>{text}</Text>
                <View style={styles.sizeButtons}>
                    {[5, 10, 20, 50].map((size) => (
                        <TouchableOpacity
                            key={size}
                            onPress={() => {
                                setPageSize(size);
                                setPageNumber(1);
                            }}
                            style={[
                                styles.sizeButton,
                                pageSize === size && styles.sizeButtonActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.sizeButtonText,
                                    pageSize === size && styles.sizeButtonTextActive,
                                ]}
                            >
                                {size}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Pagination controls */}
            <View style={styles.paginationRow}>
                {/* Previous button */}
                <TouchableOpacity
                    onPress={() => setPageNumber(Math.max(pageNumber - 1, 1))}
                    disabled={pageNumber === 1}
                    style={[
                        styles.navButton,
                        pageNumber === 1 && styles.navButtonDisabled,
                    ]}
                >
                    <Text
                        style={[
                            styles.navButtonText,
                            pageNumber === 1 && styles.navButtonTextDisabled,
                        ]}
                    >
                        Prev
                    </Text>
                </TouchableOpacity>

                {/* Page numbers */}
                <View style={styles.pageNumbers}>
                    {pageNumbers.map((page, index) =>
                        page === 'ellipsis' ? (
                            <View key={`ellipsis-${index}`} style={styles.ellipsis}>
                                <Text style={styles.ellipsisText}>···</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                key={page}
                                onPress={() => setPageNumber(page)}
                                style={[
                                    styles.pageButton,
                                    pageNumber === page && styles.pageButtonActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.pageButtonText,
                                        pageNumber === page && styles.pageButtonTextActive,
                                    ]}
                                >
                                    {page}
                                </Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>

                {/* Next button */}
                <TouchableOpacity
                    onPress={() =>
                        setPageNumber(Math.min(pageNumber + 1, totalPages))
                    }
                    disabled={pageNumber === totalPages}
                    style={[
                        styles.navButton,
                        pageNumber === totalPages && styles.navButtonDisabled,
                    ]}
                >
                    <Text
                        style={[
                            styles.navButtonText,
                            pageNumber === totalPages && styles.navButtonTextDisabled,
                        ]}
                    >
                        Next
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Jump to page */}
            <View style={styles.jumpRow}>
                <Text style={styles.jumpLabel}>Go to:</Text>
                <TextInput
                    value={jumpValue}
                    onChangeText={setJumpValue}
                    onSubmitEditing={handlePageJump}
                    keyboardType="number-pad"
                    placeholder="1"
                    style={styles.jumpInput}
                    maxLength={String(totalPages).length}
                />
                <Text style={styles.jumpLabel}>of {totalPages}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    label: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    sizeButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    sizeButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: '#fff',
    },
    sizeButtonActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    sizeButtonText: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '500',
    },
    sizeButtonTextActive: {
        color: '#fff',
    },
    paginationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        gap: 8,
    },
    navButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    navButtonDisabled: {
        backgroundColor: 'transparent',
    },
    navButtonText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    navButtonTextDisabled: {
        color: '#9CA3AF',
    },
    pageNumbers: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    pageButton: {
        minWidth: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    pageButtonActive: {
        backgroundColor: '#3B82F6',
    },
    pageButtonText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '600',
    },
    pageButtonTextActive: {
        color: '#fff',
    },
    ellipsis: {
        minWidth: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ellipsisText: {
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: '600',
    },
    jumpRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    jumpLabel: {
        fontSize: 13,
        color: '#6B7280',
    },
    jumpInput: {
        width: 50,
        height: 36,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 14,
        color: '#374151',
        backgroundColor: '#fff',
    },
});