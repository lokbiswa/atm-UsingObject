/* This are the html id
      #login - form for login section.
      #msgBox - display alert messages. 
      #pinPut - input to login.
      #newAccPin - create account pin.
      #depositWithdrawal - form for deposit and withdraw section. 
      #title - to title the section for Deposit, WIthdraw, and change Pin.  
      #amount - input for deposit and withdraw.
      #withdrawal - botton to withdraw. 
      #deposit - botton to deposit. 
      #changePin - form for change pin section.
      #newPin - input for pin change.
      #accountMenu - button group to navigate account. */

let atm = new Atm()

function Atm(){
  let accounts=[];
  let currentAccount = {};
  let accountExist = { exist:false };
  // loading from localStorage in to accounts
  // login
  this.login = function(pin){
    if(localStorage.accounts != null ){
      accounts = JSON.parse(localStorage.accounts)
    };
    validate(pin)
    console.log(accountExist.exist)
    if(accountExist.exist){
      accounts.forEach(account => {
        if (account.pin == pin){
          this.currentAccount = account;
          this.balanceTab();
        }      
      });
    }
    else{
      this.displayMgs("msgBox", "Invalid Pin Try again")
    }
  }
  //create new account pin.
  this.createAccount = function(newPin) {
    validate(newPin)
    console.log(accountExist.exist)
    // new pin has to be unique from current pins and other saved pins
    if(accountExist.exist){
      this.displayMgs("msgBox", "Invalid pin! Account Already Exist")
    }
    // pin can only be numbers
    else if(isNaN(parseInt(newPin))){
      this.displayMgs("msgBox", "Invalid pin")
    }
    else{
      let account = new Account(newPin)
      this.currentAccount = account;
      accounts.push(account);
      localStorage.removeItem("accounts");
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  };
  //Template for an account.
  function Account(pin){
    this.pin = pin;
    this.blance = 0;
    // account methods
    this.getBalance = ()=>{
      return this.balance
    }

  }
  // check is if pin is in account.
  function validate(pin){
    console.log(pin)
    accounts.forEach(account =>{
      // console.log(account.pin)
      if(pin == account.pin){
        accountExist.exist = true;
        console.log(accountExist.exist);
        return; 
      }
      accountExist.exist = false;
      console.log(accountExist.exist); 
    });
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
  this.clear= function(id) {
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
            atm.clear("msgBox");
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
  let submitNewPin = document.getElementById("submitNewPin")
  for(i = 0; i < submitButtons.length; i++){
    console.log(submitButtons[i])
    submitButtons[i].addEventListener("click", function(){
      if(this == submitPin){
        console.log(this)
        let pin = document.getElementById("pinPut").value
        atm.login(pin)
      }
      else{
        console.log(this)
        let newPin = document.getElementById("newAccPin").value
        atm.createAccount(newPin)
      }
    });
  }
}
loginCreateAccount()
ActiveTab()
