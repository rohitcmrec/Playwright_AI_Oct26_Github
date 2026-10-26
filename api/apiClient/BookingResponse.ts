import { BookingRequest } from "./BookingRequest";

export interface BookingResponse {
    bookingid: number,
    booking: BookingRequest
}