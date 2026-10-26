import { faker } from '@faker-js/faker'

export class DataGenerator {

    static getFirstName(): string {
        return faker.person.firstName();
    }

    static getLastName(): string {
        return faker.person.lastName()
    }

    static getFullName(): string {
        return faker.person.fullName()
    }

    static getEmail(): string {
        return faker.internet.email()
    }

    static getPhoneNumber() {
        return faker.phone.number()
    }
    static getUsername() {
        return faker.internet.username()
    }
    static getPassword(length: number = 10) {
        return faker.internet.password({ length })
    }
    static getCountry() {
        return faker.location.country()
    }
    static getState() {
        return faker.location.state()
    }
    static getCity() {
        return faker.location.city()
    }
    static getStreet() {
        return faker.location.street()
    }
    static getStreetAddress() {
        return faker.location.streetAddress()
    }
    static getZipCode() {
        return faker.location.zipCode()
    }
    static getLatitude() {
        return faker.location.latitude()
    }
    static getLongitude() {
        return faker.location.longitude()

    }

    /*
        Date & Time
    */

    static getCurrentDate() {
        return faker.date.recent().toISOString().split('T')[0]
    }

    static getRecentDate(days: number = 10) {
        return faker.date.recent({ days }).toISOString().split('T')[0]
    }

    static getFutureDate(years: number = 1) {
        return faker.date.future({ years }).toISOString().split('T')[0]
    }

    static getPastDate(years: number = 1) {
        return faker.date.past({ years }).toISOString().split('T')[0]
    }

    // ==================== Commerce ====================

    static getProductName() {
        return faker.commerce.productName()
    }

    static getProductDescription() {
        return faker.commerce.productDescription()
    }
    static getProductPrice() {
        return faker.commerce.price({ min: 10, max: 990, dec: 2 })
    }
    static getDepartment() {
        return faker.commerce.department()
    }
    static getImageUrl() {
        return faker.image.url()
    }
    static getNumber() {
        return faker.number.int({ min: 1, max: 99 })
    }

    // ==================== API Payload Generators ====================

    static generateInvalidLoginPayload() {
        return {
            username: this.getUsername(),
            password: this.getPassword()
        }
    }

    static generateProductPayload() {
        return {
            title: this.getProductName(),
            price: this.getProductPrice(),
            description: this.getProductDescription(),
            image: this.getImageUrl(),
            category: this.getDepartment().toLowerCase()

        }
    }

    static generateUpdatedProductPayload() {
        const payload = this.generateProductPayload()
        payload.title = `updated ${payload.title}`
        return payload;
    }

    static generateUserPayload() {
        return {
            email: this.getEmail(),
            username: this.getUsername(),
            password: this.getPassword(),
            name: {
                firstName: this.getFirstName(),
                lastName: this.getLastName()
            },
            address: {
                city: this.getCity(),
                street: this.getStreet(),
                number: this.getNumber(),
                zipCode: this.getZipCode(),
                lati: this.getLatitude(),
                longi: this.getLongitude()
            },
            phone: this.getPhoneNumber()
        }
    }

    static generateUserUpdatePayload() {
        let payload = this.generateUserPayload();
        payload.username = `updated ${payload.username}`
        return payload;
    }

    static generateCartPayload(userId: number) {
        return {
            userId,
            date: this.getCurrentDate(),
            products: {
                productId: this.getNumber(),
                quantity: this.getNumber()
            }
        }
    }

    static generateUpdatedCartPayload(userId: number) {
        return {
            userId,
            date: this.getCurrentDate(),
            products: {
                productId: this.getNumber(),
                quantity: this.getNumber()
            }
        }
    }

}