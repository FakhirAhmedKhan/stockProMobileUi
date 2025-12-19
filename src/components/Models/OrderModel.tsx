import { ShoppingCart } from "lucide-react-native";
import { KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { ModelHeader } from "../ModelHeader";
import { ModelFooter } from "../ModelFooter";
import { OderCreateModelInputs } from "../Forms/OrderFromInputs";

export default function OrderModel({
  isOpen,
  onClose,
  handleFormSubmit,
  stock,
  formData,
  formErrors,
  dataCache,
  isFormLoading,
  handleInputChange,
  loadProductOptions,
  loadCustomerOptions,
  setFormData,
  profit,
  remaining,
  margin,
  isSubmitting = false,
}: any) {
  if (!isOpen) return null;

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1 bg-black/50 justify-center items-center px-4">
            <TouchableWithoutFeedback>
              <View className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg h-[85%] shadow-2xl flex flex-col overflow-hidden">
                <ModelHeader
                  title="Order Model"
                  icon={<ShoppingCart size={24} color="#3B82F6" />}
                  onClose={onClose}
                />

                <View className="flex-1 w-full">
                  <OderCreateModelInputs
                    stock={stock}
                    formData={formData}
                    formErrors={formErrors}
                    dataCache={dataCache}
                    handleInputChange={handleInputChange}
                    loadProductOptions={loadProductOptions}
                    loadCustomerOptions={loadCustomerOptions}
                    setFormData={setFormData}
                    profit={profit}
                    remaining={remaining}
                    margin={margin}
                  />
                </View>

                <ModelFooter
                  onClose={onClose}
                  handleSubmit={handleFormSubmit}
                  title="Save Order"
                  isSubmitting={isSubmitting || isFormLoading}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
