import { ShoppingCart } from "lucide-react-native";
import { KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback, View } from "react-native";
import { ProductFromInputs } from "../Forms/ProductFromInputs";
import { ModelFooter } from "../ModelFooter";
import { ModelHeader } from "../ModelHeader";

export default function ProductModel({
  isOpen,
  onClose,
  handleFormSubmit,
  formData,
  handleChange,
  errors,
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
                  title="Product Model"
                  icon={<ShoppingCart size={24} color="#3B82F6" />}
                  onClose={onClose}
                />

                <View className="flex-1 w-full">
                  <ProductFromInputs
                    formData={formData} handleChange={handleChange} errors={errors}
                  />
                </View>

                <ModelFooter
                  onClose={onClose}
                  handleSubmit={handleFormSubmit}
                  title="Save Product"
                  isSubmitting={isSubmitting}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
