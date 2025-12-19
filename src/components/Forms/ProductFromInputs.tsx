import { categoryOptions, colorOptions, conditionOptions, storageOptions } from '@/constants/Data.Constant'
import { Package } from 'lucide-react-native'
import { View } from 'react-native'
import { InputField } from './Inputid'

export const ProductFromInputs = ({ formData, handleChange, errors }: any) => {
    return (
        <View className="p-6 space-y-4">
            <InputField
                id="ProductModalName"
                label="Product Name"
                type="text"
                icon={<Package size={18} color="#64748b" />}
                value={formData.name || ''}
                onChange={(val: any) => handleChange('name', val)}
                placeholder="Product Name"
                error={errors.name}
                required
            />

            <View className="flex-row gap-4">
                <View className="flex-1">
                    <InputField
                        id="ProductModalStorage"
                        label="Storage"
                        type="text"
                        icon={<Package size={18} color="#64748b" />}
                        value={formData.storage || ''}
                        onChange={(val: any) => handleChange('storage', val)}
                        placeholder="Storage"
                        showOptions={true}
                        options={storageOptions}
                        error={errors.storage}
                        required
                    />
                </View>
                <View className="flex-1">
                    <InputField
                        id="ProductModalPrice"
                        label="Price"
                        type="number"
                        icon={<Package size={18} color="#64748b" />}
                        value={formData.price || ''}
                        onChange={(val: any) => handleChange('price', val)}
                        placeholder="Price"
                        error={errors.price}
                        required
                    />
                </View>
            </View>

            <InputField
                id="ProductModalBarcode"
                label="Barcode"
                type="text"
                icon={<Package size={18} color="#64748b" />}
                value={formData.barcode || ''}
                onChange={(val: any) => handleChange('barcode', val)}
                placeholder="Barcode"
                error={errors.barcode}
                required
            />

            <View className="flex-row gap-4">
                <View className="flex-1">
                    <InputField
                        id="ProductModalCondition"
                        label="Condition"
                        type="text"
                        icon={<Package size={18} color="#64748b" />}
                        value={formData.condition || ''}
                        onChange={(val: any) => handleChange('condition', val)}
                        placeholder="Condition"
                        showOptions={true}
                        options={conditionOptions}
                        error={errors.condition}
                        required
                    />
                </View>
                <View className="flex-1">
                    <InputField
                        id="ProductModalColor"
                        label="Color"
                        type="text"
                        icon={<Package size={18} color="#64748b" />}
                        value={formData.color || ''}
                        onChange={(val: any) => handleChange('color', val)}
                        placeholder="Color"
                        showOptions={true}
                        options={colorOptions}
                        error={errors.color}
                        required
                    />
                </View>
            </View>

            <InputField
                id="ProductModalCategory"
                label="Category"
                type="text"
                icon={<Package size={18} color="#64748b" />}
                value={formData.category || ''}
                onChange={(val: any) => handleChange('category', val)}
                placeholder="Category"
                showOptions={true}
                options={categoryOptions}
                error={errors.category}
                required
            />
        </View>
    )
}
