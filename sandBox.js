let atm = new Atm();
function Atm(){
  this.accounts = [];
  this.currentAccount = {};
  this.createAccount= function(pin){
    this.currentAccount = new Account(pin)
    console.log(`current balance is: $${this.currentAccount.getBalance()}`);
    this.accounts.push(this.currentAccount);
    localStorage.setItem("account",JSON.stringify(this.accounts))
  }
}
//class that is a template for each account
class Account{
  constructor(pin){
    this.pin = pin;
    this.balance = 0;
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
            // atm.hide("login","depositWithdrawal");
            // atm.show("balanceDis","accountMenu");
            // atm.displayMgs("title", "")
            // atm.clearMsg("msgBox")
            let submit = document.getElementById("depWithChan");
            submit.addEventListener("click", function(){
            });
          }
          else if (this == document.getElementById("withdraw")){
            // atm.hide("login", "balanceDis");
            // atm.show("depositWithdrawal","accountMenu");
            // atm.show("msgBox");
            // atm.displayMgs("title", "Withdrawal");
            // atm.clearMsg("msgBox");
            // atm.displayMgs("label", "Enter Amount");
            let submit = document.getElementById("depWithChan");
            submit.addEventListener("click", function(){
            });
          }
          else if (this == document.getElementById("deposit")){
            // atm.hide("login","balanceDis");
            // atm.show("accountMenu","depositWithdrawal");
            // atm.displayMgs("title", "Deposit");
            // atm.clearMsg("msgBox");
            // atm.displayMgs("label", "Enter Amount");
            let submit = document.getElementById("depWithChan");
            submit.addEventListener("click", function(){
            });
          }
          else if (this == document.getElementById("changePin")){
            // atm.hide("login","balanceDis");
            // atm.show("depositWithdrawal","accountMenu");
            // atm.displayMgs("title", "Change Pin");
            // atm.clear("msgBox");
            // atm.displayMgs("label", "Enter New Pin");
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
