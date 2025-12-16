import { DollarSign, Hash, Package, User } from "lucide-react-native";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { ScrollView, Switch, Text, View } from "react-native";
import { InputField } from "./Inputid";

export const StockCreateInputs = ({
  register,
  generateBarcode,
  errors,
  handleSubmit,
  onSubmit,
  control,
  loadSuppliers,
  setValue,
  watch,
}: any) => {

  const totalQuantity = watch("totalQuantity");
  const unitPrice = watch("unitPrice");
  const totalPrice = watch("totalPrice");
  const totalPaid = watch("totalPaid");
  const category = watch("category");

  useEffect(() => {
    const q = parseFloat(totalQuantity) || 0;
    const u = parseFloat(unitPrice) || 0;
    if (q > 0 && u > 0) {
      setValue("totalPrice", (q * u).toFixed(2));
    }
  }, [totalQuantity, unitPrice, setValue]);

  useEffect(() => {
    const price = parseFloat(totalPrice) || 0;
    const paid = parseFloat(totalPaid) || 0;
    setValue("totalRemaining", (price - paid).toFixed(2));
  }, [totalPrice, totalPaid, setValue]);

  return (
    <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
      <View className="space-y-6 pb-6">

        {/* Section 1: Basic Information */}
        <View className="gap-4">
          <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wider ml-1">Basic Information</Text>

          <InputField
            id="StockCreateStockTitle"
            name="stockTitle"
            label="Stock Title"
            icon={<Package size={18} color="#6B7280" />}
            placeholder="e.g. iPhone 14 Pro Max"
            useController={true}
            control={control}
            rules={{ required: "Stock Title is required" }}
            error={errors.stockTitle?.message}
            required
          />

          <View className="flex-row gap-4">
            <View className="flex-1">
              <InputField
                id="StockCreateCategory"
                name="category"
                label="Category"
                icon={<Package size={18} color="#6B7280" />}
                showOptions={true}
                options={categoryOptions}
                placeholder="Category"
                useController={true}
                control={control}
                rules={{ required: "Category is required" }}
                error={errors.category?.message}
                required
              />
            </View>
            <View className="flex-1">
              <InputField
                id="StockCreateSupplierId"
                name="supplierId"
                label="Supplier"
                icon={<User size={18} color="#6B7280" />}
                asyncSelect={true}
                loadOptions={loadSuppliers}
                placeholder="Select..."
                useController={true}
                control={control}
                rules={{ required: "Supplier is required" }}
                error={errors.supplierId?.message}
                required
              />
            </View>
          </View>

          {/* Expiry Date (Conditional) */}
          {category === "Food" && (
            <InputField
              id="StockCreateExpiryDate"
              name="expiryDate"
              label="Expiry Date"
              type="date"
              icon={<User size={18} color="#6B7280" />}
              placeholder="Expiry Date"
              useController={true}
              control={control}
              rules={{ required: "Expiry Date is required for Food" }}
              error={errors.expiryDate?.message}
              required
            />
          )}
        </View>

        {/* Section 2: Product Attributes */}
        <View className="gap-4">
          <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wider ml-1 mt-2">Product Attributes</Text>

          <View className="flex-row gap-4">
            <View className="flex-1">
              <InputField
                id="StockCreateStorage"
                name="storage"
                label="Storage"
                icon={<Package size={18} color="#6B7280" />}
                placeholder="e.g. 256GB"
                useController={true}
                control={control}
                rules={{ required: "Storage is required" }}
                error={errors.storage?.message}
                required
              />
            </View>
            <View className="flex-1">
              <InputField
                id="StockCreateColor"
                name="color"
                label="Color"
                icon={<Package size={18} color="#6B7280" />}
                placeholder="e.g. Black"
                useController={true}
                control={control}
                rules={{ required: "Color is required" }}
                error={errors.color?.message}
                required
              />
            </View>
          </View>
        </View>

        {/* Section 3: Inventory & Pricing */}
        <View className="gap-4">
          <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wider ml-1 mt-2">Inventory & Pricing</Text>

          <View className="flex-row gap-4">
            <View className="flex-1">
              <InputField
                id="StockCreateTotalQuantity"
                name="totalQuantity"
                label="Quantity"
                type="number"
                icon={<Hash size={18} color="#6B7280" />}
                placeholder="0"
                useController={true}
                control={control}
                rules={{
                  required: "Required",
                  min: { value: 1, message: "Min 1" },
                }}
                error={errors.totalQuantity?.message}
                required
              />
            </View>
            <View className="flex-1">
              <InputField
                id="StockCreateUnitPrice"
                name="unitPrice"
                label="Unit Price"
                type="number"
                icon={<DollarSign size={18} color="#6B7280" />}
                placeholder="0.00"
                useController={true}
                control={control}
                rules={{ required: "Required" }}
                error={errors.unitPrice?.message}
                required
              />
            </View>
          </View>

          <View className="bg-gray-50 p-4 rounded-2xl space-y-4 border border-gray-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-gray-700">Calculated Totals</Text>
              <View className="bg-blue-100 px-2 py-0.5 rounded text-xs text-blue-700 font-medium"><Text className="text-blue-700 text-xs font-semibold">Auto-calculated</Text></View>
            </View>

            <InputField
              id="StockCreateTotalPrice"
              name="totalPrice"
              label="Total Price"
              type="number"
              icon={<DollarSign size={18} color="#6B7280" />}
              placeholder="0.00"
              useController={true}
              control={control}
              rules={{ required: "Required" }}
              error={errors.totalPrice?.message}
              required
            />

            <View className="flex-row gap-4">
              <View className="flex-1">
                <InputField
                  id="StockCreateTotalPaid"
                  name="totalPaid"
                  label="Amount Paid"
                  type="number"
                  icon={<DollarSign size={18} color="#6B7280" />}
                  placeholder="0.00"
                  useController={true}
                  control={control}
                  rules={{ required: "Required" }}
                  error={errors.totalPaid?.message}
                  required
                />
              </View>
              <View className="flex-1">
                <InputField
                  id="StockCreateTotalRemaining"
                  name="totalRemaining"
                  label="Remaining"
                  type="number"
                  icon={<DollarSign size={18} color="#6B7280" />}
                  placeholder="0.00"
                  useController={true}
                  control={control}
                  readOnly
                  error={errors.totalRemaining?.message}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Barcode Toggle */}
        <View className="border-t border-gray-100 pt-5 mt-2 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="font-semibold text-gray-800 text-base">
              Generate Barcode
            </Text>
            {generateBarcode ? (
              <Text className="text-xs text-green-600 mt-1">
                Unique barcode for each item.
              </Text>
            ) : (
              <Text className="text-xs text-gray-500 mt-1">
                Single barcode for entire quantity.
              </Text>
            )}
          </View>

          <Controller
            control={control}
            name="generateUniqueBarcode"
            render={({ field: { onChange, value } }) => (
              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E7EB"
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const categoryOptions = [
  { label: "Food", value: "Food" },
  { label: "Electronics", value: "Electronics" },
  { label: "Clothing", value: "Clothing" },
  { label: "Other", value: "Other" },
];