import { CheckCircle, Edit2, Eye, Trash2, XCircle } from 'lucide-react-native';
import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// --- Types ---
interface TableEntity {
  id: string;
  [key: string]: string | number | boolean | null | undefined; // More strict than 'any'
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
  mergeSameRows?: boolean;
  mergeKey?: string;
}

// --- Constants ---
const BASE_COL_WIDTH = 120;
const ACTION_COL_WIDTH = 120;

// --- Sub-Components ---
const ActionButton = ({ onPress, className, children }: { onPress: () => void, className?: string, children: React.ReactNode }) => (
  <TouchableOpacity
    className={`border border-gray-200 rounded-lg p-2 items-center justify-center bg-white ${className}`}
    onPress={onPress}
    activeOpacity={0.7}
  >
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
  const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

  return (
    <View className={`flex-row border-b border-gray-200 ${rowBg}`}>
      {validColumns.map((col, idx) => (
        <View key={`${item.id}-${col}`} className="p-3 justify-center border-r border-gray-200" style={{ width: BASE_COL_WIDTH }}>
          <Text className="text-sm text-gray-700 text-center" numberOfLines={3}>
            {String(item[col] ?? '-')}
          </Text>
        </View>
      ))}

      {showStatus && (
        <View className="p-3 justify-center border-r border-gray-200" style={{ width: BASE_COL_WIDTH }}>
          <View className={`flex-row items-center px-3 py-1.5 rounded-full self-center gap-1 ${isActive ? 'bg-green-100' : 'bg-red-50'}`}>
            {isActive ? <CheckCircle size={14} color="#065f46" /> : <XCircle size={14} color="#991b1b" />}
            <Text className={`text-xs font-semibold ${isActive ? 'text-green-800' : 'text-red-800'}`}>
              {isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
      )}

      {showButton && (
        <View className="justify-center items-center p-3 border-r border-gray-200" style={{ width: ACTION_COL_WIDTH }}>
          <ActionButton onPress={() => { setIsModalOpen?.(true); onEdit?.(item); }}>
            <Edit2 size={18} color="#374151" />
          </ActionButton>
        </View>
      )}

      {showButtonNavigation && (
        <View className="justify-center items-center p-3 border-r border-gray-200" style={{ width: ACTION_COL_WIDTH }}>
          <View className="flex-row gap-2">
            <ActionButton onPress={() => handleViewDetails?.(item.id)}>
              <Eye size={18} color="#374151" />
            </ActionButton>
            {showDelBtn && (
              <ActionButton onPress={() => handleDeleteStock?.(item.id)} className="border-red-200 bg-red-50">
                <Trash2 size={18} color="#dc2626" />
              </ActionButton>
            )}
          </View>
        </View>
      )}
    </View>
  );
});

TableRow.displayName = 'TableRow';

// --- Main Component ---
const ExcelLikeTable = (props: ExcelLikeTableProps) => {
  const { data, statusKey = 'activeStatus', columnsToHide = [] } = props;

  const validColumns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).filter((key) => {
      if (key.startsWith('_') || key === statusKey || columnsToHide.includes(key)) return false;
      return data.some(item => item[key] !== null && item[key] !== undefined && item[key] !== '');
    });
  }, [data, statusKey, columnsToHide]);

  const renderItem: ListRenderItem<TableEntity> = useCallback(
    ({ item, index }) => (
      <TableRow item={item} index={index} validColumns={validColumns} props={props} />
    ),
    [validColumns, props]
  );

  const keyExtractor = useCallback((item: TableEntity, index: number) => {
    return item.id ? String(item.id) : `row-${index}`;
  }, []);

  if (!data || data.length === 0) {
    return (
      <View className="flex-1 p-8 items-center justify-center">
        <Text className="text-gray-500 text-base">No data available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={true} className="flex-1">
        <View className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          {/* Header */}
          <View className="flex-row bg-purple-600 border-b-2 border-purple-700">
            {validColumns.map((col) => (
              <View key={col} className="p-3 justify-center items-center border-r border-white/20" style={{ width: BASE_COL_WIDTH }}>
                <Text className="text-white text-xs font-bold uppercase text-center" numberOfLines={2}>
                  {col.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
              </View>
            ))}
            {props.showStatus && (
              <View className="p-3 justify-center items-center border-r border-white/20" style={{ width: BASE_COL_WIDTH }}>
                <Text className="text-white text-xs font-bold uppercase">Status</Text>
              </View>
            )}
            {(props.showButton || props.showButtonNavigation) && (
              <View className="p-3 justify-center items-center" style={{ width: ACTION_COL_WIDTH }}>
                <Text className="text-white text-xs font-bold uppercase">Actions</Text>
              </View>
            )}
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            initialNumToRender={10}
            windowSize={5}
            removeClippedSubviews={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ExcelLikeTable;