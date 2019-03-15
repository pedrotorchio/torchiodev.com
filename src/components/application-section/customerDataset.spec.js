import { 
    genderDataset, 
    getGenderUidByLabel, 
    getGenderLabelAndColor, 
    makeCustomer,
    makeRandomManualCustomerObject,
    makeRandomCustomer,
    getNextSatisfactionPoint,
    makeSatisfactionProgression,
    satisfactionMaxStep,
    default as CustomerDataset, 
    satisfactionRange} from './CustomerDataset'

describe('Gender Dataset', ()=> {
    
    it('should export the correct gender dataset', () => {
        expect(genderDataset[0].label).toBe("Unspecified")
        expect(genderDataset[0].label).toBeTruthy()
        expect(genderDataset[1].label).toBe("Male")
        expect(genderDataset[1].label).toBeTruthy()
        expect(genderDataset[2].label).toBe("Female")
        expect(genderDataset[2].label).toBeTruthy()
    })
    it('should get the correct gender uid from its label', () => {
        expect(getGenderUidByLabel('Female')).toBe(2)
        expect(getGenderUidByLabel('Male')).toBe(1)
        expect(getGenderUidByLabel('Unspecified')).toBe(0)
    })
    it('should get the correct gender label and color from its uid', () => {
        expect(getGenderLabelAndColor(2).label).toBe('Female')
        expect(getGenderLabelAndColor(1).label).toBe('Male')
        expect(getGenderLabelAndColor(0).label).toBe('Unspecified')
    })
})


describe('Customer Dataset Utils', () => {
    it('makeCustomer should create Customer Object', () => {
        const { name, age, gender } = makeRandomManualCustomerObject()
        expect(makeCustomer(name, age, gender)).toEqual({ name, age, gender, satisfactionProgress: [] })
    })
})

describe('Write to Customer Dataset', () => {
    let db = null

    beforeEach(()=>{
        db = new CustomerDataset();
    })

    it('should have gettable dataset', () => {
        expect(Array.isArray(db.getDataset())).toBeTruthy()
    })
    it('should insert a new customer', () => {
        
        const c = makeRandomCustomer()
        const { name, age, gender } = c;
        const index = db.insertCustomer(c)
        
        expect(index).not.toBeNaN()
        expect(db.getDataset()[index]).toEqual({ name, age, gender, satisfactionProgress: [] })
    })
})


describe('Read from Customer Dataset', () => {
    let db = null
    const count = 10
    beforeEach(() => {
        db = new CustomerDataset();
        for (let i = count ; i > 0 ; i--) {
            db.insertCustomer(
                makeRandomCustomer()
            )
        }
    })

    it('should get customers by index', () => {
        const set = db.getDataset()

        expect(db.get(0)).toEqual(set[0])
        expect(db.get(set.length -1 )).toEqual(set[set.length - 1])
    })
    it('should return customers count', () => {
        expect(db.count()).toEqual(count)
    })
    it('should return customers by gender', () => {
        const 
            maleUid = getGenderUidByLabel('Male'), 
            femaleUid = getGenderUidByLabel('Female'),
            unspecifiedUid = getGenderUidByLabel('Unspecified');

        expect(db.getMale().findIndex(c => c.gender != maleUid)).toEqual(-1)
        expect(db.getFemale().findIndex(c => c.gender != femaleUid)).toEqual(-1)
        expect(db.getUnspecified().findIndex(c => c.gender != unspecifiedUid)).toEqual(-1)
    })
    it('should return customers by age range', () => {
        expect (db.findByAgeRange(10, 30).findIndex(c => c.age > 30 || c.age < 10)).toEqual(-1)
        expect (db.findByAgeRange(20, 40).findIndex(c => c.age > 40 || c.age < 20)).toEqual(-1)
        expect (db.findByAgeRange(30, 60).findIndex(c => c.age > 60 || c.age < 30)).toEqual(-1)
    })

    it('should return age average', () => {
        db = new CustomerDataset();

        db.insertCustomer({ age: 40, gender: getGenderUidByLabel('Male') })
        db.insertCustomer({ age: 30, gender: getGenderUidByLabel('Male') })
        db.insertCustomer({ age: 20, gender: getGenderUidByLabel('Male') })
        db.insertCustomer({ age: 10, gender: getGenderUidByLabel('Female') })
        db.insertCustomer({ age: 15, gender: getGenderUidByLabel('Female') })
        db.insertCustomer({ age: 25, gender: getGenderUidByLabel('Unspecified') })

        expect(db.getAverageAge()).toEqual(140/db.count())
        expect(db.getAverageAge('Male')).toEqual(30)
        expect(db.getAverageAge('Female')).toEqual(12.5)
        expect(db.getAverageAge('Unspecified')).toEqual(25)
    })
})


expect.extend({
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
            return {
                message: () =>
                `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            };
        }
    },
});


describe('Random Satisfaction points', () => {
    it("points should be between 0 and 100", () => {
        let value = 0
        for(let i = 1000 ; i > 0 ; i--) {
            value = getNextSatisfactionPoint(value)
            expect(value).toBeWithinRange(satisfactionRange[0], satisfactionRange[1])
        }
    })
    it('should generate defined number of points', () => {
        expect(makeSatisfactionProgression(10).length).toEqual(10)
    })
})