
const otpStore = {};

const sellerStore = {};

const verifiedPhoneNumbers = {};

const attempsMap = new Map();

const MAX_ATTEMPTS = 3;

function storeOtp(phoneNumber, otp){
    otpStore[phoneNumber] = otp

    setTimeout(() => delete otpStore[phoneNumber], 5 * 60 * 1000 );

    attempsMap.set(phoneNumber,0);
}

function getOtp(phoneNumber){

    return otpStore[phoneNumber];
}


function storeSeller(phoneNumber, seller){

    sellerStore[phoneNumber] = seller;

}

function getSeller(phoneNumber){

    return sellerStore[phoneNumber] 
}

function incrementAttempts(phoneNumber){
    const attempts = attempsMap.get(phoneNumber) || 0;
    attempsMap.set(phoneNumber, attempts + 1);

    return attempts + 1;
}

function getAttempts(phoneNumber){
   return attempsMap.get(phoneNumber) || 0;
}

function deleteOtp(phoneNumber) {
    delete otpStore[phoneNumber]
}


function deleteSeller(phoneNumber){

    delete sellerStore[phoneNumber]
}

function storeVerifiedPhoneNumber(phoneNumber){
    return verifiedPhoneNumbers[phoneNumber] = true
}


function getVerifiedPhoneNumber(phoneNumber){
    return verifiedPhoneNumbers[phoneNumber];
}


function deleteVerifiedPhoneNumber(phoneNumber){
    delete verifiedPhoneNumbers[phoneNumber]
}

module.exports = {
    storeOtp,
    getOtp,
    storeSeller,
    getSeller,
    getAttempts,
    incrementAttempts,
    deleteOtp,
    deleteSeller,
    storeVerifiedPhoneNumber,
    getVerifiedPhoneNumber,
    deleteVerifiedPhoneNumber
    
}

