export default function convertToSubCurrency(amount: number, factor = 100){
    return Math.round(amount * factor)
}