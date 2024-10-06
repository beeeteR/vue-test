import type { IConfigurableOption, IVariantProduct } from "./options-product"
import type { TImageUrl, TBrandId } from './common'

export enum EWallet {
    USD = "$",
    RUB = "₽"
}

export enum ETypeProduct {
    simple = 'простой',
    configurable = 'настраиваемый'
}

interface IProductBase {
    type: ETypeProduct,
    id: number,
    sku: string,
    title: string,
    regular_price: {
        currency: keyof typeof  EWallet,
        value: number
    },
    image: TImageUrl,
    brand: TBrandId,
}

interface IProductConfigurable extends IProductBase {
    type: ETypeProduct.configurable
    configurable_options?: IConfigurableOption[],
    variants?: IVariantProduct[]
}
interface IProductSimple extends IProductBase {
    type: ETypeProduct.simple
}

export type TProduct = IProductConfigurable | IProductSimple