import type { TImageUrl } from "./common"

type TAttributeCode = string

export interface IConfigurableOption {
    attribute_id: number,
    attribute_code: TAttributeCode,
    label: string,
    values: IValueConfigurableOption[]
}

export interface IValueConfigurableOption {
    label: string,
    value_index: number,
    value: string
}

export interface IVariantProduct {
    attributes: IAttributesVariantProduct[],
    product: IProductInfoVariantProduct
}

export interface IAttributesVariantProduct {
    code: TAttributeCode,
    value_index: number
}

export interface IProductInfoVariantProduct {
    id: number,
    sku: string,
    image: TImageUrl
}