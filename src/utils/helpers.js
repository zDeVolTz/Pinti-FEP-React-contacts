import { NAMEFORMATS,SURNAMEFORMATS} from "./common";

export function formatPhoneNumber(phoneNumber) {
        
    const cleanedPhoneNum = phoneNumber.replace(/\D/g, '');
    const length = cleanedPhoneNum.length;
    let regex, format;

    if (length === 10) {
        regex = /^(\d{3})(\d{3})(\d{4})$/;
        format = '$1-$2-$3'
    } else if (length === 11) {
        regex = /^(\d{1})(\d{3})(\d{3})(\d{4})$/;
        format = '$1-$2-$3-$4'
    } else {
        return phoneNumber;
    }

    return cleanedPhoneNum.replace(regex, format);
}

export function formatName(fullName) {
    const nameParts = deleteNamePrefix(fullName).split(' ');
    return nameParts[0];
}

export function formatSurname(fullName) {
    const nameParts = fullName.split(' ');
    if(checkSurnameSuffix(fullName)) {
        return nameParts.slice(-2).join(' ');
    } 
    return nameParts[nameParts.length - 1];
}

function deleteNamePrefix(name) {
    const prefixes = NAMEFORMATS.englishTitles;
    let resultName = name;

    for (let prefix of prefixes) {
        if (resultName.startsWith(prefix)) {
            resultName = resultName.replace(prefix, '').trim();
        }
    }
    return resultName;
}

function checkSurnameSuffix(surname) {
    const suffixes = SURNAMEFORMATS.icelandicEnd;

    for (let suffix of suffixes) {
        if (surname.includes(suffix)) {
            return true;
        }
    }
    return false;
}