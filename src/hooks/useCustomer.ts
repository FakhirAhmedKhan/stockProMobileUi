import { Customer } from "@/types/interface";
import { useCallback, useEffect, useState } from "react";
import { create, getCustomers } from "@/services/CustomerService";
import {
  CustomerApiResponse,
  defaultFormData,
  useDebounce,
} from "./useDebounce";

export function useCustomers(isOpen?: boolean, onClose?: () => void, onSave?: (c: Customer) => void) {
  const [pageSize, setPageSize] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState(defaultFormData);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (c: Customer) => setSelectedCustomer(c);

  // React Native uses onChangeText -> value only
  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phoneNumber" ? value.replace(/[^\d+]/g, "") : value,
    }));

    if (errors[name]) {
      const copy = { ...errors };
      delete copy[name];
      setErrors(copy);
    }
  };

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setFetchError("");

    try {
      const d: CustomerApiResponse = await getCustomers(
        currentPage,
        pageSize,
        debouncedSearch
      );

      const list = d.customers || d.items || [];
      setCustomers(list);
      setTotalCount(d.totalCount ?? list.length);
    } catch (err: any) {
      setFetchError("Failed to fetch customers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, debouncedSearch]);

  const handleSave = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const newCustomer = { ...formData };

      await create(newCustomer);
      await fetchCustomers();

      onSave?.(newCustomer);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose?.();
      }, 2000);
    } catch {
      setErrors({ submit: "Failed to save customer. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, fetchCustomers, onSave, onClose]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    if (isOpen) {
      setFormData(defaultFormData);
      setErrors({});
      setShowSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  return {
    showSuccess,
    handleInputChange,
    handleEdit,
    handleSave,
    isSubmitting,
    formData,
    errors,
    setIsModalOpen,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    customers,
    isLoading,
    fetchError,
    totalCount,
    currentPage,
    setCurrentPage,
  };
}
