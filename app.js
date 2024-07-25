const elements = 
{
    whoIsSplittingInput: document.getElementById('people-splittng-bill'),
    addPersonBtn: document.getElementById('add-person-btn'),
    listOfPeopleDiv: document.getElementById('list-of-people-div'),
    whoPaid: document.getElementById('who-paid'),
    addItemBtn: document.getElementById('add-item'),
    itemValue: document.getElementById('item'),
    checkboxDiv: document.getElementById('checkbox-div'),
    priceValue: document.getElementById('price'),
    itemInputSection: document.getElementById('item-input-section'),
    allItemsList: document.getElementById('all-items-list'), 
    resultsList: document.getElementById('results-list'),
    totalElement: document.getElementById('total'),
    selectAllDiv: document.getElementById('select-all-div'),
    checkAll: document.getElementById('check-all'),
    resultsNav: document.getElementById('results-nav'),
    userBtns: document.getElementById('user-btns'),
    itemDiv: document.getElementById('item-div'),
    allUserBtn: document.getElementById('all-user-btn'),
    resultsSection: document.getElementById('results-section')
}

const allUserData = [];
let total = 0; 

const addPersonSplittingBill = () => {
    if (elements.whoIsSplittingInput.value === '') return;

    const name = elements.whoIsSplittingInput.value
    const formattedName = name.toLowerCase();

    const personContainer = document.createElement('div');
    personContainer.classList.add('flex', 'person-container');
    personContainer.setAttribute('id', `${formattedName}`);

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';
    removeBtn.setAttribute('onclick', `removePerson('${formattedName}')`);
    personContainer.appendChild(removeBtn);

    const person = document.createElement('p');
    person.innerText = capitalize(name);
    personContainer.appendChild(person);

    elements.listOfPeopleDiv.appendChild(personContainer);

    allUserData.push({name: formattedName, amountOwed: 0, thingsPurchased: {}})

    elements.whoIsSplittingInput.value = '';

    fillWhoPaidDropDown(formattedName);
    addCheckbox(formattedName);
    createUserBtn(formattedName);

    const singleUserList =  document.createElement('ul');
    singleUserList.setAttribute('id', `${formattedName}-items-list`);
    singleUserList.classList.add('hidden');
    elements.itemDiv.appendChild(singleUserList);
    elements[`${formattedName}ItemsList`] = singleUserList
}

const capitalize = (name) => {
    lowerCaseName = name.toLowerCase()
    nameArray = [...lowerCaseName]; 
    nameArray[0] = nameArray[0].toUpperCase();

    while (nameArray[nameArray.length - 1] === ' ') {
        nameArray.pop()
    }
    
    for (let i = 0; i < nameArray.length; i++) {
        if (nameArray[i] === ' ') {
            nameArray[i+1] = nameArray[i+1].toUpperCase();
        }
    }

    return nameArray.join('');
}

const fillWhoPaidDropDown = (name) => {
    const option = document.createElement('option');
    option.value = name; 
    option.innerText = capitalize(name);
    option.setAttribute('id', `${name}-dropdown`);
    elements.whoPaid.appendChild(option) 
}

const addCheckbox = (name) => {
    if (allUserData.length > 1) {
        elements.selectAllDiv.classList.remove('hidden')
    }

    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('flex');
    checkboxContainer.setAttribute('id', `${name}-checkbox-container`)
    
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox')
    input.setAttribute('id', `${name}-checkbox`);
    input.setAttribute('name', `people-to-split-item`);
    
    const label = document.createElement('label');
    label.innerText = capitalize(name); 
    label.setAttribute('for', `${name}-checkbox`);
    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    elements.checkboxDiv.appendChild(checkboxContainer);
}

const addItemToSingleUserList = (name, item, price) => {
    const listElement = document.createElement('li');
    listElement.classList.add('flex');
    listElement.setAttribute('id', `${name}-${item}`);

    const div = document.createElement('div');
    div.classList.add('flex');

    const itemElement = document.createElement('span');
    itemElement.innerText = capitalize(item);
    div.appendChild(itemElement);

    listElement.appendChild(div);
    
    const priceElement = document.createElement('span');
    priceElement.innerText = price.toFixed(2); 
    listElement.appendChild(priceElement);
    
    elements[`${name.toLowerCase()}ItemsList`].appendChild(listElement);
}

const addItem = () => {
    if (elements.itemValue.value === '' || elements.priceValue.value === '') return;
    if (document.querySelectorAll('#checkbox-div input[type="checkbox"]:checked').length < 1) return; 

    const item = elements.itemValue.value
    const price = elements.priceValue.value

    elements.itemValue.value = '';
    elements.priceValue.value = '';

    peopleSplittingItem = [];

    for (let i = 0; i < allUserData.length; i++) {
        if (document.getElementById(`${allUserData[i].name}-checkbox`).checked) {
            peopleSplittingItem.push(allUserData[i].name)
        }
    }

    const itemCostPerPerson = price / peopleSplittingItem.length;

    for (let i = 0; i < peopleSplittingItem.length; i++) {
        const name = peopleSplittingItem[i]
        for (let j = 0; j < allUserData.length; j++) {
            if (allUserData[j].name === name) {
                allUserData[j].amountOwed += itemCostPerPerson;
                allUserData[j].thingsPurchased[item] = itemCostPerPerson;
            }
        }
    }

    const listElement = document.createElement('li');
    listElement.classList.add('flex');
    listElement.setAttribute('id', `${item}`)

    const div = document.createElement('div');
    div.classList.add('flex');
    
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';
    removeBtn.setAttribute('onclick', `removeItem('${item}', '${price}')`);
    div.appendChild(removeBtn);

    const itemElement = document.createElement('span');
    itemElement.innerText = capitalize(item);
    div.appendChild(itemElement);

    listElement.appendChild(div);
    
    const priceElement = document.createElement('span');
    priceElement.innerText = parseFloat(price).toFixed(2);
    listElement.appendChild(priceElement);
    
    elements.allItemsList.appendChild(listElement);

    updateTotal(price);
    
    elements.itemValue.focus();

    for (let name of peopleSplittingItem) {
        addItemToSingleUserList(name, item, itemCostPerPerson);
    }


}

