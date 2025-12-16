import { DollarSign, Hash, Package, User } from "lucide-react-native";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { ScrollView, Switch, Text, View } from "react-native";
import { InputField } from "./Inputid";

export const StockCreateInputs = ({
  register,
  generateBarcode,
  // category, // Removed as we watch it now
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
      // Avoid infinite loop if totalPrice is already correct
      // However, to mimic 'if quantity or unit price changes, update Total Price'
      // we should probably check if it was focused? Or just override?
      // Simple override:
      setValue("totalPrice", (q * u).toFixed(2));
    }
  }, [totalQuantity, unitPrice, setValue]);

  useEffect(() => {
    // If Total Price is updated manually (and quantity exists), update Unit Price
    // This conflicts with the above Effect if both run blindly.
    // Ideally we need to know WHICH field changed.
    // But simplistic approach: if totalPrice changes and IS NOT q*u ??

    // Actually, simpler logic:
    // Update Remaining
    const price = parseFloat(totalPrice) || 0;
    const paid = parseFloat(totalPaid) || 0;
    setValue("totalRemaining", (price - paid).toFixed(2));
  }, [totalPrice, totalPaid, setValue]);

  // Simplified logic: strict dependency flow
  // Qty * Unit -> Price
  // Price - Paid -> Remaining
  // We won't support editing Price to update Unit Price for now to avoid complexity without more state

  return (
    <ScrollView className="flex-1 p-6">
      <View className="space-y-6">
        <View className="gap-5">
          {/* Supplier */}
          <InputField
            id="StockCreateSupplierId"
            name="supplierId"
            label="Supplier"
            icon={<User size={18} color="#6B7280" />}
            asyncSelect={true}
            loadOptions={loadSuppliers}
            placeholder="Select supplier..."
            useController={true}
            control={control}
            rules={{ required: "Supplier is required" }}
            error={errors.supplierId?.message}
            required
          />

          {/* Stock Title */}
          <InputField
            id="StockCreateStockTitle"
            name="stockTitle"
            label="Stock Title"
            icon={<User size={18} color="#6B7280" />}
            placeholder="Stock Title"
            useController={true}
            control={control}
            rules={{ required: "Stock Title is required" }}
            error={errors.stockTitle?.message}
            required
          />

          {/* Category */}
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

          {/* Expiry Date */}
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

          {/* Quantity */}
          <InputField
            id="StockCreateTotalQuantity"
            name="totalQuantity"
            label="Quantity"
            type="number"
            icon={<Hash size={18} color="#6B7280" />}
            placeholder="Quantity"
            useController={true}
            control={control}
            rules={{
              required: "Quantity is required",
              min: { value: 1, message: "Min 1" },
            }}
            error={errors.totalQuantity?.message}
            required
          />

          {/* Unit Price */}
          <InputField
            id="StockCreateUnitPrice"
            name="unitPrice"
            label="Unit Price"
            type="number"
            icon={<DollarSign size={18} color="#6B7280" />}
            placeholder="Unit Price"
            useController={true}
            control={control}
            rules={{ required: "Unit Price is required" }}
            error={errors.unitPrice?.message}
            required
          />

          {/* Total Price */}
          <InputField
            id="StockCreateTotalPrice"
            name="totalPrice"
            label="Total Price"
            type="number"
            icon={<DollarSign size={18} color="#6B7280" />}
            placeholder="Total Price"
            useController={true}
            control={control}
            rules={{ required: "Total Price is required" }}
            error={errors.totalPrice?.message}
            required
          />

          {/* Total Paid */}
          <InputField
            id="StockCreateTotalPaid"
            name="totalPaid"
            label="Total Paid"
            type="number"
            icon={<DollarSign size={18} color="#6B7280" />}
            placeholder="Total Paid"
            useController={true}
            control={control}
            rules={{ required: "Total Paid is required" }}
            error={errors.totalPaid?.message}
            required
          />

          {/* Total Remaining */}
          <InputField
            id="StockCreateTotalRemaining"
            name="totalRemaining"
            label="Total Remaining"
            type="number"
            icon={<DollarSign size={18} color="#6B7280" />}
            placeholder="Total Remaining"
            useController={true}
            control={control}
            readOnly
            error={errors.totalRemaining?.message}
          />

          {/* Storage */}
          <InputField
            id="StockCreateStorage"
            name="storage"
            label="Storage"
            icon={<Package size={18} color="#6B7280" />}
            placeholder="Storage"
            useController={true}
            control={control}
            rules={{ required: "Storage is required" }}
            error={errors.storage?.message}
            required
          />

          {/* Color */}
          <InputField
            id="StockCreateColor"
            name="color"
            label="Color"
            icon={<Package size={18} color="#6B7280" />}
            placeholder="Color"
            useController={true}
            control={control}
            rules={{ required: "Color is required" }}
            error={errors.color?.message}
            required
          />
        </View>

        {/* Barcode Toggle */}
        <View className="border-t border-gray-200 pt-5 mt-6 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="font-semibold text-gray-800 text-base">
              Generate Barcode
            </Text>
            {generateBarcode ? (
              <Text className="text-sm text-green-600 mt-1">
                Unique barcode for each item.
              </Text>
            ) : (
              <Text className="text-sm text-gray-600 mt-1">
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
                trackColor={{ false: "#D1D5DB", true: "#3B82F6" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D1D5DB"
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
