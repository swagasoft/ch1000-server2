const express = require('express');
const router = express.Router();

const controlUser = require('../controller/user.controller');
const contactController = require('../controller/server-control');
controlTranx = require('../controller/control_trans');
adminController = require('../controller/admin-controller');
accountController = require('../controller/account-controller');
levelController = require('../controller/level-controller');
jwt_helper = require('../config/jwt_helper');



router.post('/register', controlUser.register);
router.get('/contact',  contactController.homePage);
router.post('/contact',  contactController.submitForm);
router.post('/authenticate', controlUser.authenticate);
router.get('/dashboard',jwt_helper.verifyJwtToken ,controlUser.userDashboard);
router.get('/edit_account',jwt_helper.verifyJwtToken ,controlUser.editAccount);
router.post('/transaction',jwt_helper.verifyJwtToken ,controlTranx.transaction);
router.get('/investment_create',jwt_helper.verifyJwtToken ,controlTranx.investmentCreate);
router.get('/admin-dashboard',jwt_helper.verifyJwtToken ,adminController.adminDashboard );
router.get('/get-investors',jwt_helper.verifyJwtToken ,adminController.getInvestors );
router.get('/load-balance',jwt_helper.verifyJwtToken , accountController.loadBalance );
router.get('/post-user-cashout:value',jwt_helper.verifyJwtToken , accountController.processCashout );
router.get('/payout-user:values', jwt_helper.verifyJwtToken ,controlTranx.payOutUser )
router.get('/users-cashout',jwt_helper.verifyJwtToken , accountController.usersCashout);
router.get('/get-transactions',jwt_helper.verifyJwtToken ,accountController.getTransactions );
router.get('/level-one-users',jwt_helper.verifyJwtToken , adminController.level1Users );
router.get('/level-two-users',jwt_helper.verifyJwtToken ,adminController.level2Users );
router.get('/level-three-users',jwt_helper.verifyJwtToken ,adminController.level3Users );
router.get('/level-four-users',jwt_helper.verifyJwtToken  ,adminController.level4Users );
router.get('/post-user-level2:id',jwt_helper.verifyJwtToken ,levelController.postUserToLevel2 );
router.get('/post-user-level3:id',jwt_helper.verifyJwtToken ,levelController.postUserToLevel3 );
router.get('/post-user-level4:id',jwt_helper.verifyJwtToken ,levelController.postUserToLevel4 );
router.get('/get-inactive-users', jwt_helper.verifyJwtToken,adminController.getInactiveUsers );
router.get('/delete-user:id', jwt_helper.verifyJwtToken , adminController.deleteUser);
router.get('/delete-transactions:id', jwt_helper.verifyJwtToken, adminController.deleteTrans);
router.get('/get-transanctions', jwt_helper.verifyJwtToken, adminController.readAllTransactions);
router.get('/query-user-details:user', jwt_helper.verifyJwtToken, adminController.queryUser);
router.get('/get-recent-payouts', jwt_helper.verifyJwtToken, controlTranx.getCurrentPayouts);
router.get('/get-high-ranked', jwt_helper.verifyJwtToken, controlTranx.getHighRanked);
router.get('/', controlUser.index);

function testRoute(){
    console.log('   ROUTE TESTING SUCCESSFUL..');
    next();
}
module.exports = router;
