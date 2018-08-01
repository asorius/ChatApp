const expect=require('expect')
const {isRealString}=require('./validation')

describe('String validation.',()=>{
    it('should return true / data is string with spaces',()=>{
        const data='g fd'
        expect(isRealString(data)).toBeTruthy()
    })
    it('should return false / data is spaces',()=>{
        const data='     '
        expect(isRealString(data)).toBeFalsy()
    })
    it('should return false / data is non-string values',()=>{
        const data=78
        expect(isRealString(data)).toBeFalsy()
    })
})