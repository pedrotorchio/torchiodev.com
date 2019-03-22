import Faker from 'faker'
import Vue from 'vue'

export const genderDataset = {
    0: { label: "Unspecified", color: "#81c200" },
    1: { label: "Male", color: "#ffc107" },
    2: { label: "Female", color: "#FF5722" }
}
export const satisfactionRange = [30, 100]
export const satisfactionMaxStep = 20

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

export function makeCustomer(name, age, gender, satisfactionProgress = [0]) {
    return new Customer(name, age, gender, satisfactionProgress)
}

export function makeRandomManualCustomerObject() {
    const 
        name = `${Faker.name.firstName()} ${Faker.name.lastName()}`,
        age = Math.floor(Math.random() * 60 + 10),
        gender = Math.random() < .15 ? 0 : Math.floor(Math.random() * 2 + 1);

    return { name, age, gender }
}
export function makeRandomCustomer() {
    const { name, age, gender } = makeRandomManualCustomerObject()
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
    
    
    return Math.floor(keepWithinRange(curr + step))
}
export function makeSatisfactionProgression(count) {
    const initial = Math.random() * satisfactionRange[1]
    let values = [0]
    for(let i = 0 ; i < count ; i++) {
        values.push(getNextSatisfactionPoint(values[i-1]))
    }
    return values
} 