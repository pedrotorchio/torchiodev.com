import CustomerDataset, { makeRandomCustomer, makeSatisfactionProgression } from './CustomerDataset'

let customers = new CustomerDataset();



const customerCount = 1
for(let gender in [0, 1, 2]) {
    let c = makeRandomCustomer()
        c.satisfactionProgress = makeSatisfactionProgression(Math.random() * 6 + 2)
        c.gender = gender
    
    customers.insertCustomer(c)
}
for (let i = customerCount ; i > 0 ; i--) {
    let c = makeRandomCustomer()
        c.satisfactionProgress = makeSatisfactionProgression(Math.random() * 6 + 2)
    
    customers.insertCustomer(c)
}


export default customers