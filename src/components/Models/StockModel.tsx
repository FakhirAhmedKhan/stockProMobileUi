import { Sparkles } from "lucide-react-native";
import { KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback, View } from "react-native";
import { StockCreateInputs } from "../Forms/StockFromInputs";
import { ModelFooter } from "../ModelFooter";
import { ModelHeader } from "../ModelHeader";

export default function StockCreateModal({
  isOpen,
  onClose,
  handleSubmit,
  title = "Add New Stock",
  isSubmitting = false,
  control,
  errors,
  loadSuppliers,
  setValue,
  watch,
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
                {/* Header */}
                <ModelHeader
                  title={title}
                  icon={<Sparkles size={24} color="#3B82F6" />}
                  onClose={onClose}
                />

                {/* Content */}
                <View className="flex-1 w-full">
                  <StockCreateInputs
                    control={control}
                    errors={errors}
                    loadSuppliers={loadSuppliers}
                    setValue={setValue}
                    watch={watch}
                  />
                </View>

                {/* Footer */}
                <ModelFooter
                  onClose={onClose}
                  handleSubmit={handleSubmit}
                  title="Save Stock"
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
