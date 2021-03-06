import Vue from 'vue'

export const genderDataset = {
    0: { label: "Unspecified", color: "#ffe042  " },
    1: { label: "Male", color: "#1896ea" },
    2: { label: "Female", color: "#ff3838" }
}
export const satisfactionRange = [30, 100]
export const satisfactionMaxStep = 20

export class Faker {
    constructor() {
        this.names = {
            female: [
                'Glenda Roberts',
                'Jeniffer Holmes',
                'Marina J K',
                'Lianne Joyner'
            ],
            male: [
                'Robert Roberts',
                'Peter S Jr',
                'Bernard Rocky',
                'John Jones'
            ],
            unspecified: [
                'Alegra Beckham',
                'Aiyla Cope',
                'Gethin Castillo'
            ]
        }
    }

    getName(gender) {
        
        const 
            randIndex = arr => Math.floor(Math.random() * arr.length), 
            partition = getGenderLabelAndColor(gender).label.toLowerCase(),
            array = this.names[partition],
            i = randIndex(array),
            name = this.names[partition].splice(i, 1)[0];
        
        return name
    }
}
export class Customer {
    constructor(name, age, gender, progress = []) {
        this.name = name
        this.age = age
        this.gender = gender
        this.satisfactionProgress = progress
    }
    getGenderLabel() {
        return getGenderLabelAndColor(this.gender).label
    }
    getGenderColor() {
        return getGenderLabelAndColor(this.gender).color
    }
}
export default class CustomerDataset {
    constructor() {
        this.__dataset = Vue.observable([])
    }

    getDataset() {
        return this.__dataset
    }
    insertCustomer(newCustomer) {
        
        newCustomer.id = nextId()
        this.__dataset.push(newCustomer)

        return this.__dataset.length - 1
    }
    get(index) {
        return this.__dataset[index]
    }
    count() {
        return this.__dataset.length
    }

    getFemale() {
        return this.___getByGender('Female')
    }
    getMale() {
        return this.___getByGender('Male')
    }
    getUnspecified() {
        return this.___getByGender('Unspecified')
    }

    ___getByGender(label) {
        const uid = getGenderUidByLabel(label)
        return this.__dataset.filter( c => c.gender == uid)
    }


    findByAgeRange(min, max) {
        return this.__dataset.filter( c => c.age <= max && c.age >= min)
    }
    getAverageAge(byGenderLabel) {
        let set = this.__dataset;

        if (byGenderLabel) {
            set = this.___getByGender(byGenderLabel)
        }
        return (set.reduce((sum, c) => sum + c.age, 0) / set.length)
    }
}

export function getGenderUidByLabel(label) {
    return +Object.entries(genderDataset).findIndex(([key, value]) => value.label == label)
}
export function getGenderLabelAndColor(numeric) {
    return genderDataset[numeric];
}
let ID_TRACK = 0
export function nextId() {
    return ++ID_TRACK
}

export function makeCustomer(name, age, gender, satisfactionProgress = []) {
    return new Customer(name, age, gender, satisfactionProgress)
}
const faker = new Faker()
export function getRandomName(gender) {
    return faker.getName(gender)
}
export function getRandomGender() {
    return Math.random() < .15 ? 0 : Math.floor(Math.random() * 2 + 1);
}
export function getRandomAge() {
    return Math.floor(Math.random() * 60 + 10);
}
export function makeRandomManualCustomerObject(gender) {
    gender = gender || getRandomGender()

    const     
        name = getRandomName(gender),
        age = getRandomAge()

    return { name, age, gender }
}
export function makeRandomCustomer(genderParameter) {
    const { name, age, gender } = makeRandomManualCustomerObject(genderParameter)
    return makeCustomer(name, age, gender)
}
export function getNextSatisfactionPoint(curr) {
    curr = curr || 0
    const [ min, max ] = satisfactionRange

    let 
        step = Math.random() * satisfactionMaxStep + 10;

    const shouldGoDown = () => Math.floor(Math.random() * 10) % 2 == 0
    const isTooLow = val => val < ((max - min)/2 + min)
    const increase = val => val * 1.2
    const decrease = val => val * 1
    const keepWithinRange = val => Math.min(Math.max(val, min), max)

    if (curr == max)
        step = -step
    if (isTooLow(curr)) // if it's already too low, increase ascention
        step = increase(step)
    else if (shouldGoDown()) // if should go down, don't go too much
        step = -decrease(step)

    let value = Math.floor(keepWithinRange(curr + step))
    while(value === curr)
        value = getNextSatisfactionPoint(curr)

    return value
}
export function makeSatisfactionProgression(count) {
    const initial = getNextSatisfactionPoint(satisfactionRange[0])
    let values = [initial]
    for(let i = 0 ; i < count ; i++) {
        values.push(getNextSatisfactionPoint(values[i-1]))
    }
    return values
} 