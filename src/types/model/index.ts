export type UserType = {
    "id": number,
    "avatar": null | any,
    "username": string,
    "phone": string,
    "email": string,
    "firstName": string,
    "lastName": string,
    "role": string,
    "student": null | any,
    "teacher": null | any,
    "access_token": string,
    "refresh_token": string,
    "isActive": string,
    "createdAt": string,
    "updatedAt": string,
}

export type ItemsType = {
    "id": number,
    "createdAt": string,
    "updatedAt": string,
    "title": string,
    "title_kg": string
}


export type RatesType = {
    "id": number,
    "title": string,
    "title_kg": string,
    "description": string,
    "description_kg": string,
    "content": string,
    "content_kg": string,
    "attributes": number[],
    "monthlyPrice": number,
    "annualPrice": number,
    "amountOfPublicTests": number,
    "amountOfHiddenTests": number,
    "isPublished": boolean,
    "createdAt": string,
    "updatedAt": string,
}



export type RegionsType = {
    "id": number,
    "title": string,
    "title_kg": string,
    "createdAt": string,
    "updatedAt": string,
}


export type CitiesType = {
    "id": number,
    "title": string,
    "title_kg": string,
    "region": RegionsType,
    "createdAt": string,
    "updatedAt": string,
}