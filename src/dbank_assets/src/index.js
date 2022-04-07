import {dbank} from "../../declarations/dbank";

window.addEventListener("load" , async function() {
  // console.log("Finished loading");
  update()

});

document.querySelector ("form"). addEventListener ("submit" , async function(event){
  event.preventDefault();
  console.log("Submitted");
  
  //event for submission button
  const button = event.target.querySelector("#submit-btn");

    //convert to floating point 
  const inputAmount = parseFloat(document.getElementById ("input-amount").value); 
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  
  button.setAttribute("disabled", true); 

  //condition to prevent nan within topUp field
  if (document.getElementById("input-amount").value.length !=0) {
    await dbank.topUp(inputAmount);
  }

  // condition to prevent nan within withdrawal field
  if (document.getElementById("withdrawal-amount").value.length !=0) {
    await dbank.withdraw(outputAmount);
  }


  update()

  document.getElementById("input-amount").value="";
  document.getElementById("withdrawal-amount").value="";

  await dbank.compound();

  button.removeAttribute("disabled");

});


async function update() {
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) /100; 

}