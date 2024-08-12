import { isIPv4Address } from "./utils/isIPv4Address";

const testAddresses =   [
                            '192.168.1.1',
                            '255.255.255.255',
                            '0.0.0.0',
                            '256.256.256.256',
                            '192.168.1.1.1',
                            'abc.def.ghi.jkl'
                        ];

testAddresses.forEach(address => {
    console.log(`${address} is ${isIPv4Address(address) ? 'a VALID' : 'an INVALID'} IPv4 address.`);
});