export class Helper {

    convertPriceToNumber(price: string): number {
        let rawPrice = price.replace('/[^0-9.]/g', '')
        return Number.parseInt(rawPrice);
    }

    getProductDetails() {
        return {
            productName: 'macbook',
            totalQuantity: '1',
            price: '$602.00'
        }
    }

    getLoginDetails() {
        return {
            email: '',
            password: ''
        }
    }
}