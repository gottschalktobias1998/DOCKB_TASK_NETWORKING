import { isIPv4Address } from "./isIPv4Address";
import { binaryToIp } from "./binaryToIp";
import { ipToBinary } from "./ipToBinary";

export function ipv4_info(ipAddress: string, subnetMask: string): void {
    if (!isIPv4Address(ipAddress)) {
        console.log('Ungültige IP-Adresse.');
        return;
    }

    let maskInBits: number;
    let subnetMaskBinary: number;
    
    // Prüfen, ob die Subnetzmaske in CIDR-Notation oder Dot-decimal Notation vorliegt
    if (subnetMask.startsWith('/')) {
        maskInBits = parseInt(subnetMask.substring(1), 10);
        if (isNaN(maskInBits) || maskInBits < 0 || maskInBits > 32) {
            console.log('Ungültige CIDR-Notation.');
            return;
        }
        subnetMaskBinary = ~(0xFFFFFFFF >> maskInBits) >>> 0;
    } else if (isIPv4Address(subnetMask)) {
        subnetMaskBinary = ipToBinary(subnetMask);
        maskInBits = countSetBits(subnetMaskBinary);
    } else {
        console.log('Ungültige Subnetzmaske.');
        return;
    }

    const ipBinary = ipToBinary(ipAddress);
    const subnetBinary = ipBinary & subnetMaskBinary;
    const broadcastBinary = subnetBinary | (~subnetMaskBinary >>> 0);
    
    const firstAddress = binaryToIp(subnetBinary);
    const lastAddress = binaryToIp(broadcastBinary);
    const addressCount = 2 ** (32 - maskInBits);

    console.log(`Subnetzadresse: ${firstAddress}`);
    console.log(`Broadcast-Adresse: ${lastAddress}`);
    console.log(`Anzahl der Adressen: ${addressCount}`);
}

function countSetBits(num: number): number {
    let count = 0;
    while (num) {
        count += num & 1;
        num >>>= 1;
    }
    return count;
}
