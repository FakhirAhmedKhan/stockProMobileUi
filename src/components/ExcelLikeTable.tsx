import { CheckCircle, Edit2, Eye, Trash2, XCircle } from 'lucide-react-native';
import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// --- Types ---
interface TableEntity {
  id: string;
  [key: string]: any;
}

interface ExcelLikeTableProps {
  data: TableEntity[];
  handleViewDetails?: (id: string) => void;
  handleDeleteStock?: (id: string) => void;
  onEdit?: (entity: TableEntity) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
  showDelBtn?: boolean;
  showButton?: boolean;
  showButtonNavigation?: boolean;
  showStatus?: boolean;
  statusKey?: string;
  columnsToHide?: string[];
  mergeSameRows?: boolean; // Kept for compatibility, though implementation simplified
  mergeKey?: string;       // Kept for compatibility
}

// --- Constants ---
const BASE_COL_WIDTH = 120;
const ACTION_COL_WIDTH = 120;
const THEME = {
  primary: '#8b5cf6',
  primaryBorder: '#7c3aed',
  bg: '#f8f9fa',
  white: '#ffffff',
  text: '#374151',
  dangerBg: '#fef2f2',
  dangerBorder: '#fca5a5',
};

// --- Sub-Components (Performance Optimization) ---

const ActionButton = ({ onPress, style, children }: { onPress: () => void, style?: any, children: React.ReactNode }) => (
  <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress} activeOpacity={0.7}>
    {children}
  </TouchableOpacity>
);

const TableRow = React.memo(({
  item,
  index,
  validColumns,
  props
}: {
  item: TableEntity,
  index: number,
  validColumns: string[],
  props: ExcelLikeTableProps
}) => {
  const {
    showStatus, statusKey = 'activeStatus', showButton, showButtonNavigation,
    showDelBtn, handleViewDetails, handleDeleteStock, setIsModalOpen, onEdit
  } = props;

  const isActive = item[statusKey];

  return (
    <View style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      {validColumns.map((col, idx) => (
        <View key={`${item.id}-${col}-${idx}`} style={[styles.cell, { width: BASE_COL_WIDTH }]}>
          <Text style={styles.cellText} numberOfLines={3}>{item[col] ?? '-'}</Text>
        </View>
      ))}

      {showStatus && (
        <View style={[styles.cell, { width: BASE_COL_WIDTH }]}>
          <View style={[styles.statusBadge, isActive ? styles.statusActive : styles.statusInactive]}>
            {isActive ? <CheckCircle size={14} color="#065f46" /> : <XCircle size={14} color="#991b1b" />}
            <Text style={[styles.statusText, isActive ? styles.statusTextActive : styles.statusTextInactive]}>
              {isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
      )}

      {showButton && (
        <View style={[styles.cell, { width: ACTION_COL_WIDTH }]}>
          <ActionButton onPress={() => { setIsModalOpen?.(true); onEdit?.(item); }}>
            <Edit2 size={18} color={THEME.text} />
          </ActionButton>
        </View>
      )}

      {showButtonNavigation && (
        <View style={[styles.cell, { width: ACTION_COL_WIDTH }]}>
          <View style={styles.actionGroup}>
            <ActionButton onPress={() => handleViewDetails?.(item.id)}>
              <Eye size={18} color={THEME.text} />
            </ActionButton>
            {showDelBtn && (
              <ActionButton onPress={() => handleDeleteStock?.(item.id)} style={styles.deleteButton}>
                <Trash2 size={18} color="#dc2626" />
              </ActionButton>
            )}
          </View>
        </View>
      )}
    </View>
  );
});

// --- Main Component ---

const ExcelLikeTable = (props: ExcelLikeTableProps) => {
  const { data, statusKey = 'activeStatus', columnsToHide = [] } = props;

  // Optimization: useWindowDimensions handles orientation changes automatically
  // const { width } = useWindowDimensions(); 

  // Optimization: Memoize valid columns to avoid recalculation on every render
  const validColumns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).filter((key) => {
      if (key.startsWith('_') || key === statusKey || columnsToHide.includes(key)) return false;
      return data.some(item => item[key] !== null && item[key] !== undefined && item[key] !== '');
    });
  }, [data, statusKey, columnsToHide]);

  const renderItem: ListRenderItem<TableEntity> = useCallback(({ item, index }) => (
    <TableRow item={item} index={index} validColumns={validColumns} props={props} />
  ), [validColumns, props]);

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.horizontalScroll}>
        <View style={styles.tableWrapper}>
          {/* Header */}
          <View style={styles.tableHeader}>
            {validColumns.map((col) => (
              <View key={col} style={[styles.headerCell, { width: BASE_COL_WIDTH }]}>
                <Text style={styles.headerText} numberOfLines={2}>
                  {col.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
              </View>
            ))}
            {props.showStatus && (
              <View style={[styles.headerCell, { width: BASE_COL_WIDTH }]}>
                <Text style={styles.headerText}>Status</Text>
              </View>
            )}
            {(props.showButton || props.showButtonNavigation) && (
              <View style={[styles.headerCell, { width: ACTION_COL_WIDTH }]}>
                <Text style={styles.headerText}>Actions</Text>
              </View>
            )}
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id || Math.random().toString()} // Fallback for safety
            initialNumToRender={10}
            windowSize={5}
            removeClippedSubviews={true} // Performance boost
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg, padding: 16 },
  horizontalScroll: { flex: 1 },
  tableWrapper: {
    backgroundColor: THEME.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: THEME.primary,
    borderBottomWidth: 2,
    borderBottomColor: THEME.primaryBorder,
  },
  headerCell: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: THEME.primaryBorder,
  },
  headerText: {
    color: THEME.white,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  evenRow: { backgroundColor: THEME.white },
  oddRow: { backgroundColor: '#f9fafb' },
  cell: {
    padding: 12,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  cellText: { fontSize: 13, color: THEME.text, textAlign: 'center' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
    gap: 4
  },
  statusActive: { backgroundColor: '#d1fae5' },
  statusInactive: { backgroundColor: '#fee2e2' },
  statusText: { fontSize: 12, fontWeight: '600' },
  statusTextActive: { color: '#065f46' },
  statusTextInactive: { color: '#991b1b' },
  actionButton: {
    backgroundColor: THEME.white,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  deleteButton: { borderColor: THEME.dangerBorder, backgroundColor: THEME.dangerBg },
  actionGroup: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  emptyContainer: { flex: 1, padding: 32, alignItems: 'center' },
  emptyText: { color: '#6b7280', fontSize: 16 },
});

export default ExcelLikeTable;