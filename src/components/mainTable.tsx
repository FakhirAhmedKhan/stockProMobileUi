const DeleteIcon = () => <Text style={styles.icon}>🗑️</Text>;
const CheckCircleIcon = () => <Text style={styles.iconSmall}>✅</Text>;
const XCircleIcon = () => <Text style={styles.iconSmall}>❌</Text>;
const RotateIcon = () => <Text style={styles.icon}>🔄</Text>;

interface ExcelLikeTableProps {
  data: any[];
  handleViewDetails?: (id: string) => void;
  handleDeleteStock?: (id: string) => void;
  mergeSameRows?: boolean;
  showDelBtn?: boolean;
  mergeKey?: string;
  showButton?: boolean;
  showButtonNavigation?: boolean;
  showStatus?: boolean;
  statusKey?: string;
  columnsToHide?: string[];
  onEdit?: (entity: any) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
}

const ExcelLikeTable = ({
  data,
  handleViewDetails,
  handleDeleteStock,
  mergeSameRows = false,
  showDelBtn = false,
  mergeKey,
  showButton = false,
  showButtonNavigation = false,
  showStatus = false,
  statusKey = 'activeStatus',
  columnsToHide = [],
  onEdit,
  setIsModalOpen,
}: ExcelLikeTableProps) => {
  const [isLandscape, setIsLandscape] = useState(false);

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  // Auto-hide null or empty columns + manually hidden ones
  const validColumns = Object.keys(data[0]).filter((key) => {
    if (
      key.startsWith('_') ||
      key === statusKey ||
      columnsToHide.includes(key)
    ) {
      return false;
    }
    const hasNonNull = data.some(
      (item) =>
        item[key] !== null && item[key] !== undefined && item[key] !== ''
    );
    return hasNonNull;
  });

  // Merge logic (optional)
  const mergedData = mergeSameRows && mergeKey
    ? data.reduce((acc, curr) => {
      const last = acc[acc.length - 1];
      if (last && last[mergeKey] === curr[mergeKey]) {
        last._rowspan = (last._rowspan || 1) + 1;
        curr._hide = true;
      } else {
        acc.push(curr);
      }
      return acc;
    }, [])
    : data;

  // Format column header
  const formatHeader = (col: string) => {
    return col.replace(/([A-Z])/g, ' $1').trim();
  };

  // Toggle landscape mode
  const toggleOrientation = () => {
    setIsLandscape(!isLandscape);
  };

  // Calculate column width
  const screenWidth = Dimensions.get('window').width;
  const baseColumnWidth = isLandscape ? 120 : 100;
  const actionColumnWidth = 120;

  const renderRow = ({ item: entity, index: i }: { item: any; index: number }) => {
    if (entity._hide) return null;

    return (
      <View
        style={[
          styles.tableRow,
          i % 2 === 0 ? styles.evenRow : styles.oddRow,
        ]}
      >
        {validColumns.map((col, idx) => (
          <View
            key={idx}
            style={[styles.cell, { width: baseColumnWidth }]}
          >
            <Text style={styles.cellText} numberOfLines={3}>
              {entity[col] ?? '-'}
            </Text>
          </View>
        ))}

        {/* Status Badge */}
        {showStatus && (
          <View style={[styles.cell, { width: baseColumnWidth }]}>
            <View
              style={[
                styles.statusBadge,
                entity[statusKey]
                  ? styles.statusActive
                  : styles.statusInactive,
              ]}
            >
              {entity[statusKey] ? (
                <CheckCircleIcon />
              ) : (
                <XCircleIcon />
              )}
              <Text
                style={[
                  styles.statusText,
                  entity[statusKey]
                    ? styles.statusTextActive
                    : styles.statusTextInactive,
                ]}
              >
                {entity[statusKey] ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
        )}

        {/* Edit Button */}
        {showButton && (
          <View style={[styles.cell, { width: actionColumnWidth }]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                setIsModalOpen?.(true);
                onEdit?.(entity);
              }}
              activeOpacity={0.7}
            >
              <Edit2Icon />
            </TouchableOpacity>
          </View>
        )}

        {/* View & Delete Buttons */}
        {showButtonNavigation && (
          <View style={[styles.cell, { width: actionColumnWidth }]}>
            <View style={styles.actionGroup}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  handleViewDetails?.(
                    entity.id ||
                    entity.stockId ||
                    entity.productId ||
                    entity
                  )
                }
                activeOpacity={0.7}
              >
                <EyeIcon />
              </TouchableOpacity>
              {showDelBtn && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() =>
                    handleDeleteStock?.(
                      entity.id ||
                      entity.stockId ||
                      entity.productId ||
                      entity
                    )
                  }
                  activeOpacity={0.7}
                >
                  <DeleteIcon />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Table Container */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.horizontalScroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tableWrapper}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            {validColumns.map((col, idx) => (
              <View
                key={idx}
                style={[styles.headerCell, { width: baseColumnWidth }]}
              >
                <Text style={styles.headerText} numberOfLines={2}>
                  {formatHeader(col)}
                </Text>
              </View>
            ))}
            {showStatus && (
              <View style={[styles.headerCell, { width: baseColumnWidth }]}>
                <Text style={styles.headerText}>Status</Text>
              </View>
            )}
            {showButton && (
              <View style={[styles.headerCell, { width: actionColumnWidth }]}>
                <Text style={styles.headerText}>Actions</Text>
              </View>
            )}
            {showButtonNavigation && (
              <View style={[styles.headerCell, { width: actionColumnWidth }]}>
                <Text style={styles.headerText}>Navigation</Text>
              </View>
            )}
          </View>

          {/* Table Body using FlatList */}
          <FlatList
            data={mergedData}
            renderItem={renderRow}
            keyExtractor={(item, index) => item.id || index.toString()}
            style={styles.verticalScroll}
            showsVerticalScrollIndicator={true}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rotateButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  horizontalScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  tableWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#8b5cf6',
    borderBottomWidth: 2,
    borderBottomColor: '#7c3aed',
  },
  headerCell: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#7c3aed',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verticalScroll: {
    maxHeight: 600,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  evenRow: {
    backgroundColor: '#ffffff',
  },
  oddRow: {
    backgroundColor: '#f9fafb',
  },
  cell: {
    padding: 12,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  cellText: {
    fontSize: 13,
    color: '#374151',
    textAlign: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
  },
  statusActive: {
    backgroundColor: '#d1fae5',
  },
  statusInactive: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  statusTextActive: {
    color: '#065f46',
  },
  statusTextInactive: {
    color: '#991b1b',
  },
  actionButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteButton: {
    borderColor: '#fca5a5',
    backgroundColor: '#fef2f2',
  },
  actionGroup: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  iconSmall: {
    fontSize: 14,
  },
});

// Demo Component


export default ExcelLikeTable;