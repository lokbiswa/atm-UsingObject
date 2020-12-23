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
  // loading from localStorage in to accounts
  if(localStorage.accounts != null ){
    accounts = JSON.parse(localStorage.accounts)
  };
  //create new account pin.
  this.createAccount = function(newPin) {
    let accountExist = false;
    validate();
    // new pin has to be unique from current pins and other saved pins
    if(accountExist){
      this.displayMgs("msgBox", "Invalid pin! Account Already Exist")
    }
    // input cannot be empty
    else if(newPin.length = 0){
      this.displayMgs("msgBox", "Please input your pin")
    }
    // pin can only be numbers
    else if(isNaN(newPin)){
      this.displayMgs("msgBox", "Invalid pin please input number only.")
    }
    else{
      let account = new Account(newPin)
      currentAccount = account;
      accounts.push(account);
    }
  };
  //Template for an account.
  function Account(pin){
    this.pin = pin;
    this.blance = 0;
  }
  // check is if pin is in account.
  function validate(){
    accounts.forEach((account, index) =>{
      if(newPin in account){
        accountExist = true;
      }
    })
  }
  // hide different elements to have tab like feature with bottons.
  this.hide = function(id) {
    document.getElementById(id).style = "display:none";
  };
  // show different elements to have tab like feature with bottons.
  this.show = function(id) {
    document.getElementById(id).style = "display:block";
  }; 
  //clear input
  this.clear= function(id) {
    document.getElementById(id).value = "";
  };
  // display alter message
  this.displayMgs = function(id, msg) {
    document.getElementById(id).innerHTML = msg;
  }
  // clear  message
  this.clearMsg = function(id) {
    document.getElementById(id).innerHTML = "";
  };
}

//change current tab
function ActiveTab(){
  let buttonGroup = document.getElementById("accountMenu");
  let buttons = buttonGroup.getElementsByClassName("btn-outline-dark");
  let button =  document.getElementById("login");
  //current tab is shaded in different color.
  for(i = 0; i < buttons.length; i++){
      buttons[i].addEventListener("click", function(){
          let current = buttonGroup.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
          console.log(this)
          if (this == document.getElementById("balance")){
            atm.hide("login");
            atm.hide("depositWithdrawal");
            atm.show("balanceDis");
            atm.show("accountMenu");
            atm.displayMgs("title", "")
            atm.clearMsg("msgBox")
          }
          else if (this == document.getElementById("withdraw")){
            atm.hide("login");
            atm.show("depositWithdrawal");
            atm.hide("balanceDis");
            atm.show("accountMenu");
            atm.displayMgs("title", "Withdrawal")
            atm.clearMsg("msgBox")
            atm.displayMgs("label", "Enter Amount")
          }
          else if (this == document.getElementById("deposit")){
            atm.hide("login");
            atm.show("depositWithdrawal");
            atm.hide("balanceDis");
            atm.show("accountMenu");
            atm.displayMgs("title", "Deposit")
            atm.clearMsg("msgBox")
            atm.displayMgs("label", "Enter Amount")
          }
          else if (this == document.getElementById("changePin")){
            atm.hide("login");
            atm.show("depositWithdrawal");
            atm.hide("balanceDis");
            atm.show("accountMenu");
            atm.displayMgs("title", "Change Pin")
            atm.clear("msgBox")
            atm.displayMgs("label", "Enter New Pin")
          }
          else if (this == document.getElementById("logout")){
            location.reload()
          }
    });
  }
}
ActiveTab()