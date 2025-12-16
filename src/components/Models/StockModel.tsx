import { Sparkles } from "lucide-react-native";
import React from "react";
import { KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback, View } from "react-native";
import { ModelFooter } from "../ModelFooter";
import { ModelHeader } from "../ModelHeader";

export default function StockCreateModal({
  isOpen,
  onClose,
  handleSubmit, // Function to trigger form submission
  title = "Add New Stock",
  children,
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
          <View className="flex-1 bg-black/40 justify-center items-center p-4">
            <TouchableWithoutFeedback>
              <View className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl max-h-[90%] overflow-hidden shadow-xl">
                {/* Header */}
                <ModelHeader
                  title={title}
                  icon={<Sparkles size={20} color="#3B82F6" />}
                  onClose={onClose}
                />

                {/* Content */}
                <View className="flex-1">
                  {children}
                </View>

                {/* Footer */}
                <ModelFooter
                  onClose={onClose}
                  handleSubmit={handleSubmit}
                  title="Save Stock" // Or generic "Save"
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
