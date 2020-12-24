let atm = new Atm();
function Atm(){
  let accounts = [];
  accounts = JSON.parse(localStorage.getItem("accounts"))
  this.currentAccount = {};
  // need new account
  this.createAccount= function(pin){
    if(accounts == null){
        this.currentAccount = new Account(pin)
        console.log(`current balance is: $${this.currentAccount.getBalance()}`);
        accounts.push(this.currentAccount);
        localStorage.removeItem("accounts");
        localStorage.setItem("accounts",JSON.stringify(this.accounts));
        return this.currentAccount
    }
    else{
      accounts.forEach(account => {
        // check for the pin.
        if(account.pin == pin){
          return this.currentAccount = null
        }
        this.currentAccount = new Account(pin)
        console.log(`current balance is: $${this.currentAccount.getBalance()}`);
        accounts.push(this.currentAccount);
        localStorage.removeItem("accounts");
        localStorage.setItem("accounts",JSON.stringify(this.accounts));
        return this.currentAccount
      });
    }
  }
  //when loging in function. 
  this.getAccount= function(pin){
    if(accounts == null){
      console.log(null)
      return this.currentAccount = null
    }
    else{
      accounts.forEach(account => {
        // check for the pin.
        if(account.pin == pin){
          console.log(account.pin)
          // so that methods will be reasigned.
          this.currentAccount = new Account(account.pin, account.balance);
          return this.currentAccount;
        }
        return this.currentAccount = null
      });
    }

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
  //clear input
  this.clearInput= function(id) {
    document.getElementById(id).value = "";
  };
  // display alter message
  this.displayMgs = function(id, msg) {
    document.getElementById(id).innerHTML = msg;
  }
  this.balanceTab= function(){
    this.displayMgs("balanceAmount", `$${this.currentAccount.getBalance()}`)
  }
  // clear  message
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
    return this.balance;
  }
}
//change current tab
function ActiveTab(){
  let buttonGroup = document.getElementById("accountMenu");
  let buttons = buttonGroup.getElementsByClassName("btn");
  //current tab is shaded in different color.
  for(i = 0; i < buttons.length; i++){
      buttons[i].addEventListener("click", function(){
          console.log(this)
          let current = buttonGroup.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
          if (this == document.getElementById("balance")){
            atm.hide("login","depositWithdrawal");
            atm.show("balanceDis","accountMenu");
            atm.displayMgs("title", "")
            atm.clearMsg("msgBox")
            let submit = document.getElementById("depWithChan");
            submit.addEventListener("click", function(){
            });
          }
          else if (this == document.getElementById("withdraw")){
            atm.hide("login", "balanceDis");
            atm.show("depositWithdrawal","accountMenu");
            atm.show("msgBox");
            atm.displayMgs("title", "Withdrawal");
            atm.clearMsg("msgBox");
            atm.displayMgs("label", "Enter Amount");
            let submit = document.getElementById("depWithChan");
            submit.addEventListener("click", function(){
            });
          }
          else if (this == document.getElementById("deposit")){
            atm.hide("login","balanceDis");
            atm.show("accountMenu","depositWithdrawal");
            atm.displayMgs("title", "Deposit");
            atm.clearMsg("msgBox");
            atm.displayMgs("label", "Enter Amount");
            let submit = document.getElementById("depWithChan");
            submit.addEventListener("click", function(){
            });
          }
          else if (this == document.getElementById("changePin")){
            atm.hide("login","balanceDis");
            atm.show("depositWithdrawal","accountMenu");
            atm.displayMgs("title", "Change Pin");
            atm.clearMsg("msgBox");
            atm.displayMgs("label", "Enter New Pin");
            let submit = document.getElementById("depWithChan");
            submit.addEventListener("click", function(){
            });
          }
          else if (this == document.getElementById("logout")){
            location.reload()
          }
    });
  }
}
function loginCreateAccount(){
  let loginContent = document.getElementById("login");
  console.log(loginContent)
  let submitButtons = loginContent.getElementsByClassName("btn")
  let submitPin = document.getElementById("submitPin")
  for(i = 0; i < submitButtons.length; i++){
    console.log(submitButtons[i])
    console.log(atm.currentAccount)
    submitButtons[i].addEventListener("click", function(){
      if(this == submitPin){
        console.log(this)
        let pin = document.getElementById("pinPut").value
        console.log(typeof pin)
        atm.getAccount(pin)
        if(atm.currentAccount != null){
          atm.show("navbar", "balanceDis")
          atm.hide("login", "depositWithdrawal")
          atm.displayMgs("balanceAmount",`$${atm.currentAccount.getBalance()}`)
        }
        else{
          atm.displayMgs("msgBox", "invalid Pin!")
        }
      }
      else{
        console.log(this)
        let newPin = document.getElementById("newAccPin").value
        if(isNaN(parseInt(newPin))){
          atm.displayMgs("msgBox",`Pin most be numbers only`);
        }
        else{
          atm.createAccount(newPin);
          if(atm.currentAccount == null){
            atm.show("navbar", "balanceDis")
            atm.hide("login", "depositWithdrawal")
            atm.displayMgs("balanceAmount",`$${atm.currentAccount.getBalance()}`);
          }
          else{
            atm.displayMgs("msgBox", "Pin Already Exist!")
          }
        }
      }
    });
  }
}
loginCreateAccount()
ActiveTab()
