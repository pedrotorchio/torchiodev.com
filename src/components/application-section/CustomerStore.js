import CustomerDataset, { makeRandomCustomer, makeSatisfactionProgression } from './CustomerDataset'

let customers = new CustomerDataset();



const customerCount = 4
for (let i = customerCount ; i > 0 ; i--) {
    let c = makeRandomCustomer()
        c.satisfactionProgress = makeSatisfactionProgression(Math.random() * 6 + 2)
    customers.insertCustomer(c)
}


export default customers