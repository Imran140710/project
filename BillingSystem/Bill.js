let Count = 1;
let ToggleCount = 1;
var JSON_Data;

function addRows() {
    const TableArea = $("#InsertRow");
    const newRow = $("<tr>").html(`<th scope='row' id='Number${Count}'>${TableArea[0].rows.length + 1}</th><td><input type='text' id='Name${Count}'></td><td><input type='text' id='Quantity${Count}'></td><td><input type='text' id='Rate${Count}'></td><td><input type='text' readonly id='Amount${Count}'></td>`);

    TableArea.append(newRow);

    if (localStorage.getItem($(`#Name${Count - 1}`).val() + "Item") === $(`#Name${Count - 1}`).val()) {
        $(`#Rate${Count - 1}`).val(localStorage.getItem($(`#Name${Count - 1}`).val() + "Rate"));
    }
   
    Count++;
}

function calculateAmount(index) {
    const quantity = parseFloat($(`#Quantity${index}`).val()) || 0;
    const rate = parseFloat($(`#Rate${index}`).val()) || 0;

    const amount = quantity * rate;

    return amount;
}

function updateAmounts() {
    for (let i = 0; i < Count - 1; i++) {
        const amount = calculateAmount(i);
        $(`#Amount${i}`).val(amount.toFixed(2));
    }

    calculateTotal();
}

function calculateTotal() {
    let total = 0;
    const rows = $("#Table tbody tr");

    rows.each(function(index) {
        const quantity = parseFloat($(this).find(`#Quantity${index}`).val()) || 0;
        const rate = parseFloat($(this).find(`#Rate${index}`).val()) || 0;
        const amount = quantity * rate;
        total += amount;
    });

    $("#Total").html(`₹ ${total.toFixed(2)}`);
}
setInterval(updateAmounts, 2500);

let StoreCount = 0;
function addStoreRow() {
    const storeArea = $("#StoreRow");
    const newStoreArea = $("<tr>").html(`<td><input type='text' id='StoreName${StoreCount + 1}'></td><td><input type='text' id='StoreRate${StoreCount + 1}'></td>`);
    storeArea.append(newStoreArea);

    var name = $(`#StoreName${StoreCount}`).val();
    var rate = $(`#StoreRate${StoreCount}`).val();

    localStorage.setItem(name + "Item", name);
    localStorage.setItem(name + "Rate", rate);

    $("#allData").html('');
    $(`#StoreName${StoreCount}`).prop('readonly', true);
    $(`#StoreRate${StoreCount}`).prop('readonly', true);

    StoreCount++;
}

function showStoreTable(x) {
    if (ToggleCount === 1) {
        $("#Table").hide();
        $("#StoreTable").css("visibility", "visible");
        $("#storeAddBTN").css("display","block");
      
        x.innerHTML = "Billing Area";
        x.title = "Click To Bill Products";
        ToggleCount = 2;
    } else if (ToggleCount === 2) {
        location.reload();
    }
}

function sendEmail(Data) {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "harminsolution@gmail.com",
        Password: "D09A7282D2941C7D2E400DAC55C858F2A808",
        To: 'harminsolution@gmail.com',
        From: "harminsolution@gmail.com",
        Subject: "Bill Data Retrieval-Company_Name " + new Date,
        Body: Data
    }).then(
        Swal.fire({
            title: "Data Sent To Admin ",
            icon: "success"
        })
    );
}

function sendFormattedData() {
    if (localStorage.length === 0) {
        Swal.fire({
            title: "No Data There To Be Sent",
            icon: "info"
        });
    } else {
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index);
            const value = localStorage.getItem(key);
            const wholeFormattedData = `localStorage.setItem("${key}" , "${value}");\n`;
            $("#dataStorage").val($("#dataStorage").val() + wholeFormattedData);
        }
        sendEmail($("#dataStorage").val());
    }
}

function displayLocalStorageData() {
    const keys = Object.keys(localStorage).sort();
    if (localStorage.length === 0) {
        Swal.fire({
            title: "No Data There To Be Shown",
            icon: "info"
        });
    } else {
        for (let i = 0; i < keys.length; i++) {
            const Key = keys[i];
            const Value = localStorage.getItem(Key);
            $("#allData").append(`<tr id='Row${i}'><td id='Key${i}'>${Key}</td><td id='Value${i}'>${Value}</td><td><button id='${i}' onclick='deleteItem(this.id)'>Delete</button></td></tr>`);
            $("#allData").css("visibility", "visible");
        }
    }
}

function deleteItem(ID) {
    localStorage.removeItem($(`#Key${ID}`).html());
    $(`#Row${ID}`).hide();
}

function showData() {
    const table = $("#Table");
    const storeTable = $("#StoreTable");

    if (ToggleCount === 1) {
        Swal.fire({
            title: "Go To Store Data Area",
            icon: "info"
        });
    } else if (ToggleCount === 2) {
        displayLocalStorageData();
    }
}

function convertJSON() {
    var JSON_Data = []; 

    for (let i = 0; i < Count-1; i++) {
        var Name = $('#Name' + i).val();
        var Rate = $('#Rate' + i).val();
        var Quantity = $('#Quantity' + i).val();
        var Amount = $('#Amount' + i).val();

        var dataObj = {
            Name: Name,
            Rate: Rate,
            Quantity: Quantity,
            Amount: Amount
        };

        JSON_Data.push(dataObj);
    }

    var jsonStr = JSON.stringify(JSON_Data);
    alert(jsonStr);
   
}
