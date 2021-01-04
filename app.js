// setting new instance of atm. 
let atm = new Atm();
// Atm object. 
function Atm(){
  // using let so accounts is not accessesable outside the atm.
  let accounts = [];
  // need to have the accounts on memory
  let data = JSON.parse(localStorage.getItem("accounts"));
  // this is to deal with an error that can be caused if accounts if null
  if(data != null){
    data.forEach(account=>{
      accounts.push(account);
    });
  }
  // currentAccount has to be empty when the page is loaded. 
  this.currentAccount = {};
  // need later on for validating if account already exist. 
  this.account = {exist:false, index:null};
  // need new account
  this.createAccount= function(){
    let newPin = document.getElementById("newAccPin").value
    this.account.exist = false;
    this.validate(newPin);
    // pin cannot be empty
    if(accounts.length == 0){
      this.currentAccount = new Account(newPin);
      this.updateLocalStor();
      this.balanceTab();

    }
    // every pin must be unique
    else if(this.account.exist){
      this.displayMgs("msgBox","Invalid Pin")
    }
    else if(this.account.exist == false){
      this.currentAccount = new Account(newPin);
      this.clearMsg("msgBox");
      this.updateLocalStor();
      this.balanceTab();
    }
  }
  //loging in 
  this.getAccount= function(){
    this.account.exist = false;
    let pin = document.getElementById("pinPut").value
    this.validate(pin);
    console.log(atm.account.exist);
    if(isNaN(parseInt(pin))){
        atm.displayMgs("msgBox", "Invalid Pin!");
      }
    else if(this.account.exist){
      let location = this.account.index;
      //work around, because JSON.strigify strips all the methods, so this adds them back. 
      this.currentAccount = new Account(accounts[location].pin, accounts[location].balance);
      this.clearMsg("msgBox");
      this.balanceTab()
    }
    else if(this.account.exist == false){
      this.displayMgs("msgBox", "Invalid Pin");
    }
  }
  // need to check if account already exist, will also track the location if it exists. 
  this.validate = function(pin){
    console.log(accounts)
    for(let [index, account] of accounts.entries()){
      console.log(account.pin, index)
      if(pin == account.pin){
        atm.account.exist = true;
        atm.account.index = index;
        return;
      }
    }
  }
  // need to store changes in localStorage
  this.updateLocalStor = function() {
    accounts = accounts.filter( el => el.pin !== atm.currentAccount.pin );
    accounts.push(this.currentAccount);
    vlue = JSON.stringify(accounts);
    localStorage.removeItem("accounts");
    localStorage.setItem("accounts", vlue);
  }
   // hide different elements to have tab like feature with bottons.
  this.hide = function() {
    let arg = Array.from(arguments);
    arg.forEach(arguemnt =>{
      document.getElementById(arguemnt).style = "display:none";
    });
  }
  // show different elements to have tab like feature with bottons.
  this.show = function(){
    let arg = Array.from(arguments);
    arg.forEach(arguemnt =>{
      document.getElementById(arguemnt).style = "display:block";
    });
  }
  this.clearInput= function(id) {
    document.getElementById(id).value = "";
  };
  this.displayMgs = function(id, msg) {
    document.getElementById(id).innerHTML = msg;
  }
  this.balanceTab= function(){
    this.hide("login","depositWithdrawal");
    this.show("balanceDis","navbar");
    this.displayMgs("title", "")
    this.clearMsg("msgBox")
    this.displayMgs("balanceAmount", `$${this.currentAccount.getBalance()}`)
  }
  // to clear message when chaning tabs.
  this.clearMsg = function(id) {
    document.getElementById(id).innerHTML = "";
  };
}
//class that is a template for each account
class Account{
  constructor(pin, balance = 0){
    this.pin = pin;
    this.balance = balance;
  }
  getBalance(){
    atm.clearInput("value");
    return this.balance;
  }
  deposit(){
    let amount = document.getElementById("value").value;
    document.getElementById("msgBox").style = "color:red"
    amount = parseInt(amount)
    if(isNaN(amount)){
      atm.displayMgs("msgBox", "Enter Numbers only")
    }
   if(amount < 0 ){
      atm.displayMgs("msgBox", "Amout cannot be less then 0")
    }
    else{
      this.balance += amount;
      atm.displayMgs("msgBox", `Your new balance is: $${this.balance}`)
      document.getElementById("msgBox").style = "color:#1e2749"
      atm.updateLocalStor(); 
      atm.clearInput("value");
    } 
  }
  withdrawal(){
    let amount = document.getElementById("value").value;
    document.getElementById("msgBox").style = "color:red"
    amount = parseInt(amount)
    if(isNaN(amount)){
      atm.displayMgs("msgBox", "Enter Numbers only")
    }
    else if(amount < 0 ){
      atm.displayMgs("msgBox", "Amout cannot be less then 0")
    }
    else if(amount > this.balance){
      atm.displayMgs("msgBox", "insufficent funds for this transaction")
    }
    else{
      this.balance -= parseInt(amount);
      atm.displayMgs("msgBox", `Your new balance is: $${this.balance}`)
      document.getElementById("msgBox").style = "color:#1e2749"
      atm.updateLocalStor();
      atm.clearInput("value");
    } 
  }
  changePin(){
    atm.account.exist = false;
    let pin = document.getElementById("value").value;
    document.getElementById("msgBox").style = "color:red"
    atm.validate(pin)
    if(isNaN(parseInt(pin))){
      atm.displayMgs("msgBox", "Pin can only be numbers");
    }
    else if(atm.account.exist){
      atm.displayMgs("msgBox", "invalid Pin!");
    }
    else if(atm.account.exist == false){
      atm.updateLocalStor();
      this.pin = pin
      atm.displayMgs("msgBox", `Your New Pin is: ${this.pin}`);
      document.getElementById("msgBox").style = "color:#1e2749"
      atm.updateLocalStor();
    }
  }
}
//change current tab
function ActiveTab(){
  let buttonGroup = document.getElementById("accountMenu");
  let buttons = buttonGroup.getElementsByClassName("btn");
  //current tab is shaded in different color.
  for(i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
      let current = buttonGroup.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      let currentTab = this.value;
      switch(currentTab){
        case '0':{
          atm.balanceTab();
          break;
        }
        case '1':{
          // sets the tab for deposit.
          atm.hide("login","balanceDis","withdrawalButton", "changePinButton");
          atm.show("depositButton","accountMenu","depositWithdrawal");
          atm.displayMgs("title", "Deposit");
          atm.clearMsg("msgBox");
          atm.clearInput("value");
          atm.displayMgs("label", "Enter Amount");
          break;
        }
        case '2':{
          // sets the tab for withdrawal.
          atm.hide("login", "balanceDis","changePinButton","depositButton");
          atm.show("depositWithdrawal","accountMenu", "withdrawalButton");
          atm.show("msgBox");
          atm.displayMgs("title", "Withdrawal");
          atm.clearMsg("msgBox");
          atm.clearInput("value");
          atm.displayMgs("label", "Enter Amount");
          break;
        }
        case '3':{
          // sets the tab for changing pin.
          atm.hide("login","balanceDis","depositButton","withdrawalButton");
          atm.show("depositWithdrawal","accountMenu", "changePinButton");
          atm.displayMgs("title", "Change Pin");
          atm.clearMsg("msgBox");
          atm.clearInput("value");
          atm.displayMgs("label", "Enter New Pin");
          break;
        }
        case '4':{
          // so that evrything resets and will take back to login page. 
          location.reload()
          break;
        }
      }
    });
  }
}
ActiveTab();
