import MicroRaiden from './uraiden';
const uraidenServerUrl = 'http://127.0.0.1:5000';
const rdn = new MicroRaiden(uraidenServerUrl);
rdn.openChannel("0x9765E2D8467334198b402e4D4551Dd49e63327Ec", 1);
// rdn.topUpChannel("0x9765E2D8467334198b402e4D4551Dd49e63327Ec",4966727,1);
// rdn.signBalance("0x9765E2D8467334198b402e4D4551Dd49e63327Ec", 4928721 , 1);
// rdn.closeChannel("0x9765E2D8467334198b402e4D4551Dd49e63327Ec", 4966708 , 0);
// rdn.settleChannel("0x9765E2D8467334198b402e4D4551Dd49e63327Ec", 4966697 , 0);

// uraiden.contract.allEvents('', function (error, log) {
//   console.log(log);
// });
// token.contract.allEvents('', function (error, log) {
//   console.log(log);
// });