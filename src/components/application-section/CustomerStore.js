import CustomerDataset, { makeRandomCustomer, makeSatisfactionProgression } from './CustomerDataset'

let customers = new CustomerDataset();



const extraCustomerCount = 1
for(let gender in [0, 1, 2]) {
    let c = makeRandomCustomer()
        c.satisfactionProgress = makeSatisfactionProgression(Math.random() * 3 + 5)
        c.gender = gender
    
    customers.insertCustomer(c)
}
for (let i = extraCustomerCount ; i > 0 ; i--) {
    let c = makeRandomCustomer()
        c.satisfactionProgress = makeSatisfactionProgression(Math.random() * 3 + 5)
    
    customers.insertCustomer(c)
}


export default customers