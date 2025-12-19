import {
  AlertCircle,
  Barcode,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Hash,
  TrendingUp,
  User,
  Zap,
} from "lucide-react-native";
import { Text, View } from "react-native";
import { SummaryCard } from "../SummaryCard";
import { InputField } from "./Inputid";

export const OderCreateModelInputs = ({
  stock,
  formData,
  formErrors,
  dataCache,
  handleInputChange,
  loadProductOptions,
  loadCustomerOptions,
  setFormData,
  profit,
  remaining,
  margin,
}: any) => {
  return (
    <View className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth relative">
      <InputField
        id="OrderCreateCustomerId"
        label="Customer"
        icon={<User />}
        asyncSelect={true}
        asyncValue={
          formData.customerId
            ? {
              value: formData.customerId,
              label: dataCache[formData.customerId]?.name || "Loading...",
            }
            : null
        }
        loadOptions={loadCustomerOptions}
        placeholder="Search customer..."
        value={formData.customerId}
        onChange={(val: any) =>
          setFormData((p: any) => ({
            ...p,
            customerId: val?.value || val,
          }))
        }
        error={formErrors.customerId}
      />
      <InputField
        id="OrderCreateProductsID"
        label="Products"
        icon={<Barcode />}
        asyncSelect={true}
        asyncValue={formData.productIds.map((id: any) => ({
          value: id,
          label: dataCache[id]?.barcode || String(id),
        }))}
        loadOptions={loadProductOptions}
        placeholder="Search customer..."
        value={formData.customerId}
        onChange={(selected: any) => {
          const ids = selected?.map((s: any) => s.value) || [];
          setFormData((p: any) => ({
            ...p,
            productIds: ids,
            quantity: ids.length,
            totalPrice: parseFloat(
              (ids.length * (p.unitPrice || 0)).toFixed(4)
            ),
          }));
        }}
        error={formErrors.customerId}
      />

      {/* Products */}
      <View className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputField
          id="OrderCreateQuantity"
          label="Quantity"
          type="number"
          icon={<Hash size={18} />}
          value={formData.quantity || ""}
          onChange={handleInputChange}
          placeholder="Enter quantity"
          error={formErrors.quantity}
          readOnly={stock?.generateUniqueBarcode}
          required
        />

        <InputField
          id="OrderCreateUnitPrice"
          label="Unit Price"
          type="number"
          icon={<DollarSign size={18} />}
          value={formData.unitPrice || ""}
          onChange={handleInputChange}
          placeholder="Enter unit price"
          error={formErrors.unitPrice}
          required
        />
      </View>

      <View className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputField
          id="OrderCreateTotalPrice"
          label="Total Price"
          type="number"
          icon={<DollarSign size={18} />}
          value={formData.totalPrice || ""}
          onChange={handleInputChange}
          placeholder="Total price"
          error={formErrors.totalPrice}
        />

        <InputField
          id="OrderCreateTotalPaid"
          label="Amount Paid"
          type="number"
          icon={<CreditCard size={18} />}
          value={formData.totalPaid || ""}
          onChange={handleInputChange}
          placeholder="Amount paid"
          error={formErrors.totalPaid}
          required
        />
      </View>

      {/* Summary Cards */}
      <View className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        <SummaryCard
          icon={Hash}
          label="Qty"
          value={formData.quantity}
          color="blue"
        />
        <SummaryCard
          icon={DollarSign}
          label="Total"
          value={`$${formData.totalPrice.toFixed(4)}`}
          color="green"
        />
        <SummaryCard
          icon={TrendingUp}
          label="Profit"
          value={`$${profit.toFixed(4)}`}
          color={profit >= 0 ? "emerald" : "rose"}
        />
        <SummaryCard
          icon={Zap}
          label="Margin"
          value={`${margin}%`}
          color={profit >= 0 ? "purple" : "red"}
        />
      </View>

      {/* Payment Status */}
      {formData.totalPaid > 0 && (
        <View
          className={`mt-4 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 border-2 ${remaining > 0
              ? "bg-orange-50 border-orange-200 text-orange-800"
              : "bg-green-50 border-green-200 text-green-800"
            }`}
        >
          {remaining > 0 ? (
            <AlertCircle className="w-6 h-6" />
          ) : (
            <CheckCircle2 className="w-6 h-6" />
          )}
          <Text className="text-sm sm:text-base">
            {remaining > 0 ? (
              <>
                Partial payment — Remaining:{" "}
                <Text className="font-bold">${remaining.toFixed(4)}</Text>
              </>
            ) : (
              <>Full payment received</>
            )}
          </Text>
        </View>
      )}
    </View>
  );
};
