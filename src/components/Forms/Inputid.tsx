import { validateField as globalValidateField } from '@/components/Forms/validateField';
import { AlertCircle, CheckCircle2 } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

function useFormHandlers() {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBlur = useCallback((field: string, value: any) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = globalValidateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  return { touched, errors, handleBlur };
}

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  icon: React.ReactNode;
  value?: string | number;
  placeholder?: string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  required?: boolean;
  showOptions?: boolean;
  options?: string[] | any[];
  error?: string;
  readOnly?: boolean;

  // FOR ASYNC SELECT
  asyncSelect?: boolean;
  loadOptions?: any;
  asyncValue?: any;
  isMulti?: boolean;
  additional?: any;
  closeMenuOnSelect?: boolean;
  isClearable?: boolean;

  // FOR REACT-SELECT
  reactSelect?: boolean;
  selectOptions?: any[];
  selectValue?: any;
  isDisabled?: boolean;

  // FOR REACT-HOOK-FORM CONTROLLER
  useController?: boolean;
  control?: any;
  name?: string;
  rules?: any;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  icon,
  value,
  placeholder,
  onChange,
  onBlur,
  required = false,
  showOptions = false,
  options = [],
  error: externalError,
  readOnly = false,

  // ASYNC SELECT
  asyncSelect = false,
  loadOptions,
  asyncValue,
  isMulti = false,
  additional,
  closeMenuOnSelect,
  isClearable = false,

  // REACT-SELECT
  reactSelect = false,
  selectOptions = [],
  selectValue,
  isDisabled = false,

  // CONTROLLER
  useController: shouldUseController = false,
  control,
  name,
  rules,
}) => {
  const { touched, errors, handleBlur } = useFormHandlers();
  const [showPicker, setShowPicker] = useState(false);
  const [asyncOptions, setAsyncOptions] = useState<any[]>([]);
  const [loadingAsync, setLoadingAsync] = useState(false);

  const errorMessage = externalError || (touched[id] ? errors[id] : undefined);
  const hasError = !!errorMessage;
  const isValid = !hasError && !!value && (touched[id] || !!externalError);

  const handleInputBlur = (fieldValue?: any) => {
    if (!asyncSelect) handleBlur(id, fieldValue);
    if (onBlur) onBlur();
  };

  // Load async options when modal opens
  const loadAsyncOptions = async () => {
    if (!loadOptions) return;
    setLoadingAsync(true);
    try {
      const result = await loadOptions('', [], additional);
      setAsyncOptions(result.options || []);
    } catch (error) {
      console.error('Failed to load options:', error);
    } finally {
      setLoadingAsync(false);
    }
  };

  const renderInput = (fieldValue?: any, fieldOnChange?: any, fieldOnBlur?: any) => {
    const inputValue = fieldValue !== undefined ? fieldValue : value;
    const inputOnChange = fieldOnChange || onChange;
    const inputOnBlur = fieldOnBlur || handleInputBlur;

    // Get keyboard type based on input type
    const getKeyboardType = () => {
      if (type === 'number') return 'numeric';
      if (type === 'email') return 'email-address';
      if (type === 'tel') return 'phone-pad';
      return 'default';
    };

    // For select/picker fields
    if (asyncSelect || reactSelect || showOptions) {
      const displayValue =
        asyncSelect ? (asyncValue?.label || inputValue?.label || 'Select...')
          : reactSelect ? (selectValue?.label || inputValue?.label || 'Select...')
            : inputValue || 'Select...';

      return (
        <>
          <TouchableOpacity
            onPress={() => {
              if (asyncSelect) loadAsyncOptions();
              setShowPicker(true);
            }}
            disabled={readOnly || isDisabled}
            className={`flex-row items-center border rounded-xl px-4 py-3.5 ${hasError ? 'border-red-300 bg-red-50/50' : isValid ? 'border-emerald-300' : 'border-gray-200'
              } ${readOnly || isDisabled ? 'bg-gray-50' : 'bg-white'}`}
          >
            <View className="mr-2">{icon}</View>
            <Text className={`flex-1 ${!inputValue ? 'text-slate-400' : 'text-slate-800'}`}>
              {displayValue}
            </Text>
            {isValid && (
              <CheckCircle2 color="#10b981" size={20} />
            )}
            {hasError && (
              <AlertCircle color="#ef4444" size={20} />
            )}
          </TouchableOpacity>

          {/* Picker Modal */}
          <Modal
            visible={showPicker}
            transparent
            animationType="slide"
            onRequestClose={() => setShowPicker(false)}
          >
            <View className="flex-1 justify-end bg-black/50">
              <View className="bg-white rounded-t-3xl max-h-96">
                <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                  <Text className="text-lg font-semibold text-slate-800">{label}</Text>
                  <TouchableOpacity onPress={() => setShowPicker(false)}>
                    <Text className="text-blue-600 font-medium">Done</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={asyncSelect ? asyncOptions : reactSelect ? selectOptions : options}
                  keyExtractor={(item, index) =>
                    typeof item === 'string' ? item : (item.value || index.toString())
                  }
                  renderItem={({ item }) => {
                    const optionValue = typeof item === 'string' ? item : item.value;
                    const optionLabel = typeof item === 'string' ? item : item.label;
                    const isSelected = inputValue === optionValue || inputValue?.value === optionValue;

                    return (
                      <TouchableOpacity
                        onPress={() => {
                          const newValue = typeof item === 'string' ? item : item;
                          if (inputOnChange) {
                            inputOnChange(newValue);
                          }
                          setShowPicker(false);
                        }}
                        className={`p-4 border-b border-gray-100 ${isSelected ? 'bg-blue-50' : ''}`}
                      >
                        <Text className={`text-base ${isSelected ? 'text-blue-600 font-medium' : 'text-slate-800'}`}>
                          {optionLabel}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={
                    <View className="p-8 items-center">
                      <Text className="text-slate-400">
                        {loadingAsync ? 'Loading...' : 'No options available'}
                      </Text>
                    </View>
                  }
                />
              </View>
            </View>
          </Modal>
        </>
      );
    }

    // Regular text input
    return (
      <View className="relative">
        <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          {icon}
        </View>

        <TextInput
          value={inputValue?.toString() || ''}
          onChangeText={(text) => {
            if (inputOnChange) {
              inputOnChange(type === 'number' ? Number(text) : text);
            }
          }}
          onBlur={() => inputOnBlur(inputValue)}
          editable={!readOnly}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          keyboardType={getKeyboardType()}
          secureTextEntry={type === 'password'}
          className={`w-full pl-11 pr-12 py-3.5 border rounded-xl font-medium text-base ${hasError ? 'border-red-300 bg-red-50/50' : isValid ? 'border-emerald-300' : 'border-gray-200'
            } ${readOnly ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-900'}`}
        />

        {isValid && (
          <View className="absolute right-3 top-1/2 -translate-y-1/2">
            <CheckCircle2 color="#10b981" size={20} />
          </View>
        )}
        {hasError && (
          <View className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle color="#ef4444" size={20} />
          </View>
        )}
      </View>
    );
  };

  const content = (
    <View className="space-y-2">
      <Text className="text-sm font-semibold text-slate-700">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>

      {shouldUseController && control && name ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => renderInput(field.value, field.onChange, field.onBlur)}
        />
      ) : (
        renderInput()
      )}

      {hasError && (
        <View className="flex-row items-center gap-1.5">
          <AlertCircle color="#dc2626" size={14} />
          <Text className="text-red-600 text-sm">{errorMessage}</Text>
        </View>
      )}
    </View>
  );

  return content;
};