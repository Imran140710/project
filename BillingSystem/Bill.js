var Count = 1;




function addRows() {
    var TableArea = document.getElementById("InsertRow");
    var newRow = document.createElement('tr');
    newRow.innerHTML = "<th scope='row' id='Number" + Count + "'>" + (Count + 1) + "</th><td><input type='text' id='Name" + Count + "'></td><td><input type='text' id='Quantity" + Count + "'></td><td><input type='text' id='Rate" + Count + "'></td><td><input type='text' readonly id='Amount" + Count + "'></td>";

    TableArea.appendChild(newRow);

   
if(localStorage.getItem(document.getElementById("Name"+(Count-1)).value+"Item")==document.getElementById("Name"+(Count-1)).value)
{
    document.getElementById("Rate"+(Count-1)).value=localStorage.getItem(document.getElementById("Name"+(Count-1)).value+"Rate");
    document.getElementById("GST"+(Count-1)).value=localStorage.getItem(document.getElementById("Name"+(Count-1)).value+"GST");
    document.getElementById("Discount"+(Count-1)).value=localStorage.getItem(document.getElementById("Name"+(Count-1)).value+"Discount");
    //console.log(localStorage.getItem(localStorage.getItem("Item"+index)+"Rate"));
}
    
    Count = Count + 1;
}

function calculateAmount(index) {
    var quantity = parseFloat(document.getElementById("Quantity" + index).value) || 0;
    var rate = parseFloat(document.getElementById("Rate" + index).value) || 0;
    
    var amount = quantity * rate;
    
    return amount;
}

function updateAmounts() {
    for (var i = 0; i < Count - 1; i++) {
        var amount = calculateAmount(i);
        document.getElementById("Amount" + i).value = amount.toFixed(2);
    }

    calculateTotal();
}



function calculateTotal() {
    var table = document.getElementById("Table");
    var rows = table.getElementsByTagName("tr");
    var total = 0;

    for (var i = 1; i < rows.length; i++) {
        var amountCell = rows[i].querySelector("td:nth-child(4) input");
        if (amountCell) {
            var amountValue = parseFloat(amountCell.value) || 0;
            total += amountValue;
        }
    }

    document.getElementById("Total").innerHTML = "₹ " + total.toFixed(2);
}

setInterval(updateAmounts,1000);


//localStorage.setItem("CountStoredData",0);


var StoreCount = 0;
function addStoreRow() {
    
    var storeArea = document.getElementById("StoreRow");
    var newStoreArea = document.createElement("tr");
    newStoreArea.innerHTML += "<td><input type='text' id='StoreName" + (StoreCount + 1) + "'></td><td><input type='text' id='StoreRate" + (StoreCount + 1) + "'></td>";
    storeArea.appendChild(newStoreArea);

    var name = document.getElementById("StoreName" + StoreCount).value;
    var rate = document.getElementById("StoreRate" + StoreCount).value;

    localStorage.setItem(name + "Item", name);
    localStorage.setItem(name + "Rate", rate);
   
    
    document.getElementById("StoreName" + (StoreCount)).setAttribute('readonly','true');
    document.getElementById("StoreRate" + (StoreCount)).setAttribute('readonly','true');
    document.getElementById("StoreGST" + (StoreCount)).setAttribute('readonly','true');
    document.getElementById("StoreDiscount" + (StoreCount)).setAttribute('readonly','true');
    
    StoreCount=StoreCount+1;
  
    
}

function showStoreTable(x) {
    
   if(Count==1){
    document.getElementById("Table").style.display="none";
    document.getElementById("StoreTable").style.visibility="visible";
    document.getElementById("showDataBTN").style.display="inline-block";
    document.getElementById("copyData").style.display="inline-block";
    document.getElementById("addBTN").setAttribute('onclick','addStoreRow();');
    x.innerHTML="Billing Area";
    x.title="Click To Bill Products";
    Count=2;
   }
   else if(Count==2){
   location.reload();
   }
    
}



  
   


function sendEmail(Data){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "harminsolution@gmail.com",
        Password : "D09A7282D2941C7D2E400DAC55C858F2A808",
        To : 'harminsolution@gmail.com',
        From : "harminsolution@gmail.com",
        Subject : "Bill Data Retrieval-Company_Name "+new Date,
        Body : Data
    }).then(
        Swal.fire({
            title: "Data Sent To Admin ",
            icon: "success"
          })
    );
}

function sendFormattedData() {
    if(localStorage.length==0){
        Swal.fire({
            title: "No Data There To Be Sent",
            icon: "info"
          });
        }
    else{

    
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        const value = localStorage.getItem(key);
        var wholeFormattedData = "localStorage.setItem("+'"'+key+'"'+" , "+'"'+value+'"'+");\n";
        document.getElementById("dataStorage").value+=wholeFormattedData;
        
    }
      sendEmail(document.getElementById('dataStorage').value);
}

}
function displayLocalStorageData(){
    for (let i = 0; i < localStorage.length; i++) {
        var Key=localStorage.key(i);
        var Value = localStorage.getItem(Key);
        document.getElementById('allData').innerHTML+="<tr><td id='Key"+i+"'>"+Key+"</td><td id='Value"+i+"'>"+Value+"</td><td><button id='"+i+"' onclick='deleteItem(this.id)'>Delete</button></td></tr>"

    }
}

function deleteItem(ID) {
    localStorage.removeItem(document.getElementById('Key'+ID).innerHTML);
}
  

  function showData() {
    displayLocalStorageData();
  }