const updateTotal = (price) => {
    total += parseFloat(price); 
    const formattedTotal = total.toFixed(2);
    elements.totalElement.innerText = ''; 
    elements.totalElement.innerText = `$${formattedTotal}`; 
}

const removePerson = (person) => {
    if (elements.allItemsList.hasChildNodes()) {
       return
    };

    document.getElementById(person).remove();
    document.getElementById(`${person}-dropdown`).remove();
    document.getElementById(`${person}-checkbox-container`).remove();
    document.getElementById(`${person}UserBtn`).remove();

    for (let i = 0; i < allUserData.length ; i++) {
            if (allUserData[i].name === person ) {
                allUserData.splice(i, 1)
            }
        };

    if (allUserData.length < 2) {
        elements.selectAllDiv.classList.add('hidden')
    }

    const buttons = document.querySelectorAll('#user-btns button')

    for (let button of buttons) {
        if (button.innerText === person) {
            button.remove();
        }
    }
}

const removeItem = (item, price) => {
    document.getElementById(`${item}`).remove();

    for (let people of allUserData) {
        people.amountOwed -= people.thingsPurchased[item];
        delete people.thingsPurchased[item];
    }

    for (let user of allUserData) {
       if (document.getElementById(`${user.name}-${item}`)) {
            document.getElementById(`${user.name}-${item}`).remove();
       }
    }

    total -= price
    updateTotal(0);
}

const calculate = () => {
    if (elements.totalElement.innerText === '$0.00') return; 

    elements.resultsSection.classList.remove('hidden')
    elements.resultsList.innerHTML = '';

    const personOwed = elements.whoPaid.value;
    let amountOwedTotal = 0;

    for (let i = 0; i < allUserData.length; i++) {
        if (allUserData[i].name !== personOwed) {
            amountOwedTotal += allUserData[i].amountOwed
        }
    }

    const personOwedElement = document.createElement('p');
    personOwedElement.innerText = `${capitalize(personOwed)} is owed: $${amountOwedTotal.toFixed(2)}`
    elements.resultsList.appendChild(personOwedElement);

    for (let i = 0; i < allUserData.length; i++) {

        if (allUserData[i].name !== personOwed) {
            const name = allUserData[i].name; 
            const owes = allUserData[i].amountOwed;
    
            const owesElement = document.createElement('p');
            owesElement.innerText = `${capitalize(name)} owes $${owes.toFixed(2)}`
    
            elements.resultsList.appendChild(owesElement)
        }
    }
}

const createUserBtn = (name) => {
    const button = document.createElement('button'); 
    button.innerText = capitalize(name); 
    button.setAttribute('onclick', `viewBreakdown("${name.toLowerCase()}")`);
    button.setAttribute('id', `${name}UserBtn`)
    button.classList.add('user-btn');
    elements[`${name.toLowerCase()}UserBtn`] = button;
    elements.userBtns.appendChild(button);
}

const viewBreakdown = (name) => {
    const userList = elements[`${name}ItemsList`]
    const allUsers = document.querySelectorAll('#item-div ul');
    const allBtns = document.querySelectorAll('#user-btns button');
    const userBtn = elements[`${name}UserBtn`]

    for (let users of allUsers) {
        users.classList.add('hidden');
    }

    for (let btns of allBtns) {
        btns.classList.remove('selected-btn')
    }

    userList.classList.remove('hidden');
    userBtn.classList.add('selected-btn');

    elements.totalElement.innerText = ''

    if (name === 'all') {
        elements.totalElement.innerText = `$${total.toFixed(2)}`; 
    } else {
        for (let user of allUserData) {
            if (user.name === name) {
                elements.totalElement.innerText = `$${user.amountOwed.toFixed(2)}`;
            }
        }
    }
   
}

elements.whoIsSplittingInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && elements.whoIsSplittingInput.value !== '') addPersonSplittingBill();
})

elements.itemInputSection.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addItem();
})

elements.checkAll.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    for (let checkbox of checkboxes) {
        checkbox.checked = elements.checkAll.checked
    }
})

elements.checkboxDiv.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('#checkbox-div input[type="checkbox"]');

    if (checkboxes.length > 1) {
        let checkedBoolean = document.querySelectorAll('#checkbox-div input[type="checkbox"]:checked').length === checkboxes.length;

        elements.checkAll.checked = checkedBoolean;
    }
})